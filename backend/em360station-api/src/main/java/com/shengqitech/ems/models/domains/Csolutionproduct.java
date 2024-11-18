package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
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
@ApiModel(value = "Csolutionproduct对象", description = "")
public class Csolutionproduct implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "方案产品表")
    private Integer ems_layoutproduct_id;

    @ApiModelProperty(value = "设计点位名称")
    private String ems_layoutproduct_designposition;

    @ApiModelProperty(value = "方案id")
    private Integer ems_layoutproduct_csolutionid;

    @ApiModelProperty(value = "产品id")
    private Integer ems_layoutproduct_productid;
}
