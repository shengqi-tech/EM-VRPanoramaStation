package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author : wsh
 * @Date : 2024/3/5
 * @Description: 新增菜单PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ItemAddPo", description = "新增菜单PO类")
public class ItemAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "父节点id")
    private Integer ems_item_parentid;

    @ApiModelProperty(value = "菜单标识")
    private String ems_item_code;

    @ApiModelProperty(value = "菜单名称")
    private String ems_item_name;

    @ApiModelProperty(value = "菜单或按钮事件请求路径")
    private String ems_item_path;

    @ApiModelProperty(value = "菜单图标 iconfont name")
    private String ems_item_icon;

    @ApiModelProperty(value = "次序")
    private Integer ems_item_order;

    @ApiModelProperty(value = "菜单类型 （类型   0：目录   1：菜单   2：按钮,3:其他)")
    private Integer ems_item_type;
}
