package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/1/2
 * @Description: 编辑导览PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "GuideEditPo", description = "编辑导览PO类")
public class GuideEditPo extends GuideAddPo{

    @ApiModelProperty(value = "导览id")
    private Integer ems_guide_id;

    @ApiModelProperty(value = "看点id")
    private Integer ems_lookpoint_id;

}
