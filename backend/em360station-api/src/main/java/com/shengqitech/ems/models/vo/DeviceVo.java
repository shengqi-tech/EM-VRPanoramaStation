package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Configuration;
import com.shengqitech.ems.models.domains.Device;

import com.shengqitech.ems.models.domains.Installconfiguration;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : whg
 * @Date : 2024/1/30
 * @Description: 产设备O类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "DeviceVo", description = "设备VO类")
public class DeviceVo extends Device {

    @ApiModelProperty("配置列表")
    List<InstallconfigurationVo> ems_device_InstallconfigurationVos;


}
