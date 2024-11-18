package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author : wsh
 * @Date : 2024/1/11
 * @Description: 断面实体类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Section", description = "断面实体类")
public class Section implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "平台对接表")
    private Integer ems_section_id;
    @ApiModelProperty(value = "平台对接表")
    private String ems_section_geom;
    @ApiModelProperty(value = "平台对接表")
    private String ems_section_name;
    @ApiModelProperty(value = "平台对接表")
    private Date ems_section_settingtime;
    @ApiModelProperty(value = "平台对接表")
    private Integer ems_section_sectionlevelid;
    @ApiModelProperty(value = "平台对接表")
    private Integer ems_section_sectionfunctionid;
    @ApiModelProperty(value = "平台对接表")
    private Integer ems_section_sectiontypeid;
    @ApiModelProperty(value = "平台对接表")
    private Integer ems_section_activityid;
}
