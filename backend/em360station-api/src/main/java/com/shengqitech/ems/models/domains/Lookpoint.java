package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 看点实体类
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Lookpoint", description = "看点实体类")
public class Lookpoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "看点id",required = false)
    private Integer ems_lookpoint_id;

    @ApiModelProperty(value = "FOV",required = false)
    private Double ems_lookpoint_fov;

    @ApiModelProperty(value = "宽度",required = false)
    private Double ems_lookpoint_weight;

    @ApiModelProperty(value = "起点坐标",required = false)
    private Double ems_lookpoint_startcoordinate;

    @ApiModelProperty(value = "热点id",required = true)
    private Integer ems_lookpoint_hotspotid;

    @ApiModelProperty(value = "导览id",required = true)
    private Integer ems_lookpoint_guideid;
    @ApiModelProperty(value = "热点类型",required = true)
    private String ems_lookpoint_hotspottype;
}
