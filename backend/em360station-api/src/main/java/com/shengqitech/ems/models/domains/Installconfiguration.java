package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 安装配置表
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Installconfiguration", description = "安装配置表")
public class Installconfiguration implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "安装配置数据表")
    private Integer ems_installconfiguration_id;

    @ApiModelProperty(value = "配置信息值")
    private String ems_installconfiguration_value;

    @ApiModelProperty(value = "设备id")
    private Integer ems_installconfiguration_deviceid;

    @ApiModelProperty(value = "配置表id")
    private Integer ems_installconfiguration_configurationid;
}
