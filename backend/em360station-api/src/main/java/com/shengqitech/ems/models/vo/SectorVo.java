package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Activity;
import com.shengqitech.ems.models.domains.Resultmap;
import com.shengqitech.ems.models.domains.Sector;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : hgy
 * @Date : 2024/01/25
 * @Description: 行业VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "SectorVo", description = "行业VO类")
public class SectorVo extends Sector implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "行业子分类")
    private List<SectorVo> ems_sector_sectors= new ArrayList<>();


    @ApiModelProperty(value = "监测活动")
    private List<Activity> ems_sector_activities;
}
