package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/20
 * @Description: 编辑调度任务PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobInfoEditPo", description = "编辑调度任务PO类")
public class XxlJobInfoEditPo extends XxlJobInfoAddPo{
    @ApiModelProperty("调度任务id")
    private Integer id;

}
