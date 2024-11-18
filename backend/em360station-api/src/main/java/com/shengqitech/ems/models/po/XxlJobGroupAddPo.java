package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author : wsh
 * @Date : 2023/12/22
 * @Description: 新增执行器PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobGroupAddPo", description = "新增执行器PO类")
public class XxlJobGroupAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "执行器AppName")
    private String appname;
    @ApiModelProperty(value = "执行器名称")
    private String title;
    @ApiModelProperty(value = "调度任务JobHandler与描述JSON数组")
    private String jobHandlers;
    @ApiModelProperty(value = "客户id")
    private Integer customerId;

}
