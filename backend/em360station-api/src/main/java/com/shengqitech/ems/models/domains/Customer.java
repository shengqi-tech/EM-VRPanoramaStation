package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 客户实体类
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Customer", description = "客户实体类")
public class Customer implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "客户表")
    private Integer ems_customer_id;

    @ApiModelProperty(value = "客户名称", required = true)
    private String ems_customer_name;

    @ApiModelProperty(value = "客户logo path")
    private Integer ems_customer_logofileid;

    @ApiModelProperty(value = "州或者省")
    private String ems_customer_state;

    @ApiModelProperty(value = "城市")
    private String ems_customer_city;

    @ApiModelProperty(value = "区")
    private String ems_customer_region;

    @ApiModelProperty(value = "租户地址")
    private String ems_customer_address;

    @ApiModelProperty(value = "客户描述")
    private String ems_customer_des;

    @ApiModelProperty(value = "是否实名  0 待实名  1 已实名")
    private Integer ems_customer_isrealname;

    @ApiModelProperty(value = "创建时间")
    private Date ems_customer_createtime;
    @ApiModelProperty(value = "修改时间")
    private Date ems_customer_updatetime;
    @ApiModelProperty(value = "认证时间")
    private Date ems_customer_realnametime;
    @ApiModelProperty(value = "法人姓名")
    private String ems_customer_legalperson;
    @ApiModelProperty(value = "组织机构代码", required = true)
    private String ems_customer_organizationcode;
    @ApiModelProperty(value = "邮箱", required = true)
    private String ems_customer_email;
}
