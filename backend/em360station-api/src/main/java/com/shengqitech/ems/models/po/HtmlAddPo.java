package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.io.Serializable;

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
@ApiModel(value = "HtmlAddPo", description = "新增网页标签PO类")
public class HtmlAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 网页标签名称
     */
    @ApiModelProperty("网页标签名称")
    private String ems_html_name;

    /**
     * 全景图id
     */
    @ApiModelProperty("全景图id")
    private Integer ems_html_panoramaid;

    /**
     * 标签类型id
     */
    @ApiModelProperty("标签类型id")
    private Integer ems_html_tagtypeid;

    /**
     * 资源链接地址(系统资源地址)
     */
    @ApiModelProperty("资源链接地址(系统资源地址)")
    private String ems_html_url;

    /**
     * 宽度比例
     */
    @ApiModelProperty("宽度比例")
    private Double ems_html_widthratio;

    /**
     * 高度比例
     */
    @ApiModelProperty("高度比例")
    private Double ems_html_heightratio;

    /**
     * 标签动画id
     */
    @ApiModelProperty("标签动画id")
    private Integer ems_html_taganimationid;

    /**
     * 基础标签旋转角度("0,-7,0")
     */
    @ApiModelProperty("基础标签旋转角度(0,-7,0)")
    private String ems_html_rotation;

    /**
     * 基础标签位置("-0.49,-7.71,-48.49")
     */
    @ApiModelProperty("基础标签位置(-0.49,-7.71,-48.49)")
    private String ems_html_location;
    @ApiModelProperty("JSON数据")
    private String ems_html_jsondata;


}
