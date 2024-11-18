package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/11/30
 * @Description: 编辑导航标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "NavigationEditPo", description = "编辑导航标签PO类")
public class NavigationEditPo extends NavigationAddPo{

    /**
     * 导航标签id
     */
    @ApiModelProperty(value = "导航标签id")
    private Integer ems_navigation_id;

}
