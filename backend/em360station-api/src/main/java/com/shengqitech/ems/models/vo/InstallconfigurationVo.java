package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Installconfiguration;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/1/30
 * @Description: 安装信息VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "InstallconfigurationVo", description = "安装配置表")
public class InstallconfigurationVo extends Installconfiguration {

    @ApiModelProperty(value = "配置key")
    private String ems_configuration_key;

}
