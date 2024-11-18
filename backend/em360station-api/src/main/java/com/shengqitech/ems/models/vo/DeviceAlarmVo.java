package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.AlarmLevel;
import com.shengqitech.ems.models.domains.Device;
import com.shengqitech.ems.models.domains.DeviceAlarm;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : hgy
 * @Date : 2024/2/01
 * @Description: 设备报警VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "DeviceAlarmVo", description = "设备报警VO类")
public class DeviceAlarmVo extends DeviceAlarm {

    @ApiModelProperty("报警等级")
    AlarmLevel ems_devicealarm_alarmlevel;
    @ApiModelProperty("设备")
    Device ems_devicealarm_device;


}
