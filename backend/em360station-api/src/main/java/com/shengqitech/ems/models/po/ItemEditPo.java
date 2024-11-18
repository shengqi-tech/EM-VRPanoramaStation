package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/3/6
 * @Description: 编辑菜单PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ItemEditPo", description = "编辑菜单PO类")
public class ItemEditPo extends ItemAddPo{

    @ApiModelProperty(value = "菜单id")
    private Integer ems_item_id;

}
