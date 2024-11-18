package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.domains.XxlJobGroup;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/25
 * @Description: 执行器Vo类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobGroupVo", description = "执行器Vo类")
public class XxlJobGroupVo extends XxlJobGroup {

    @ApiModelProperty("客户Vo类")
    private CustomerVo customerVo;

}
