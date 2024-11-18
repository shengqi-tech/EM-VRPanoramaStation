package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2024-01-29
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Module", description = "Module对象")
public class Module implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "产品模块表")
    private Integer ems_module_id;

    @ApiModelProperty(value = "模块名称")
    private String ems_module_name;

    @ApiModelProperty(value = "模型路径")
    private String ems_module_mode;

    @ApiModelProperty(value = "型号")
    private String ems_module_type;

    @ApiModelProperty(value = "规格")
    private String ems_module_specifications;

    @ApiModelProperty(value = "模块描述")
    private String ems_module_des;

    @ApiModelProperty(value = "版本id")
    private Integer ems_module_versionid;

    @ApiModelProperty(value = "模型图标")
    private String ems_module_icon;
}
