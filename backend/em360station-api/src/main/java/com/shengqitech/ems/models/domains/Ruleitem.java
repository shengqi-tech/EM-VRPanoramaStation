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
@ApiModel(value = "Ruleitem对象", description = "")
public class Ruleitem implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "规则项表")
    private Integer ems_roleitem_id;

    @ApiModelProperty(value = "规则项名字")
    private String ems_roleitem_name;

    @ApiModelProperty(value = "规则项单位")
    private String ems_roleitem_unit;

    @ApiModelProperty(value = "创建时间")
    private Date ems_roleitem_createtime;

    @ApiModelProperty(value = "修改时间")
    private Date ems_roleitem_updatetime;
}
