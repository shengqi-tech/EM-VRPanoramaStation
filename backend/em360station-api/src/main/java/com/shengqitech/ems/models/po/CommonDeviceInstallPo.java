package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.domains.Installconfiguration;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : hgy
 * @Date : 2024/01/31
 * @Description: 热点标签设备安装类PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CommonDeviceInstallPo", description = "热点标签设备安装PO类")
public class CommonDeviceInstallPo implements Serializable {


    @ApiModelProperty(value = "设备表")
    private Integer ems_device_id;

    @ApiModelProperty("配置列表")
    List<Installconfiguration> ems_device_Installconfigurations;
}
