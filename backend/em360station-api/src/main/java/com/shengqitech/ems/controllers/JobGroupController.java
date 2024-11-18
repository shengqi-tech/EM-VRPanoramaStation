package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.XxlJobGroup;
import com.shengqitech.ems.models.domains.XxlJobRegistry;
import com.shengqitech.ems.models.po.XxlJobGroupAddPo;
import com.shengqitech.ems.models.po.XxlJobGroupEditPo;
import com.shengqitech.ems.models.vo.XxlJobGroupVo;
import com.shengqitech.ems.system.core.util.I18nUtil;
import com.shengqitech.ems.mappers.XxlJobGroupMapper;
import com.shengqitech.ems.mappers.XxlJobInfoMapper;
import com.shengqitech.ems.mappers.XxlJobRegistryMapper;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.xxl.job.core.biz.model.ReturnT;
import com.xxl.job.core.enums.RegistryConfig;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

/**
 * job group controller
 *
 * @author xuxueli 2016-10-02 20:52:56
 */
@RestController
@RequestMapping("/jobgroup")
@Api(value = "执行器管理", tags = "jobGroupController")
public class JobGroupController extends BaseController {

    @Resource
    public XxlJobInfoMapper xxlJobInfoDao;
    @Resource
    public XxlJobGroupMapper xxlJobGroupDao;
    @Resource
    private XxlJobRegistryMapper xxlJobRegistryDao;

