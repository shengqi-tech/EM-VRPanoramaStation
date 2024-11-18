package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/4
 * @Description: 编辑平台对接PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ApiEditPo", description = "新增平台对接PO类")
public class ApiEditPo extends ApiAddPo{
    @ApiModelProperty(value = "平台对接表id")
    private Integer ems_api_id;

}
