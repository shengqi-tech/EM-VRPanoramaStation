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
 * 行业
 * </p>
 *
 * @author hgy
 * @since 2024-01-25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Sector", description = "行业表")
public class Sector implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "行业表")
    private Integer ems_sector_id;

    @ApiModelProperty(value = "行业父id")
    private Integer ems_sector_pid;

    @ApiModelProperty(value = "行业名称")
    private String ems_sector_name;

    @ApiModelProperty(value = "图标名，可以在前端通过iconfont呈现")
    private String ems_sector_icon;

    @ApiModelProperty(value = "序号")
    private Integer ems_sector_index;

    @ApiModelProperty(value = "描述")
    private String ems_sector_des;
    
}