    @RequestMapping
    public String index(Model model) {
        return "jobgroup/jobgroup.index";
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "appname", value = "执行器AppName", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "title", value = "执行器名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "customerId", value = "客户id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询执行器", nickname = "findJobGroupByMap")
    @MyLog(title = "查询执行器", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<XxlJobGroupVo>> findByMap(String appname, String title, Integer customerId) {
        startPage();
        // page query
        List<XxlJobGroupVo> list = xxlJobGroupDao.pageList(appname, title, customerId);
        return WrapMapper.ok(getDataTable(list));
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "xxlJobGroupAddPo", value = "新增执行器PO类", dataTypeClass = XxlJobGroupAddPo.class, required = true),})
    @ApiOperation(value = "新增执行器", nickname = "insertJobGroup")
    @PostMapping("/insert")
    public Wrapper<String> insert(@RequestBody XxlJobGroupAddPo xxlJobGroupAddPo) {
        XxlJobGroup xxlJobGroup = XxlJobGroup.builder()
                .appname(xxlJobGroupAddPo.getAppname())
                .title(xxlJobGroupAddPo.getTitle())
                .addressType(0)
                .updateTime(new Date())
                .jobHandlers(xxlJobGroupAddPo.getJobHandlers())
                .customerId(xxlJobGroupAddPo.getCustomerId()).build();

        // valid
        if (xxlJobGroup.getAppname() == null || xxlJobGroup.getAppname().trim().length() == 0) {
            return WrapMapper.error(500, (I18nUtil.getString("system_please_input") + "AppName"));
        }
        if (xxlJobGroup.getAppname().length() < 4 || xxlJobGroup.getAppname().length() > 64) {
            return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_appname_length"));
        }
        if (xxlJobGroup.getAppname().contains(">") || xxlJobGroup.getAppname().contains("<")) {
            return WrapMapper.error(500, "AppName" + I18nUtil.getString("system_unvalid"));
        }
        if (xxlJobGroup.getTitle() == null || xxlJobGroup.getTitle().trim().length() == 0) {
            return WrapMapper.error(500, (I18nUtil.getString("system_please_input") + I18nUtil.getString("jobgroup_field_title")));
        }
        if (xxlJobGroup.getTitle().contains(">") || xxlJobGroup.getTitle().contains("<")) {
            return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_title") + I18nUtil.getString("system_unvalid"));
        }
        if (xxlJobGroup.getAddressType() != 0) {
            if (xxlJobGroup.getAddressList() == null || xxlJobGroup.getAddressList().trim().length() == 0) {
                return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_addressType_limit"));
            }
            if (xxlJobGroup.getAddressList().contains(">") || xxlJobGroup.getAddressList().contains("<")) {
                return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_registryList") + I18nUtil.getString("system_unvalid"));
            }

            String[] addresss = xxlJobGroup.getAddressList().split(",");
            for (String item : addresss) {
                if (item == null || item.trim().length() == 0) {
                    return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_registryList_unvalid"));
                }
            }
        }

        // process
//        xxlJobGroup.setUpdateTime(new Date());

        int ret = xxlJobGroupDao.save(xxlJobGroup);
        return (ret > 0) ? WrapMapper.ok() : WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "xxlJobGroupEditPo", value = "编辑执行器PO类", dataTypeClass = XxlJobGroupEditPo.class, required = true),})
    @ApiOperation(value = "编辑执行器", nickname = "updateJobGroup")
    @PostMapping("/update")
    public Wrapper<String> update(@RequestBody XxlJobGroupEditPo xxlJobGroupEditPo) {
        XxlJobGroup xxlJobGroup = XxlJobGroup.builder()
                .id(xxlJobGroupEditPo.getId())
                .appname(xxlJobGroupEditPo.getAppname())
                .title(xxlJobGroupEditPo.getTitle())
                .addressType(0)
                .updateTime(new Date())
                .jobHandlers(xxlJobGroupEditPo.getJobHandlers())
                .customerId(xxlJobGroupEditPo.getCustomerId())
                .build();
        // valid
        if (xxlJobGroup.getAppname() == null || xxlJobGroup.getAppname().trim().length() == 0) {
            return WrapMapper.error(500, (I18nUtil.getString("system_please_input") + "AppName"));
        }
        if (xxlJobGroup.getAppname().length() < 4 || xxlJobGroup.getAppname().length() > 64) {
            return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_appname_length"));
        }
        if (xxlJobGroup.getTitle() == null || xxlJobGroup.getTitle().trim().length() == 0) {
            return WrapMapper.error(500, (I18nUtil.getString("system_please_input") + I18nUtil.getString("jobgroup_field_title")));
        }
        if (xxlJobGroup.getAddressType() == 0) {
            // 0=自动注册
            List<String> registryList = findRegistryByAppName(xxlJobGroup.getAppname());
            String addressListStr = null;
            if (registryList != null && !registryList.isEmpty()) {
                Collections.sort(registryList);
                addressListStr = "";
                for (String item : registryList) {
                    addressListStr += item + ",";
                }
                addressListStr = addressListStr.substring(0, addressListStr.length() - 1);
            }
            xxlJobGroup.setAddressList(addressListStr);
        } else {
            // 1=手动录入
            if (xxlJobGroup.getAddressList() == null || xxlJobGroup.getAddressList().trim().length() == 0) {
                return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_addressType_limit"));
            }
            String[] addresss = xxlJobGroup.getAddressList().split(",");
            for (String item : addresss) {
                if (item == null || item.trim().length() == 0) {
                    return WrapMapper.error(500, I18nUtil.getString("jobgroup_field_registryList_unvalid"));
                }
            }
        }

        // process
//        xxlJobGroup.setUpdateTime(new Date());

        int ret = xxlJobGroupDao.update(xxlJobGroup);
        return (ret > 0) ? WrapMapper.ok() : WrapMapper.error();
    }

    private List<String> findRegistryByAppName(String appnameParam) {
        HashMap<String, List<String>> appAddressMap = new HashMap<String, List<String>>();
        List<XxlJobRegistry> list = xxlJobRegistryDao.findAll(RegistryConfig.DEAD_TIMEOUT, new Date());
        if (list != null) {
            for (XxlJobRegistry item : list) {
                if (RegistryConfig.RegistType.EXECUTOR.name().equals(item.getRegistryGroup())) {
                    String appname = item.getRegistryKey();
                    List<String> registryList = appAddressMap.get(appname);
                    if (registryList == null) {
                        registryList = new ArrayList<String>();
                    }

                    if (!registryList.contains(item.getRegistryValue())) {
                        registryList.add(item.getRegistryValue());
                    }
                    appAddressMap.put(appname, registryList);
                }
            }
        }
        return appAddressMap.get(appnameParam);
    }

    @RequestMapping("/remove")
    @ResponseBody
    public ReturnT<String> remove(int id) {

        // valid
        int count = xxlJobInfoDao.pageListCount(0, 10, id, -1, null, null, null);
        if (count > 0) {
            return new ReturnT<String>(500, I18nUtil.getString("jobgroup_del_limit_0"));
        }

        List<XxlJobGroup> allList = xxlJobGroupDao.findAll();
        if (allList.size() == 1) {
            return new ReturnT<String>(500, I18nUtil.getString("jobgroup_del_limit_1"));
        }

        int ret = xxlJobGroupDao.remove(id);
        return (ret > 0) ? ReturnT.SUCCESS : ReturnT.FAIL;
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "id", value = "执行器id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "查询执行器注册节点", nickname = "loadById")
    @GetMapping("/loadById")
    public Wrapper<XxlJobGroup> loadById(Integer id) {
        XxlJobGroup jobGroup = xxlJobGroupDao.load(id);
        return jobGroup != null ? WrapMapper.ok(jobGroup) : WrapMapper.error(ReturnT.FAIL_CODE, null);
    }

}
