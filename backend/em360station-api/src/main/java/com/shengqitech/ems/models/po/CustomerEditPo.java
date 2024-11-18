package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/22
 * @Description: 编辑客户PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CustomerEditPo", description = "编辑客户PO类")
public class CustomerEditPo extends CustomerAddPo{

    @ApiModelProperty(value = "客户id")
    private Integer ems_customer_id;
}
