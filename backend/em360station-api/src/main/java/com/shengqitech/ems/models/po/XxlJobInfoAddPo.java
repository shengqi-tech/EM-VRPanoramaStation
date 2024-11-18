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
 * @Date : 2023/12/20
 * @Description: 新增调度任务PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobInfoAddPo", description = "新增调度任务PO类")
public class XxlJobInfoAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "执行器主键ID", required = true)
    private int jobGroup;
    @ApiModelProperty(value = "任务描述(名称)", required = true)
    private String jobDesc;
    @ApiModelProperty(value = "负责人", required = true)
    private String author;
    @ApiModelProperty(value = "报警邮件")
    private String alarmEmail;
    @ApiModelProperty(value = "调度类型(无:NONE、CRON:CRON、固定速度:FIX_RATE)", required = true)
    private String scheduleType;
    @ApiModelProperty(value = "调度配置，值含义取决于调度类型", required = true)
    private String scheduleConf;
    @ApiModelProperty(value = "调度过期策略(DO_NOTHING)", required = true)
    private String misfireStrategy;
    @ApiModelProperty(value = "执行器路由策略(FIRST)", required = true)
    private String executorRouteStrategy;
    @ApiModelProperty(value = "执行器，任务Handler名称", required = true)
    private String executorHandler;
    @ApiModelProperty(value = "执行器，任务参数")
    private String executorParam;
    @ApiModelProperty(value = "阻塞处理策略(SERIAL_EXECUTION)", required = true)
    private String executorBlockStrategy;
    @ApiModelProperty(value = "任务执行超时时间，单位秒", required = true)
    private int executorTimeout;
    @ApiModelProperty(value = "失败重试次数", required = true)
    private int executorFailRetryCount;
    @ApiModelProperty(value = "GLUE类型(BEAN、GLUE(Java)、GLUE(Shell)、GLUE(Python)、GLUE(PHP)、GLUE(Nodejs)、GLUE(PowerShell))", required = true)
    private String glueType;
    @ApiModelProperty(value = "GLUE源代码")
    private String glueSource;
    @ApiModelProperty(value = "GLUE备注")
    private String glueRemark;
    @ApiModelProperty(value = "子任务ID，多个逗号分隔")
    private String childJobId;
}
