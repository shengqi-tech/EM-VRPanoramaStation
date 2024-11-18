package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/11/29
 * @Description: 新增视频融合标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "VideofusionAddPo", description = "新增视频融合标签PO类")
public class VideofusionAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 视频融合标签名称
     */
    @ApiModelProperty("视频融合标签名称")
    private String ems_videofusion_name;

    /**
     * 全景图id
     */
    @ApiModelProperty("全景图id")
    private Integer ems_videofusion_panoramaid;

    /**
     * 标签类型id
     */
    @ApiModelProperty("标签类型id")
    private Integer ems_videofusion_tagtypeid;

    /**
     * FLV视频流地址
     */
    @ApiModelProperty("FLV视频流地址")
    private String ems_videofusion_flvurl;

    /**
     * 参数信息
     */
    @ApiModelProperty("参数信息")
    private String ems_videofusion_param;

    /**
     * 设备id
     */
    @ApiModelProperty("设备id")
    private Integer ems_videofusion_deviceid;

    /**
     * 视频融合标签旋转角度("0,-7,0")
     */
    @ApiModelProperty("视频融合标签旋转角度(\"0,-7,0\")")
    private String ems_videofusion_rotation;

    /**
     * 视频融合标签位置("-0.49,-7.71,-48.49")
     */
    @ApiModelProperty("视频融合标签位置(\"-0.49,-7.71,-48.49\")")
    private String ems_videofusion_location;

    /**
     * 图标宽度比例
     */
    @ApiModelProperty("图标宽度比例")
    private Double ems_videofusion_widthratio;

    /**
     * 图标高度比例
     */
    @ApiModelProperty("图标高度比例")
    private Double ems_videofusion_heightratio;

    /**
     * 相机旋转角度("0,-7,0")
     */
    @ApiModelProperty("相机旋转角度(\"0,-7,0\")")
    private String ems_videofusion_camrotation;

    /**
     * 相机投影画面比例("0,0,0")
     */
    @ApiModelProperty("相机投影画面比例(\"0,0,0\")")
    private String ems_videofusion_viewscale;

    /**
     * 近平面距离
     */
    @ApiModelProperty("近平面距离")
    private Double ems_videofusion_near;

    /**
     * 远平面距离
     */
    @ApiModelProperty("远平面距离")
    private Double ems_videofusion_far;
}
