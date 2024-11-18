package com.shengqitech.ems.services.impl;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.mappers.*;
import com.shengqitech.ems.models.domains.*;
import com.shengqitech.ems.models.vo.DeviceAlarmVo;
import com.shengqitech.ems.models.vo.DeviceVo;
import com.shengqitech.ems.services.IDeviceAlarmService;
import com.shengqitech.ems.services.IDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class DeviceAlarmServiceImpl implements IDeviceAlarmService {

    @Autowired
    private DeviceAlarmMapper deviceAlarmMapper;

    @Autowired
    private InstanceMapper instanceMapper;
    @Autowired
    private DeviceMapper deviceMapper;

    @Override
    public Boolean sync(JSONArray jsonArray) {
        Date now = new Date();
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject json = jsonArray.getJSONObject(i);
            String log = json.getString("ems_devicealarm_log");
            String deviceno = json.getString("ems_devicealarm_deviceno");
            Date happentime = json.getDate("ems_devicealarm_happentime");
            Integer levelid = json.getInteger("ems_devicealarm_levelid");
            if (deviceno != null && !"".equals(deviceno)) {
                Device device = deviceMapper.findDuplicateDevice(deviceno);
                if (device != null) {
                    List<DeviceAlarm> repetition = deviceAlarmMapper.findRepetition(device.getEms_device_id(), happentime);
                    if (repetition == null || repetition.size() == 0){
                        DeviceAlarm deviceAlarm = DeviceAlarm.builder()
                                .ems_devicealarm_deviceid(device.getEms_device_id())
                                .ems_devicealarm_happentime(happentime)
                                .ems_devicealarm_createtime(now)
                                .ems_devicealarm_log(log)
                                .ems_devicealarm_levelid(levelid).build();
                        deviceAlarmMapper.insert(deviceAlarm);
                    }
                }
            }
        }
        return true;
    }

    @Override
    public List<DeviceAlarmVo> findByStationId(Integer ems_instance_id) {
        return deviceAlarmMapper.findByStationId(ems_instance_id);
    }

    @Override
    public Map<String, List<DeviceAlarmVo>> findByStationNo(List<String> ems_instance_nos) {
        Map<String,List<DeviceAlarmVo>> map = new HashMap<>();
        for (String emsInstanceNo : ems_instance_nos) {
            Instance instance = instanceMapper.findByNo(emsInstanceNo);
            if (instance != null){
                List<DeviceAlarmVo> stations = deviceAlarmMapper.findByStationId(instance.getEms_instance_id());
                map.put(instance.getEms_instance_no(),stations);
            }
        }
        return map;
    }

    @Override
    public Boolean isExsitDeviceAlarmByInstanceId(Integer ems_instance_id) {
        int deviceAlarmCount = deviceAlarmMapper.findDeviceAlarmByInsanceId(ems_instance_id);
        if(deviceAlarmCount>0)
            return true;
        else
            return false;
    }


}
