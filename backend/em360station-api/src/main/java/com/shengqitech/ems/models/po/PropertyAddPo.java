package com.shengqitech.ems.models.po;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : hgy
 * @Date : 2024/1/31
 * @Description: 新增产品属性PO类
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "PropertyAddPo", description = "新增产品属性PO类")
public class PropertyAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "属性名")
    private String ems_property_name;

    @ApiModelProperty(value = "属性表 属性标识")
    private String ems_property_code;

    @ApiModelProperty(value = "属性单位")
    private String ems_property_unit;

    @ApiModelProperty(value = "所属模块id")
    private Integer ems_property_moduleid;

    @ApiModelProperty(value = "描述")
    private String ems_property_des;

    @ApiModelProperty(value = "数据类型")
    private Integer ems_property_datatypeid;

    @ApiModelProperty(value = "属性标识符")
    private String ems_property_identifier;

    @ApiModelProperty(value = "0、工况数据  1、业务数据 2、其他属性")
    private Integer ems_property_type;

    @ApiModelProperty(value = "序号")
    private Integer ems_property_index;
}
