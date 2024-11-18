package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Item", description = "ui界面元素表")
public class Item implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "ui界面元素表")
    private Integer ems_item_id;

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

    @ApiModelProperty(value = "创建时间")
    private Date ems_item_createtime;
    @ApiModelProperty(value = "修改时间")
    private Date ems_item_updatetime;

    @ApiModelProperty(value = "次序")
    private Integer ems_item_order;

    @ApiModelProperty(value = "菜单类型 （类型   0：目录   1：菜单   2：按钮,3:其他)")
    private Integer ems_item_type;


    /**
     * 子节点
     */
    private List<Item> ems_item_items= new ArrayList<>();;
}
