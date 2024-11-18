package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.mappers.XxlJobGroupMapper;
import com.shengqitech.ems.models.vo.XxlJobLogVo;
import com.shengqitech.ems.system.core.complete.XxlJobCompleter;
import com.shengqitech.ems.system.core.exception.XxlJobException;
import com.shengqitech.ems.models.domains.XxlJobGroup;
import com.shengqitech.ems.models.domains.XxlJobInfo;
import com.shengqitech.ems.models.domains.XxlJobLog;
import com.shengqitech.ems.system.core.scheduler.XxlJobScheduler;
import com.shengqitech.ems.system.core.util.I18nUtil;
import com.shengqitech.ems.mappers.XxlJobInfoMapper;
import com.shengqitech.ems.mappers.XxlJobLogMapper;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.xxl.job.core.biz.ExecutorBiz;
import com.xxl.job.core.biz.model.KillParam;
import com.xxl.job.core.biz.model.LogParam;
import com.xxl.job.core.biz.model.LogResult;
import com.xxl.job.core.biz.model.ReturnT;
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
import java.util.Date;
import java.util.List;

/**
 * index controller
 * @author xuxueli 2015-12-19 16:13:16
 */
@RestController
@RequestMapping("/joblog")
@Api(value = "调度日志", tags = "jobLogController")
public class JobLogController extends BaseController{
	private static Logger logger = LoggerFactory.getLogger(JobLogController.class);

	@Resource
	private XxlJobGroupMapper xxlJobGroupDao;
	@Resource
	public XxlJobInfoMapper xxlJobInfoDao;
	@Resource
	public XxlJobLogMapper xxlJobLogDao;

	@RequestMapping
	public String index(HttpServletRequest request, Model model, @RequestParam(required = false, defaultValue = "0") Integer jobId) {

		// 执行器列表
		List<XxlJobGroup> jobGroupList_all =  xxlJobGroupDao.findAll();

		// filter group
		List<XxlJobGroup> jobGroupList = JobInfoController.filterJobGroupByRole(request, jobGroupList_all);
		if (jobGroupList==null || jobGroupList.size()==0) {
			throw new XxlJobException(I18nUtil.getString("jobgroup_empty"));
		}

		model.addAttribute("JobGroupList", jobGroupList);

		// 任务
		if (jobId > 0) {
			XxlJobInfo jobInfo = xxlJobInfoDao.loadById(jobId);
			if (jobInfo == null) {
				throw new RuntimeException(I18nUtil.getString("jobinfo_field_id") + I18nUtil.getString("system_unvalid"));
			}

			model.addAttribute("jobInfo", jobInfo);

			// valid permission
//			JobInfoController.validPermission(request, jobInfo.getJobGroup());
		}

		return "joblog/joblog.index";
	}

