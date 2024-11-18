package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author : hgy
 * @Date : 2024/02/1
 * @Description: 设备报警
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceAlarm {

    private static final long serialVersionUID = 1L;

    private Integer ems_devicealarm_id;

    private String ems_devicealarm_happentime;

    private String ems_devicealarm_log;

    private String ems_devicealarm_value;

    private String ems_devicealarm_deviceno;

    private Integer ems_devicealarm_levelid;

}
