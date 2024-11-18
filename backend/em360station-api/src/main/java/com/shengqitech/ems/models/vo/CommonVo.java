package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Property;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * <p>
 * 基础标签VO类
 * </p>
 *
 * @author wsh
 * @since 2023-06-07
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CommontagVo", description = "基础标签VO类")
public class CommonVo implements Serializable {

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

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    private Date ems_common_createtime;

    @ApiModelProperty("fov范围(标签显示的范围)")
    private String ems_common_fovrange;
    @ApiModelProperty("json数据")
    private String ems_common_jsondata;

    /**
     * 更新时间
     */
    @ApiModelProperty("更新时间")
    private Date ems_common_updatetime;

    /**
     * 标签图标文件对象
     */
    @ApiModelProperty("标签图标文件对象")
    private Sysfile ems_common_tagtypeiconfile;
    @ApiModelProperty("标签图标文件类型")
    private String ems_common_tagtype;
    @ApiModelProperty("标签图标文件pid")
    private String ems_common_tagtypepid;

    @ApiModelProperty("绑定设备列表")
    private List<DeviceCommonVo> ems_common_devices;
    @ApiModelProperty("绑定的属性列表")
    private List<Property> ems_common_properties;



}
