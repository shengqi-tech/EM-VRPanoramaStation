package com.shengqitech.ems.models.domains;

import java.util.Date;
import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 全景场景实体类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Panorama", description = "全景场景实体类")
public class Panorama implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 全景场景表
     */
    @ApiModelProperty("全景场景表")
    private Integer ems_panorama_id;

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
     * 全景封面文件id
     */
    @ApiModelProperty("全景封面文件id")
    private Integer ems_panorama_coverid;

    /**
     * 全景切片文件id数组(1张原图+6张一级切片图+24张二级切片图)
     */
    @ApiModelProperty("全景切片文件id数组(1张原图+6张一级切片图+24张二级切片图)")
    private String ems_panorama_slicefileids;

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
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    private Date ems_panorama_createtime;

    /**
     * 更新时间
     */
    @ApiModelProperty("更新时间")
    private Date ems_panorama_updatetime;

    /**
     * 创建人id
     */
    @ApiModelProperty("创建人id")
    private Integer ems_panorama_userid;
    /**
     * 是否删除(0:否,1:是)
     */
    @ApiModelProperty("是否删除(0:否,1:是)")
    private Integer ems_panorama_isdelete;


}
