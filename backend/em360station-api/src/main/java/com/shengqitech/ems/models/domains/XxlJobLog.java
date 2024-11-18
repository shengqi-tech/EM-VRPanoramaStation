package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * xxl-job log, used to track trigger process
 * @author xuxueli  2015-12-19 23:19:09
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "XxlJobLog", description = "调度日志类")
public class XxlJobLog {

    @ApiModelProperty(value = "主键ID")
	private long id;

    @ApiModelProperty(value = "执行器主键ID")
	// job info
	private int jobGroup;
    @ApiModelProperty(value = "任务，主键ID")
	private int jobId;
    @ApiModelProperty(value = "执行器地址，本次执行的地址")
	// execute info
	private String executorAddress;
    @ApiModelProperty(value = "执行器任务handler")
	private String executorHandler;
    @ApiModelProperty(value = "执行器任务参数")
	private String executorParam;
    @ApiModelProperty(value = "执行器任务分片参数，格式如 1/2")
	private String executorShardingParam;
    @ApiModelProperty(value = "失败重试次数")
	private int executorFailRetryCount;
    @ApiModelProperty(value = "调度-时间")
	// trigger info
	private Date triggerTime;
    @ApiModelProperty(value = "调度-结果")
	private int triggerCode;
    @ApiModelProperty(value = "调度-日志")
	private String triggerMsg;
    @ApiModelProperty(value = "执行-时间")
	// handle info
	private Date handleTime;
    @ApiModelProperty(value = "执行-状态")
	private int handleCode;
    @ApiModelProperty(value = "执行-日志")
	private String handleMsg;
    @ApiModelProperty(value = "告警状态：0-默认、1-无需告警、2-告警成功、3-告警失败")
	// alarm info
	private int alarmStatus;

}
