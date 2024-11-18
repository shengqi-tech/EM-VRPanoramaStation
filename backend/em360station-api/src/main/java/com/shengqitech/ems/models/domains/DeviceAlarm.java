package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author hgy
 * @since 2024-02-01
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "DeviceAlarm对象", description = "")
public class DeviceAlarm implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "设备报警表")
    private Integer ems_devicealarm_id;

    @ApiModelProperty(value = "报警时间")
    private Date ems_devicealarm_happentime;

    @ApiModelProperty(value = "数据入库时间")
    private Date ems_devicealarm_createtime;

    @ApiModelProperty(value = "报警记录值")
    private String ems_devicealarm_value;

    @ApiModelProperty(value = "设备报警类型id")
    private Integer ems_devicealarm_devicealarmtypeid;
    @ApiModelProperty(value = "设备id")
    private Integer ems_devicealarm_deviceid;

    @ApiModelProperty(value = "报警等级id")
    private Integer ems_devicealarm_levelid;

    @ApiModelProperty(value = "报警日志")
    private String ems_devicealarm_log;

}
