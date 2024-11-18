package com.shengqitech.ems.models.domains;

import java.util.Date;
import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Common", description = "基础标签标签实体类")
public class Common implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 基础标签表
     */
    @ApiModelProperty("基础标签表")
    private Integer ems_common_id;

    /**
     * 基础标签名称
     */
    @ApiModelProperty("基础标签名称")
    private String ems_common_name;

    /**
     * 全景图id
     */
    @ApiModelProperty("全景图id")
    private Integer ems_common_panoramaid;

    /**
     * 标签类型id
     */
    @ApiModelProperty("标签类型id")
    private Integer ems_common_tagtypeid;

    /**
     * 宽度比例
     */
    @ApiModelProperty("宽度比例")
    private Double ems_common_widthratio;

    /**
     * 高度比例
     */
    @ApiModelProperty("高度比例")
    private Double ems_common_heightratio;

    /**
     * 标签动画id
     */
    @ApiModelProperty("标签动画id")
    private Integer ems_common_taganimationid;

    /**
     * 基础标签旋转角度("0,-7,0")
     */
    @ApiModelProperty("基础标签旋转角度(\"0,-7,0\")")
    private String ems_common_rotation;

    /**
     * 基础标签位置("-0.49,-7.71,-48.49")
     */
    @ApiModelProperty("基础标签位置(\"-0.49,-7.71,-48.49\")")
    private String ems_common_location;

    /**
     * 是否显示(0:不显示,1:显示)
     */
    @ApiModelProperty("是否显示(0:不显示,1:显示)")
    private Integer ems_common_isview;
    /**
     * 是否嵌入(0:否 DIV,1:是 threejs对象)
     */
    @ApiModelProperty("是否嵌入(0:否 DIV,1:是 threejs对象)")
    private Integer ems_common_isembed;
    @ApiModelProperty("是否嵌入(0:否 DIV,1:是 threejs对象)")
    private String ems_common_fovrange;
    /**
     * json数据
     */
    @ApiModelProperty("json数据")
    private String ems_common_jsondata;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    private Date ems_common_createtime;

    /**
     * 更新时间
     */
    @ApiModelProperty("更新时间")
    private Date ems_common_updatetime;


}
