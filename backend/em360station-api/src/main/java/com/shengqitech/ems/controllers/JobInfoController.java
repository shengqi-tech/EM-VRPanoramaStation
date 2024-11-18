package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.XxlJobInfoAddPo;
import com.shengqitech.ems.models.po.XxlJobInfoEditPo;
import com.shengqitech.ems.models.vo.XxlJobInfoVo;
import com.shengqitech.ems.system.core.exception.XxlJobException;
import com.shengqitech.ems.models.domains.XxlJobGroup;
import com.shengqitech.ems.models.domains.XxlJobInfo;
import com.shengqitech.ems.models.domains.XxlJobUser;
import com.shengqitech.ems.system.core.route.ExecutorRouteStrategyEnum;
import com.shengqitech.ems.system.core.scheduler.MisfireStrategyEnum;
import com.shengqitech.ems.system.core.scheduler.ScheduleTypeEnum;
import com.shengqitech.ems.system.core.thread.JobScheduleHelper;
import com.shengqitech.ems.system.core.thread.JobTriggerPoolHelper;
import com.shengqitech.ems.system.core.trigger.TriggerTypeEnum;
import com.shengqitech.ems.system.core.util.I18nUtil;
import com.shengqitech.ems.mappers.XxlJobGroupMapper;
import com.shengqitech.ems.services.XxlJobService;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.enums.ExecutorBlockStrategyEnum;
import com.xxl.job.core.glue.GlueTypeEnum;
import com.xxl.job.core.util.DateUtil;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * index controller
 * @author xuxueli 2015-12-19 16:13:16
 */
@RestController
@RequestMapping("/jobinfo")
@Api(value = "调度任务管理", tags = "jobInfoController")
public class JobInfoController extends BaseController {
	private static Logger logger = LoggerFactory.getLogger(JobInfoController.class);

	@Resource
	private XxlJobGroupMapper xxlJobGroupDao;
	@Resource
	private XxlJobService xxlJobService;
	
	@RequestMapping
	public String index(HttpServletRequest request, Model model, @RequestParam(required = false, defaultValue = "-1") int jobGroup) {

		// 枚举-字典
		model.addAttribute("ExecutorRouteStrategyEnum", ExecutorRouteStrategyEnum.values());	    // 路由策略-列表
		model.addAttribute("GlueTypeEnum", GlueTypeEnum.values());								// Glue类型-字典
		model.addAttribute("ExecutorBlockStrategyEnum", ExecutorBlockStrategyEnum.values());	    // 阻塞处理策略-字典
		model.addAttribute("ScheduleTypeEnum", ScheduleTypeEnum.values());	    				// 调度类型
		model.addAttribute("MisfireStrategyEnum", MisfireStrategyEnum.values());	    			// 调度过期策略

		// 执行器列表
		List<XxlJobGroup> jobGroupList_all =  xxlJobGroupDao.findAll();

		// filter group
		List<XxlJobGroup> jobGroupList = filterJobGroupByRole(request, jobGroupList_all);
		if (jobGroupList==null || jobGroupList.size()==0) {
			throw new XxlJobException(I18nUtil.getString("jobgroup_empty"));
		}

		model.addAttribute("JobGroupList", jobGroupList);
		model.addAttribute("jobGroup", jobGroup);

		return "jobinfo/jobinfo.index";
	}

	public static List<XxlJobGroup> filterJobGroupByRole(HttpServletRequest request, List<XxlJobGroup> jobGroupList_all){
		List<XxlJobGroup> jobGroupList = new ArrayList<>();
		if (jobGroupList_all!=null && jobGroupList_all.size()>0) {
//			XxlJobUser loginUser = (XxlJobUser) request.getAttribute(LoginService.LOGIN_IDENTITY_KEY);
			XxlJobUser loginUser = new XxlJobUser();
			if (loginUser.getRole() == 1) {
				jobGroupList = jobGroupList_all;
			} else {
				List<String> groupIdStrs = new ArrayList<>();
				if (loginUser.getPermission()!=null && loginUser.getPermission().trim().length()>0) {
					groupIdStrs = Arrays.asList(loginUser.getPermission().trim().split(","));
				}
				for (XxlJobGroup groupItem:jobGroupList_all) {
					if (groupIdStrs.contains(String.valueOf(groupItem.getId()))) {
						jobGroupList.add(groupItem);
					}
				}
			}
		}
		return jobGroupList;
	}
//	public static void validPermission(HttpServletRequest request, int jobGroup) {
//		XxlJobUser loginUser = (XxlJobUser) request.getAttribute(LoginService.LOGIN_IDENTITY_KEY);
//		if (!loginUser.validPermission(jobGroup)) {
//			throw new RuntimeException(I18nUtil.getString("system_permission_limit") + "[username="+ loginUser.getUsername() +"]");
//		}
//	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "jobGroup", value = "执行器id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "triggerStatus", value = "调度状态：0-停止，1-运行", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "jobDesc", value = "调调度任务名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "executorHandler", value = "执行器任务handler", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "author", value = "作者", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询调度任务", nickname = "findJobInfoByMap")
    @MyLog(title = "查询调度任务", businessType = BusinessType.SELECT)
	@GetMapping("/findByMap")
	public Wrapper<TableDataInfo<XxlJobInfoVo>> findByMap(Integer jobGroup, Integer triggerStatus, String jobDesc, String executorHandler, String author) {
        startPage();
        List<XxlJobInfoVo> xxlJobInfos = xxlJobService.pageList(jobGroup, triggerStatus, jobDesc, executorHandler, author);
        TableDataInfo dataTable = getDataTable(xxlJobInfos);
        List<Integer> counter = xxlJobService.counter();
        Map<String,Object> map = new HashMap<>();
        if (counter.size()>0){
            map.put("stop",counter.get(0));
            counter.remove(0);
        }else {
            map.put("stop",0);
        }
        if (counter.size()>0){
            map.put("running",counter.get(0));
        }else {
            map.put("running",0);
        }
        dataTable.setCounter(map);
        return WrapMapper.ok(dataTable);
	}

