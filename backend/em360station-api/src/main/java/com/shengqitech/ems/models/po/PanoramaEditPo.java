package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/6/12
 * @Description: 修改全景场景PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "PanoramaEditPo", description = "修改全景场景PO类")
public class PanoramaEditPo extends PanoramaAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 场景id
     */
    @ApiModelProperty("场景id")
    private Integer ems_panorama_id;
}
