package com.shengqitech.ems.models.po;

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
 * @author : wsh
 * @Date : 2023/6/12
 * @Description: 添加全景场景PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "PanoramaAddPo", description = "添加全景场景PO类")
public class PanoramaAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 场景名字
     */
    @ApiModelProperty("场景名字")
    private String ems_panorama_name;

    /**
     * 楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角)
     */
    @ApiModelProperty("楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角)")
    private Integer ems_panorama_level;

    /**
     * 全景封面文件
     */
    @ApiModelProperty("全景封面文件")
    private Sysfile ems_panorama_coverfile;

    /**
     * 全景切片文件数组(1张原图+6张一级切片图+24张二级切片图)
     */
    @ApiModelProperty("全景切片文件数组(1张原图+6张一级切片图+24张二级切片图)")
    private List<Sysfile> ems_panorama_slicefiles;

    /**
     * 排列顺序
     */
    @ApiModelProperty("排列顺序")
    private Double ems_panorama_index;

    /**
     * 是否是起始页 0 否 1 是
     */
    @ApiModelProperty("是否是起始页 0 否 1 是")
    private Integer ems_panorama_default;

    /**
     * 全景初始状态(位置、视角)
     */
    @ApiModelProperty("全景初始状态(位置、视角)")
    private String ems_panorama_initview;

    /**
     * 全景视场角(水平角:-180~180、垂直角:0~180)
     */
    @ApiModelProperty("全景视场角(水平角:-180~180、垂直角:0~180)")
    private String ems_panorama_fov;

    /**
     * 监测站 id
     */
    @ApiModelProperty("监测站 id")
    private Integer ems_panorama_instanceid;

    /**
     * 描述
     */
    @ApiModelProperty("描述")
    private String ems_panorama_des;

    /**
     * 创建人id
     */
    @ApiModelProperty("创建人id")
    private Integer ems_panorama_userid;
}
