package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 配置表
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Configuration", description = "配置表")
public class Configuration implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "配置表")
    private Integer ems_configuration_id;

    @ApiModelProperty(value = "配置key")
    private String ems_configuration_key;

    @ApiModelProperty(value = "配置项描述")
    private String ems_configuration_name;

    @ApiModelProperty(value = "配置项类型")
    private String ems_configuration_type;

    @ApiModelProperty(value = "组成id")
    private Integer ems_configuration_compositionid;
    @ApiModelProperty(value = "数据类型id")
    private Integer ems_configuration_datatypeid;
}
