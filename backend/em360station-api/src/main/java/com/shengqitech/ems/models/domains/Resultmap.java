package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Resultmap", description = "结果映射表实体类")
public class Resultmap implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "结果映射表")
    private Integer ems_resultmap_id;

    @ApiModelProperty(value = "源")
    private String ems_resultmap_source;

    @ApiModelProperty(value = "目的地")
    private String ems_resultmap_destination;

    @ApiModelProperty(value = "平台对接表id")
    private Integer ems_resultmap_apiid;
    @ApiModelProperty(value = "创建时间")
    private Date ems_resultmap_createtime;
    @ApiModelProperty(value = "修改时间")
    private Date ems_resultmap_updatetime;
}
