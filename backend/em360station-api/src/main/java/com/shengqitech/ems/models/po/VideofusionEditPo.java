package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/11/29
 * @Description: 编辑视频融合标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "VideofusionEditPo", description = "编辑视频融合标签PO类")
public class VideofusionEditPo extends VideofusionAddPo{

    /**
     * 视频融合标签id
     */
    @ApiModelProperty("视频融合标签id")
    private Integer ems_videofusion_id;

}
