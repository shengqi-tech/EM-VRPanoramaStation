package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Configuration;
import com.shengqitech.ems.models.vo.DeviceVo;
import com.shengqitech.ems.services.IConfigurationService;
import com.shengqitech.ems.services.IDeviceService;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.stereotype.Controller;
import com.shengqitech.ems.controllers.BaseController;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/configuration")
@Api(value = "设备管理", tags = "configurationController")
public class ConfigurationController extends BaseController {


    @Autowired
    private IConfigurationService configurationService;

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_composition_id", value = "产品分类(站房组成)id", dataTypeClass = Integer.class, required = false),
    })
    @ApiOperation(value = "查询配置", nickname = "findConfigurationByMap")
    @MyLog(title = "查询配置", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<Configuration>> findByMap(Integer ems_composition_id) {
        Map<String, Object> map = new HashMap<>();

        if (ems_composition_id != null){
            map.put("ems_composition_id", ems_composition_id);
        }

        List<Configuration> configurations = configurationService.findByMap(map);
        return WrapMapper.ok(configurations);
    }
}
