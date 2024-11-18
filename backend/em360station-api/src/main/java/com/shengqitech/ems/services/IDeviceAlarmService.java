package com.shengqitech.ems.services;


import com.alibaba.fastjson2.JSONArray;
import com.shengqitech.ems.models.vo.DeviceAlarmVo;
import com.shengqitech.ems.models.vo.DeviceVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author hgy
 * @since 2024-02-01
 */
public interface IDeviceAlarmService {

    /**
     * 设备同步
     * @param jsonArray
     * @return
     */
    Boolean sync(JSONArray jsonArray);

    /**
     * 查询
     * @param ems_instance_id
     * @return
     */
    List<DeviceAlarmVo> findByStationId(Integer ems_instance_id);

    /**
     * 根据站房编号查询
     * @param ems_instance_nos
     * @return
     */
    Map<String,List<DeviceAlarmVo>> findByStationNo(List<String> ems_instance_nos);


    /**
     * 根据站查询是否存在报警
     * @param ems_instance_id
     * @return
     */
    Boolean isExsitDeviceAlarmByInstanceId(Integer ems_instance_id);

}
