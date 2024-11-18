package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/11/30
 * @Description: 新增导航标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "NavigationAddPo", description = "新增导航标签PO类")
public class NavigationAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 导航名字
     */
    @ApiModelProperty(value = "导航名字")
    private String ems_navigation_name;

    /**
     * 属于哪个全景图id
     */
    @ApiModelProperty(value = "属于哪个全景图id")
    private Integer ems_navigation_panoramaid;

    /**
     * 导航去 全景图id
     */
    @ApiModelProperty(value = "导航去 全景图id")
    private Integer ems_navigation_topanoramaid;

    /**
     * 标签类型id
     */
    @ApiModelProperty(value = "标签类型id")
    private Integer ems_navigation_tagtypeid;

    /**
     * 导航旋转角度("0,-7,0")
     */
    @ApiModelProperty(value = "导航旋转角度(\"0,-7,0\")")
    private String ems_navigation_rotation;

    /**
     * 导航位置("-0.49,-7.71,-48.49")
     */
    @ApiModelProperty(value = "导航位置(\"-0.49,-7.71,-48.49\")")
    private String ems_navigation_location;

    /**
     * 宽度比例
     */
    @ApiModelProperty(value = "宽度比例")
    private Double ems_navigation_widthratio;

    /**
     * 高度比例
     */
    @ApiModelProperty(value = "高度比例")
    private Double ems_navigation_heightratio;

    /**
     * 标签动画id
     */
    @ApiModelProperty(value = "标签动画id")
    private Integer ems_navigation_taganimationid;
    @ApiModelProperty(value = "json数据")
    private String ems_navigation_jsondata;

}
