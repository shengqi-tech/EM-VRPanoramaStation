package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2024/1/3
 * @Description: 新增看点PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "LookpointAddPo", description = "新增看点PO类")
public class LookpointAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "FOV")
    private Double ems_lookpoint_fov;

    @ApiModelProperty(value = "宽度")
    private Double ems_lookpoint_weight;

    @ApiModelProperty(value = "起点坐标")
    private Double ems_lookpoint_startcoordinate;

    @ApiModelProperty(value = "热点id")
    private Integer ems_lookpoint_hotspotid;

    @ApiModelProperty(value = "导览id")
    private Integer ems_lookpoint_guideid;

    @ApiModelProperty(value = "热点类型",required = true)
    private String ems_lookpoint_hotspottype;
}
