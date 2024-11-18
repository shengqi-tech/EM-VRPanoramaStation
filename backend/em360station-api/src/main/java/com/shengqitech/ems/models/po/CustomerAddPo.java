package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author : wsh
 * @Date : 2023/12/22
 * @Description: 新增客户PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CustomerAddPo", description = "新增客户PO类")
public class CustomerAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "客户名称")
    private String ems_customer_name;

    @ApiModelProperty(value = "客户logo文件对象")
    private Sysfile ems_customer_logofile;

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

    @ApiModelProperty(value = "法人姓名")
    private String ems_customer_legalperson;
    @ApiModelProperty(value = "组织机构代码", required = true)
    private String ems_customer_organizationcode;
    @ApiModelProperty(value = "邮箱", required = true)
    private String ems_customer_email;

}