	@RequestMapping("/getJobsByGroup")
	@ResponseBody
	public ReturnT<List<XxlJobInfo>> getJobsByGroup(int jobGroup){
		List<XxlJobInfo> list = xxlJobInfoDao.getJobsByGroup(jobGroup);
		return new ReturnT<List<XxlJobInfo>>(list);
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "jobGroup", value = "执行器id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "jobId", value = "任务id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "logStatus", value = "状态", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "filterTime", value = "调度时间", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_customer_name", value = "客户名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false,dataTypeClass = Integer.class,paramType="query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false,dataTypeClass = Integer.class,paramType="query"),
    })
    @ApiOperation(value = "调度日志列表", nickname = "findLogByMap")
    @MyLog(title = "调度日志列表", businessType = BusinessType.SELECT)
	@GetMapping("/findByMap")
	public Wrapper<TableDataInfo<XxlJobLogVo>> findByMap(Integer jobGroup, Integer jobId, Integer logStatus, String filterTime, String ems_customer_name) {

		// valid permission
//		JobInfoController.validPermission(request, jobGroup);	// 仅管理员支持查询全部；普通用户仅支持查询有权限的 jobGroup
		
		// parse param
		Date triggerTimeStart = null;
		Date triggerTimeEnd = null;
		if (filterTime!=null && filterTime.trim().length()>0) {
			String[] temp = filterTime.split(" - ");
			if (temp.length == 2) {
				triggerTimeStart = DateUtil.parseDateTime(temp[0]);
				triggerTimeEnd = DateUtil.parseDateTime(temp[1]);
			}
		}
		startPage();
		// page query
		List<XxlJobLogVo> list = xxlJobLogDao.pageList(jobGroup, jobId, triggerTimeStart, triggerTimeEnd, logStatus,ems_customer_name);
		return WrapMapper.ok(getDataTable(list));
	}

    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "日志id", dataTypeClass = Long.class, required = true),
    })
    @ApiOperation(value = "调度日志", nickname = "logDetail")
	@GetMapping("/logDetail")
	public Wrapper logDetail(Long id){

		// base check
//		ReturnT<String> logStatue = ReturnT.SUCCESS;
		XxlJobLog jobLog = xxlJobLogDao.load(id);
		if (jobLog == null) {
            throw new RuntimeException(I18nUtil.getString("joblog_logid_unvalid"));
		}

//        model.addAttribute("triggerCode", jobLog.getTriggerCode());
//        model.addAttribute("handleCode", jobLog.getHandleCode());
//        model.addAttribute("logId", jobLog.getId());
		return WrapMapper.ok(jobLog);
	}

	@GetMapping("/logDetailCat")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "id", value = "日志id", dataTypeClass = Long.class, required = true),
            @ApiImplicitParam(name = "fromLineNum", value = "行号", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "执行日志", nickname = "logDetailCat")
	public ReturnT<LogResult> logDetailCat(Long id, Integer fromLineNum){
		try {
			// valid
			XxlJobLog jobLog = xxlJobLogDao.load(id);	// todo, need to improve performance
			if (jobLog == null) {
				return new ReturnT<LogResult>(ReturnT.FAIL_CODE, I18nUtil.getString("joblog_logid_unvalid"));
			}

			// log cat
			ExecutorBiz executorBiz = XxlJobScheduler.getExecutorBiz(jobLog.getExecutorAddress());
			ReturnT<LogResult> logResult = executorBiz.log(new LogParam(jobLog.getTriggerTime().getTime(), id, fromLineNum));

			// is end
            if (logResult.getContent()!=null && logResult.getContent().getFromLineNum() > logResult.getContent().getToLineNum()) {
                if (jobLog.getHandleCode() > 0) {
                    logResult.getContent().setEnd(true);
                }
            }

			return logResult;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return new ReturnT<LogResult>(ReturnT.FAIL_CODE, e.getMessage());
		}
	}

	@RequestMapping("/logKill")
	@ResponseBody
	public ReturnT<String> logKill(Long id){
		// base check
		XxlJobLog log = xxlJobLogDao.load(id);
		XxlJobInfo jobInfo = xxlJobInfoDao.loadById(log.getJobId());
		if (jobInfo==null) {
			return new ReturnT<String>(500, I18nUtil.getString("jobinfo_glue_jobid_unvalid"));
		}
		if (ReturnT.SUCCESS_CODE != log.getTriggerCode()) {
			return new ReturnT<String>(500, I18nUtil.getString("joblog_kill_log_limit"));
		}

		// request of kill
		ReturnT<String> runResult = null;
		try {
			ExecutorBiz executorBiz = XxlJobScheduler.getExecutorBiz(log.getExecutorAddress());
			runResult = executorBiz.kill(new KillParam(jobInfo.getId()));
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			runResult = new ReturnT<String>(500, e.getMessage());
		}

		if (ReturnT.SUCCESS_CODE == runResult.getCode()) {
			log.setHandleCode(ReturnT.FAIL_CODE);
			log.setHandleMsg( I18nUtil.getString("joblog_kill_log_byman")+":" + (runResult.getMsg()!=null?runResult.getMsg():""));
			log.setHandleTime(new Date());
			XxlJobCompleter.updateHandleInfoAndFinish(log);
			return new ReturnT<String>(runResult.getMsg());
		} else {
			return new ReturnT<String>(500, runResult.getMsg());
		}
	}

	@RequestMapping("/clearLog")
	@ResponseBody
	public ReturnT<String> clearLog(int jobGroup, int jobId, int type){

		Date clearBeforeTime = null;
		int clearBeforeNum = 0;
		if (type == 1) {
			clearBeforeTime = DateUtil.addMonths(new Date(), -1);	// 清理一个月之前日志数据
		} else if (type == 2) {
			clearBeforeTime = DateUtil.addMonths(new Date(), -3);	// 清理三个月之前日志数据
		} else if (type == 3) {
			clearBeforeTime = DateUtil.addMonths(new Date(), -6);	// 清理六个月之前日志数据
		} else if (type == 4) {
			clearBeforeTime = DateUtil.addYears(new Date(), -1);	// 清理一年之前日志数据
		} else if (type == 5) {
			clearBeforeNum = 1000;		// 清理一千条以前日志数据
		} else if (type == 6) {
			clearBeforeNum = 10000;		// 清理一万条以前日志数据
		} else if (type == 7) {
			clearBeforeNum = 30000;		// 清理三万条以前日志数据
		} else if (type == 8) {
			clearBeforeNum = 100000;	// 清理十万条以前日志数据
		} else if (type == 9) {
			clearBeforeNum = 0;			// 清理所有日志数据
		} else {
			return new ReturnT<String>(ReturnT.FAIL_CODE, I18nUtil.getString("joblog_clean_type_unvalid"));
		}

		List<Long> logIds = null;
		do {
			logIds = xxlJobLogDao.findClearLogIds(jobGroup, jobId, clearBeforeTime, clearBeforeNum, 1000);
			if (logIds!=null && logIds.size()>0) {
				xxlJobLogDao.clearLog(logIds);
			}
		} while (logIds!=null && logIds.size()>0);

		return ReturnT.SUCCESS;
	}

}
