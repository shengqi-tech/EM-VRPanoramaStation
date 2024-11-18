package com.shengqitech.ems.controllers;


import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Device;
import com.shengqitech.ems.models.vo.DeviceVo;
import com.shengqitech.ems.services.IDeviceService;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
@RequestMapping("/device")
@Api(value = "设备管理", tags = "deviceController")
public class DeviceController extends BaseController {

    @Autowired
    private IDeviceService deviceService;

    @PostMapping("/sync")
    public Wrapper sync(@RequestBody JSONArray jsonArray){
        Boolean flag = deviceService.sync(jsonArray);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_instance_id", value = "站房id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_instance_no", value = "站房编号", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_product_id", value = "产品id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_device_id", value = "设备id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_device_no", value = "设备编号", dataTypeClass = String.class, required = false),

    })
    @ApiOperation(value = "查询设备", nickname = "findDeviceByMap")
    @MyLog(title = "查询设备", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<DeviceVo>> findByMap(Integer ems_instance_id, String ems_instance_no, Integer ems_product_id,Integer ems_device_id,  String ems_device_no) {
        Map<String, Object> map = new HashMap<>();
        if (ems_instance_id != null){
            map.put("ems_instance_id", ems_instance_id);
        }
        if (!StringUtils.isEmpty(ems_instance_no)) {
            map.put("ems_instance_no", ems_instance_no);
        }
        if (ems_product_id != null){
            map.put("ems_product_id", ems_product_id);
        }
        if (ems_device_id != null){
            map.put("ems_device_id", ems_device_id);
        }
        if (!StringUtils.isEmpty(ems_device_no)) {
            map.put("ems_device_no", ems_device_no);
        }
        List<DeviceVo> devices = deviceService.findByMap(map);
        return WrapMapper.ok(devices);
    }

}
