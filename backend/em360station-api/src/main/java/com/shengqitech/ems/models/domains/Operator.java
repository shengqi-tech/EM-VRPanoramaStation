package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Getter
@Setter
@ApiModel(value = "Operator对象", description = "")
public class Operator implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "运算表")
    private Integer ems_operator_id;

    @ApiModelProperty(value = "运算名")
    private String ems_operator_name;

    @ApiModelProperty(value = "运算符号")
    private String ems_operator_symbol;

    @ApiModelProperty(value = "运算符类型 0 逻辑运算符 1 算术运算符 2、其他")
    private String ems_operator_type;

    @ApiModelProperty(value = "创建时间")
    private Date ems_operator_createtime;

    @ApiModelProperty(value = "修改时间")
    private Date ems_operator_updatetime;
}
