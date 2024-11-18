package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Composition;
import com.shengqitech.ems.models.domains.LoginUser;
import com.shengqitech.ems.models.vo.ApiVo;
import com.shengqitech.ems.services.ICompositionService;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.SecurityUtils;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 组成表管理
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/composition")
@Api(value = "组成表管理", tags = "compositionController")
public class CompositionController extends BaseController {

    @Autowired
    private ICompositionService compositionService;

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_composition_id", value = "组成id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_composition_pid", value = "组成pid", dataTypeClass = Integer.class, required = false),
    })
    @ApiOperation(value = "查询组成", nickname = "findCompositionByMap")
    @MyLog(title = "查询组成", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<Composition>> findByMap(Integer ems_composition_id, Integer ems_composition_pid) {
        Map<String, Object> map = new HashMap<>();
        LoginUser loginUser = SecurityUtils.getLoginUser();
        Integer ems_sysuser_customerid = loginUser.getUser().getEms_sysuser_customerid();
        if (ems_composition_id != null) {
            map.put("ems_composition_id", ems_composition_id);
        }
        if (ems_composition_pid != null) {
            map.put("ems_composition_pid", ems_composition_pid);
        }
        if (ems_sysuser_customerid != null) {
            map.put("ems_sysuser_customerid", ems_sysuser_customerid);
        }
        List<Composition> compositions = compositionService.findByMap(map);
        return WrapMapper.ok(compositions);
    }

}
