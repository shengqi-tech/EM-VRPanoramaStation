package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
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
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Property对象", description = "")
public class Property implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "属性表")
    private Integer ems_property_id;

    @ApiModelProperty(value = "属性表 属性标识")
    private String ems_property_code;

    @ApiModelProperty(value = "序号")
    private Integer ems_property_index;

    @ApiModelProperty(value = "属性名")
    private String ems_property_name;

    @ApiModelProperty(value = "属性标识符")
    private String ems_property_identifier;

    @ApiModelProperty(value = "描述")
    private String ems_property_des;

    @ApiModelProperty(value = "属性单位(目前使用字符串，以后会用字典表)")
    private String ems_property_unit;

    private Integer ems_property_datatypeid;

    @ApiModelProperty(value = "0、工况数据  1、业务数据 2、其他属性")
    private Integer ems_property_type;

    @ApiModelProperty(value = "模块id")
    private Integer ems_property_moduleid;
}
