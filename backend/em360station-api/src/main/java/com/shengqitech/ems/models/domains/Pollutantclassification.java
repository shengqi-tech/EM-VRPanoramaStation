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
@ApiModel(value = "Pollutantclassification对象", description = "")
public class Pollutantclassification implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "污染物分类表")
    private Integer ems_pollutantclassification_id;

    @ApiModelProperty(value = "分类中文名称")
    private String ems_pollutantclassification_namecn;

    @ApiModelProperty(value = "分类英文名称")
    private String ems_pollutantclassification_nameen;

    @ApiModelProperty(value = "类别代码")
    private String ems_pollutantclassification_code;

    @ApiModelProperty(value = "类型图标")
    private String ems_pollutantclassification_icon;

    @ApiModelProperty(value = "类型描述")
    private String ems_pollutantclassification_des;

    @ApiModelProperty(value = "标准id")
    private Integer ems_pollutantclassification_standardid;
}
