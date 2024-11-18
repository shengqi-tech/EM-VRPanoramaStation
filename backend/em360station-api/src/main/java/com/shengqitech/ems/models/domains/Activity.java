package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * <p>
 * 监测活动
 * </p>
 *
 * @author hgy
 * @since 2024-01-25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Activity", description = "监测活动表")
public class Activity implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "监测活动表")
    private Integer ems_activity_id;

    @ApiModelProperty(value = "监测活动名称")
    private String ems_activity_name;


    @ApiModelProperty(value = "监测要素id")
    private Integer ems_activity_elementid;


    @ApiModelProperty(value = "行业id")
    private Integer ems_activity_sectorid;
}
