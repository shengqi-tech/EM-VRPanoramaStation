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
@ApiModel(value = "Condition对象", description = "")
public class Condition implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "条件表")
    private Integer ems_condition_id;

    @ApiModelProperty(value = "规则项id")
    private Integer ems_condition_ruleitemid;

    @ApiModelProperty(value = "规则id")
    private Integer ems_condition_ruleid;

    @ApiModelProperty(value = "操作id")
    private Integer ems_condition_operatorid;

    @ApiModelProperty(value = "条件值")
    private String ems_condition_value;

    @ApiModelProperty(value = "空间管控id")
    private Integer ems_condition_spacecontolrid;

    @ApiModelProperty(value = "创建时间")
    private Date ems_condition_createtime;

    @ApiModelProperty(value = "修改时间")
    private Date ems_condition_updatetime;
}
