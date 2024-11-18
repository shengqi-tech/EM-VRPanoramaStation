package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/22
 * @Description: 客户VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CustomerVo", description = "客户VO类")
public class CustomerVo extends Customer {

    @ApiModelProperty(value = "客户logo文件对象")
    private Sysfile ems_customer_logofile;

}
