package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/22
 * @Description: 编辑执行器PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobGroupEditPo", description = "编辑执行器PO类")
public class XxlJobGroupEditPo extends XxlJobGroupAddPo{

    @ApiModelProperty(value = "执行器id")
    private Integer id;
}
