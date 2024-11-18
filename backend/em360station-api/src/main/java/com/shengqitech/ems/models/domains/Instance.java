package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author wsh
 * @since 2023-06-08
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Instance", description = "监测站点实体类")
public class Instance {
    @ApiModelProperty("监测站id")
    private Integer ems_instance_id;
    @ApiModelProperty("站点坐标")
    private String ems_instance_coordinate;
    @ApiModelProperty("站点名称")
    private String ems_instance_name;
    @ApiModelProperty("站点编号")
    private String ems_instance_no;
    @ApiModelProperty("解决方案id")
    private Integer ems_instance_csolutionid;
    @ApiModelProperty("建设开始时间")
    private Date ems_instance_constructionstarttime;
    @ApiModelProperty("场景id")
    private Integer ems_instance_sceneid;
    @ApiModelProperty("现场图片文件id")
    private Integer ems_instance_picfileid;
    @ApiModelProperty("监测站的简介")
    private String ems_instance_des;
    @ApiModelProperty(" 断面/点位编号")
    private Integer ems_instance_sectionid;
    @ApiModelProperty("创建时间")
    private Date ems_instance_createtime;
    @ApiModelProperty("更新时间")
    private Date ems_instance_updatetime;
    @ApiModelProperty("详细地址")
    private String ems_instance_address;
    @ApiModelProperty("建设结束时间")
    private Date ems_instance_constructionendtime;
    @ApiModelProperty("创建者id")
    private Integer ems_instance_creatorid;
    @ApiModelProperty("全景全局设置")
    private String ems_instance_globeconf;
    @ApiModelProperty("是否个人爱好(0:否、1:是)")
    private Integer ems_instance_ishobby;

    @ApiModelProperty("承建者id(哪家公司建设，customerid)")
    private Integer ems_instance_contractorid;

    @ApiModelProperty("是否开放共享 (0、不开放，1、开放)")
    private Integer ems_instance_isshare;

}
