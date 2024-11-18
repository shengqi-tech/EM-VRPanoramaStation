package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 产品
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Product", description = "产品表")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "产品表")
    private Integer ems_product_id;

    @ApiModelProperty(value = "产品名称")
    private String ems_product_name;

    @ApiModelProperty(value = "产品图片文件id")
    private Integer ems_product_picfileid;

    @ApiModelProperty(value = "产品模型文件id")
    private Integer ems_product_modelfileid;

    @ApiModelProperty(value = "产品型号")
    private String ems_product_type;

    @ApiModelProperty(value = "产品描述")
    private String ems_product_des;

    @ApiModelProperty(value = "组成id")
    private Integer ems_product_compositionid;

    @ApiModelProperty(value = "创建时间")
    private Date ems_product_createtime;

    @ApiModelProperty(value = "更新时间")
    private Date ems_product_updatetime;

    @ApiModelProperty(value = "品牌")
    private String ems_product_brand;
}
