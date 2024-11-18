package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 设备
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Device", description = "设备表")
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "设备表")
    private Integer ems_device_id;

    @ApiModelProperty(value = "设备编号")
    private String ems_device_no;

    @ApiModelProperty(value = "设备实物照片文件id")
    private Integer ems_device_picfileid;

    @ApiModelProperty(value = "设备状态 0、库存 、1、出库  2、在线 、3、离线")
    private Integer ems_device_state;

    @ApiModelProperty(value = "产品版本id")
    private Integer ems_device_versionid;

    @ApiModelProperty(value = "站点id")
    private Integer ems_device_instanceid;

    @ApiModelProperty(value = "创建时间")
    private Date ems_device_createtime;
}
