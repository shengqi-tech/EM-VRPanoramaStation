package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.vo.DeviceVo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/11/24
 * @Description: 新增基础标签标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CommonAddPo", description = "新增基础标签标签PO类")
public class CommonAddPo implements Serializable {

    private static final long serialVersionUID = 1L;


    /**
     * 产品属性id数组
     */
    @ApiModelProperty("产品属性id数组，包含多个产品属性")
    private Integer[] ems_common_propertyids;


    /**
     * 设备安装信息数组
     */
    @ApiModelProperty("设备安装信息数组")
    private List<CommonDeviceInstallPo> ems_common_deviceinstalls;


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

    @ApiModelProperty("fov范围(标签显示的范围)")
    private String ems_common_fovrange;
    @ApiModelProperty("json数据")
    private String ems_common_jsondata;

}
