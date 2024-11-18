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
@ApiModel(value = "Rule对象", description = "")
public class Rule implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "规则表")
    private Integer ems_rule_id;

    @ApiModelProperty(value = "规则名称")
    private String ems_rule_name;

    @ApiModelProperty(value = "规则类型  0、数据合规性规则、1、人员合规性规则、2.禁止触碰")
    private Integer ems_rule_type;

    @ApiModelProperty(value = "规则描述")
    private String ems_rule_des;

    @ApiModelProperty(value = "是否是统计类规则 0 不是 1是")
    private String ems_rule_isstatistics;

    @ApiModelProperty(value = "创建时间")
    private Date ems_rule_createtime;

    @ApiModelProperty(value = "更新时间")
    private Date ems_rule_updatetime;
}