    @ApiImplicitParams({@ApiImplicitParam(name = "jobInfoAddPo", value = "新增调度任务PO类", dataTypeClass = XxlJobInfoAddPo.class, required = true),})
    @ApiOperation(value = "新增调度任务", nickname = "insertJobInfo")
    @MyLog(title = "新增调度任务", businessType = BusinessType.INSERT)
	@PostMapping("/insert")
	public Wrapper<String> insert(@RequestBody XxlJobInfoAddPo jobInfoAddPo) {
		return xxlJobService.add(jobInfoAddPo);
	}

    @ApiImplicitParams({@ApiImplicitParam(name = "jobInfoEditPo", value = "新增调度任务PO类", dataTypeClass = XxlJobInfoEditPo.class, required = true),})
    @ApiOperation(value = "编辑调度任务", nickname = "updateJobInfo")
    @MyLog(title = "编辑调度任务", businessType = BusinessType.UPDATE)
	@PostMapping("/update")
	public Wrapper<String> update(@RequestBody XxlJobInfoEditPo jobInfoEditPo) {
		return xxlJobService.update(jobInfoEditPo);
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "调度任务id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "删除调度任务", nickname = "remove")
    @MyLog(title = "删除调度任务", businessType = BusinessType.DELETE)
	@GetMapping("/remove")
	public Wrapper<String> remove(Integer id) {
		return xxlJobService.remove(id);
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "调度任务id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "停止调度任务", nickname = "stop")
    @MyLog(title = "停止调度任务", businessType = BusinessType.OTHER)
	@GetMapping("/stop")
	public Wrapper<String> pause(Integer id) {
		return xxlJobService.stop(id);
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "调度任务id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "启动调度任务", nickname = "start")
    @MyLog(title = "启动调度任务", businessType = BusinessType.OTHER)
	@GetMapping("/start")
	public Wrapper<String> start(Integer id) {
		return xxlJobService.start(id);
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "调度任务id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "executorParam", value = "调度任务参数", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "addressList", value = "机器地址", dataTypeClass = String.class, required = false),
    })
    @ApiOperation(value = "执行一次调度任务", nickname = "triggerJob")
    @MyLog(title = "执行一次调度任务", businessType = BusinessType.OTHER)
	@GetMapping("/trigger")
	//@PermissionLimit(limit = false)
	public Wrapper<String> triggerJob(Integer id, String executorParam, String addressList) {
		// force cover job param
		if (executorParam == null) {
			executorParam = "";
		}

		JobTriggerPoolHelper.trigger(id, TriggerTypeEnum.MANUAL, -1, null, executorParam, addressList);
		return WrapMapper.ok();
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "scheduleType", value = "调度类型", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "scheduleConf", value = "调度配置，值含义取决于调度类型", dataTypeClass = String.class, required = true),
    })
    @ApiOperation(value = "查询下次执行时间", nickname = "nextTriggerTime")
    @MyLog(title = "查询下次执行时间", businessType = BusinessType.OTHER)
	@GetMapping("/nextTriggerTime")
	public Wrapper<List<String>> nextTriggerTime(String scheduleType, String scheduleConf) {

		XxlJobInfo paramXxlJobInfo = new XxlJobInfo();
		paramXxlJobInfo.setScheduleType(scheduleType);
		paramXxlJobInfo.setScheduleConf(scheduleConf);

		List<String> result = new ArrayList<>();
		try {
			Date lastTime = new Date();
			for (int i = 0; i < 5; i++) {
				lastTime = JobScheduleHelper.generateNextValidTime(paramXxlJobInfo, lastTime);
				if (lastTime != null) {
					result.add(DateUtil.formatDateTime(lastTime));
				} else {
					break;
				}
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return WrapMapper.error(ReturnT.FAIL_CODE, (I18nUtil.getString("schedule_type")+I18nUtil.getString("system_unvalid")) + e.getMessage());
		}
		return WrapMapper.ok(result);

	}
	
}
