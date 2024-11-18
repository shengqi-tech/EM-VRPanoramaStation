package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Syslog;
import com.shengqitech.ems.models.po.RoleEditPo;
import com.shengqitech.ems.services.ISyslogService;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 日志信息管理
 * </p>
 *
 * @author
 * @since 2024-03-11
 */
@RestController
@RequestMapping("/syslog")
@Api(value = "日志信息管理", tags = "syslogController")
public class SyslogController extends BaseController {

    @Autowired
    private ISyslogService syslogService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_syslog_id", value = "日志id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_syslog_type", value = "业务类型（0其它 1新增 2修改 3删除）", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_syslog_operurl", value = "请求URL", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_syslog_operid", value = "操作人员id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_syslog_status", value = "操作状态（0正常 1异常）", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_syslog_strattime", value = "操作开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_syslog_endtime", value = "操作结束时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询日志", nickname = "findSyslogByMap")
    @MyLog(title = "查询日志", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<Syslog>> findByMap(Integer ems_syslog_id, Integer ems_syslog_type, String ems_syslog_operurl, Integer ems_syslog_operid, Integer ems_syslog_status, Date ems_syslog_strattime, Date ems_syslog_endtime) {
        Map<String, Object> map = new HashMap<>();
        if (ems_syslog_id != null) {
            map.put("ems_syslog_id", ems_syslog_id);
        }
        if (ems_syslog_type != null) {
            map.put("ems_syslog_type", ems_syslog_type);
        }
        if (!StringUtils.isEmpty(ems_syslog_operurl)){
            map.put("ems_syslog_operurl", ems_syslog_operurl);
        }
        if (ems_syslog_operid != null) {
            map.put("ems_syslog_operid", ems_syslog_operid);
        }
        if (ems_syslog_status != null) {
            map.put("ems_syslog_status", ems_syslog_status);
        }
        if (ems_syslog_strattime != null) {
            map.put("ems_syslog_strattime", ems_syslog_strattime);
        }
        if (ems_syslog_endtime != null) {
            map.put("ems_syslog_endtime", ems_syslog_endtime);
        }
        startPage();
        List<Syslog> syslogs = syslogService.findByMap(map);
        return WrapMapper.ok(getDataTable(syslogs));
    }

//    @GetMapping("")

}
