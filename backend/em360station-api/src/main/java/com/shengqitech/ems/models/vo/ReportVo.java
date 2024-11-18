package com.shengqitech.ems.models.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/12/20
 * @Description: 调度管理VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ReportVo", description = "调度管理VO类")
public class ReportVo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty("任务数量")
    private Integer jobInfoCount;

    @ApiModelProperty("调度次数")
    private Integer jobLogCount;

    @ApiModelProperty("调度成功数")
    private Integer jobLogSuccessCount;

    @ApiModelProperty("执行器数量")
    private Integer executorCount;
    @ApiModelProperty("触发天数list")
    private List<String> triggerDayList;

    @ApiModelProperty("进行中list")
    private List<Integer> triggerDayCountRunningList;
    @ApiModelProperty("触发成功list")
    private List<Integer> triggerDayCountSucList;

    @ApiModelProperty("触发失败list")
    private List<Integer> triggerDayCountFailList;

    @ApiModelProperty("进行中总数")
    private Integer triggerCountRunningTotal;

    @ApiModelProperty("触发失败数量")
    private Integer triggerCountSucTotal;
    @ApiModelProperty("触发成功数量")
    private Integer triggerCountFailTotal;




}
