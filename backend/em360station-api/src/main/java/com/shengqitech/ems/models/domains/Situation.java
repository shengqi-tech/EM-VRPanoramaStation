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
 * 监测状况
 * </p>
 *
 * @author hgy
 * @since 2024-01-25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Situation", description = "监测状况表")
public class Situation implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "监测状况表")
    private Integer ems_situation_id;

    @ApiModelProperty(value = "监测状况名称")
    private String ems_situation_name;

    @ApiModelProperty(value = "图标名，可以在前端通过iconfont呈现")
    private String ems_situation_icon;

    @ApiModelProperty(value = "序号")
    private Integer ems_situation_index;

    @ApiModelProperty(value = "描述")
    private String ems_situation_des;

}
