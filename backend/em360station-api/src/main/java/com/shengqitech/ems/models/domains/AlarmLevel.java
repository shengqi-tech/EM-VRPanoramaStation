package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 
 * </p>
 *
 * @author hgy
 * @since 2024-02-01
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "AlarmLevel对象", description = "报警等级")
public class AlarmLevel implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "报警等级表")
    private Integer ems_alarmlevel_id;

    @ApiModelProperty(value = "报警等级名称")
    private String ems_alarmlevel_name;

    @ApiModelProperty(value = "报警等级枚举 数")
    private Integer ems_alarmlevel_code;



}
