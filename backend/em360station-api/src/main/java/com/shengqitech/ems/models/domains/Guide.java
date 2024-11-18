package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 导览实体类
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Guide", description = "导览实体类")
public class Guide implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "导览点表")
    private Integer ems_guide_id;

    @ApiModelProperty(value = "导览点名称")
    private String ems_guide_name;

    @ApiModelProperty(value = "导览点封面文件id")
    private Integer ems_guide_coverid;

    @ApiModelProperty(value = "导览点简介")
    private String ems_guide_intr;

    @ApiModelProperty(value = "监测站站点id")
    private Integer ems_guide_instanceid;

    @ApiModelProperty(value = "全景图id")
    private Integer ems_guide_panoramaid;

    @ApiModelProperty(value = "排序")
    private Double ems_guide_sort;
    @ApiModelProperty(value = "json数据")
    private String ems_guide_jsondata;
}
