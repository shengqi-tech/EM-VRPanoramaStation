package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/12/5
 * @Description: 新增结果映射表PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ResultmapAddPo", description = "新增结果映射表PO类")
public class ResultmapAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "结果映射表")
    private Integer ems_resultmap_id;

    @ApiModelProperty(value = "源")
    private String ems_resultmap_source;

    @ApiModelProperty(value = "目的地")
    private String ems_resultmap_destination;

    @ApiModelProperty(value = "平台对接表id")
    private Integer ems_resultmap_apiid;
}
