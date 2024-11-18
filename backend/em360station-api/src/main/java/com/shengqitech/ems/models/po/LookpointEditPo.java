package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/1/3
 * @Description: 编辑看点PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "LookpointEditPo", description = "编辑看点PO类")
public class LookpointEditPo extends LookpointAddPo {
    @ApiModelProperty(value = "看点id")
    private Integer ems_lookpoint_id;
}
