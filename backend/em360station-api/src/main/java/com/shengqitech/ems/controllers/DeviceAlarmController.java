package com.shengqitech.ems.controllers;


import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.DeviceAlarm;
import com.shengqitech.ems.models.vo.DeviceAlarmVo;
import com.shengqitech.ems.models.vo.DeviceVo;
import com.shengqitech.ems.services.IDeviceAlarmService;
import com.shengqitech.ems.services.IDeviceService;
import com.shengqitech.ems.system.redis.RedisCache;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.websocket.DeviceAlarmWebSocket;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.socket.TextMessage;

import java.util.*;
import java.util.stream.Collectors;


/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author hgy
 * @since 2024-02-01
 */
@RestController
@RequestMapping("/devicealarm")
@Api(value = "设备报警管理", tags = "devicealarmController")
public class DeviceAlarmController extends BaseController {

    @Autowired
    private IDeviceAlarmService deviceAlarmService;

    @Autowired
    private DeviceAlarmWebSocket deviceAlarmWebSocket;

    @Autowired
    private RedisCache redisCache;

    @PostMapping("/sync")
    public Wrapper sync(@RequestBody JSONArray jsonArray){
        Boolean flag = deviceAlarmService.sync(jsonArray);
        if (flag){
            Set<String> keys = (Set<String>) redisCache.keys(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + "*");
            List<String> multiCacheValue = redisCache.getMultiCacheValue(keys);
            List<String> collect = multiCacheValue.stream().distinct().collect(Collectors.toList());
            Map<String, List<DeviceAlarmVo>> deviceAlarms = deviceAlarmService.findByStationNo(collect);
            deviceAlarmWebSocket.sendMessageToUSERS(new TextMessage(JSON.toJSONString(deviceAlarms)));
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_instance_id", value = "站房id", dataTypeClass = Integer.class, required = false),
    })
    @ApiOperation(value = "查询站房报警", nickname = "findByStationId")
    @MyLog(title = "查询站房报警", businessType = BusinessType.SELECT)
    @GetMapping("/findByStationId")
    public Wrapper<List<DeviceAlarmVo>> findByStationId(Integer ems_instance_id) {

        List<DeviceAlarmVo> deviceAlarmVos = deviceAlarmService.findByStationId(ems_instance_id);
        return WrapMapper.ok(deviceAlarmVos);
    }

    @GetMapping("test")
    public void test(){
        Set<String> keys = (Set<String>) redisCache.keys(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + "*");
        List<String> multiCacheValue = redisCache.getMultiCacheValue(keys);
        List<String> collect = multiCacheValue.stream().distinct().collect(Collectors.toList());
        Map<String, List<DeviceAlarmVo>> deviceAlarms = deviceAlarmService.findByStationNo(collect);
        deviceAlarmWebSocket.sendMessageToUSERS(new TextMessage(JSON.toJSONString(deviceAlarms)));
        System.out.println();
    }

}
