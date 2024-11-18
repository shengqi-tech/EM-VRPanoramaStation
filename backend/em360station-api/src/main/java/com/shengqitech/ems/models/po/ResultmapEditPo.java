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
 * @Description: 编辑结果映射表PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ResultmapEditPo", description = "编辑结果映射表PO类")
public class ResultmapEditPo extends ResultmapAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "结果映射表")
    private Integer ems_resultmap_id;

}
