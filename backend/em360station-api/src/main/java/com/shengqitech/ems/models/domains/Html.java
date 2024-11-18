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
@ApiModel(value = "Html", description = "网页标签实体类")
public class Html implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 网页标签表
     */
    @ApiModelProperty(value = "网页标签表")
    private Integer ems_html_id;

    /**
     * 网页标签名称
     */
    @ApiModelProperty(value = "网页标签名称")
    private String ems_html_name;

    /**
     * 全景图id
     */
    @ApiModelProperty(value = "全景图id")
    private Integer ems_html_panoramaid;

    /**
     * 标签类型id
     */
    @ApiModelProperty(value = "标签类型id")
    private Integer ems_html_tagtypeid;

    /**
     * 资源链接地址(系统资源地址)
     */
    @ApiModelProperty(value = "资源链接地址(系统资源地址)")
    private String ems_html_url;

    /**
     * 宽度比例
     */
    @ApiModelProperty(value = "宽度比例")
    private Double ems_html_widthratio;

    /**
     * 高度比例
     */
    @ApiModelProperty(value = "高度比例")
    private Double ems_html_heightratio;

    /**
     * 标签动画id
     */
    @ApiModelProperty(value = "标签动画id")
    private Integer ems_html_taganimationid;

    /**
     * 基础标签旋转角度("0,-7,0")
     */
    @ApiModelProperty(value = "基础标签旋转角度(\"0,-7,0\")")
    private String ems_html_rotation;

    /**
     * 基础标签位置("-0.49,-7.71,-48.49")
     */
    @ApiModelProperty(value = "基础标签位置(\"-0.49,-7.71,-48.49\")")
    private String ems_html_location;
    @ApiModelProperty(value = "JSON数据")
    private String ems_html_jsondata;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间")
    private Date ems_html_createtime;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "更新时间")
    private Date ems_html_updatetime;


}
