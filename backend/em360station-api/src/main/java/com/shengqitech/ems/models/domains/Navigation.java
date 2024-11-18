package com.shengqitech.ems.models.domains;

import java.util.Date;
import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 导航标签实体类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Navigation", description = "导航标签实体类")
public class Navigation implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 全景导航表
     */
    @ApiModelProperty(value = "全景导航表")
    private Integer ems_navigation_id;

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
    /**
     * json数据
     */
    @ApiModelProperty(value = "json数据")
    private String ems_navigation_jsondata;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private Date ems_navigation_createtime;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "更新时间")
    private Date ems_navigation_updatetime;


}
