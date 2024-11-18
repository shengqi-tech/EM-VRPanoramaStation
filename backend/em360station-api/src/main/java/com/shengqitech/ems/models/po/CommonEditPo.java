package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/11/24
 * @Description: 编辑基础标签标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "CommonEditPo", description = "编辑基础标签标签PO类")
public class CommonEditPo extends CommonAddPo {

    /**
     * 基础标签表
     */
    @ApiModelProperty("基础标签表")
    private Integer ems_common_id;

}
