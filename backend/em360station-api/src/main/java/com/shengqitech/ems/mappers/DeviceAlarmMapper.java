package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Common;
import com.shengqitech.ems.models.domains.Device;
import com.shengqitech.ems.models.domains.DeviceAlarm;
import com.shengqitech.ems.models.vo.DeviceAlarmVo;
import org.apache.ibatis.annotations.Param;

import java.util.Date;
import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author hgy
 * @since 2024-02-01
 */
public interface DeviceAlarmMapper {



    int insert(DeviceAlarm deviceAlarm);

    /**
     * 根据站房id查询
     * @param ems_sation_id
     * @return
     */
    List<DeviceAlarmVo> findByStationId(@Param("id") Integer ems_sation_id);

    /**
     * 根据设备和时间查询(用于去重判断)
     * @param ems_devicealarm_deviceid
     * @param ems_devicealarm_happentime
     * @return
     */
    List<DeviceAlarm> findRepetition(@Param("ems_devicealarm_deviceid") Integer ems_devicealarm_deviceid,@Param("ems_devicealarm_happentime") Date ems_devicealarm_happentime);

    /**
     * 查询
     * @param ems_instance_id
     * @return
     */
    int findDeviceAlarmByInsanceId(@Param("ems_instance_id") Integer ems_instance_id);


}
