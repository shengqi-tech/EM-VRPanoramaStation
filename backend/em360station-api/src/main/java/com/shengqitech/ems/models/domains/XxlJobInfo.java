package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * xxl-job info
 *
 * @author xuxueli  2016-1-12 18:25:49
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "XxlJobInfo", description = "任务实体类")
public class XxlJobInfo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "主键ID")
    private int id;

    @ApiModelProperty(value = "执行器主键ID", required = true)
    private int jobGroup;
    @ApiModelProperty(value = "任务描述(名称)", required = true)
    private String jobDesc;
    @ApiModelProperty(value = "创建时间")
    private Date addTime;
    @ApiModelProperty(value = "修改时间")
    private Date updateTime;
    @ApiModelProperty(value = "负责人", required = true)
    private String author;
    @ApiModelProperty(value = "报警邮件")
    private String alarmEmail;
    @ApiModelProperty(value = "调度类型", required = true)
    private String scheduleType;
    @ApiModelProperty(value = "调度配置，值含义取决于调度类型", required = true)
    private String scheduleConf;
    @ApiModelProperty(value = "调度过期策略", required = true)
    private String misfireStrategy;
    @ApiModelProperty(value = "执行器路由策略", required = true)
    private String executorRouteStrategy;
    @ApiModelProperty(value = "执行器，任务Handler名称", required = true)
    private String executorHandler;
    @ApiModelProperty(value = "执行器，任务参数")
    private String executorParam;
    @ApiModelProperty(value = "阻塞处理策略", required = true)
    private String executorBlockStrategy;
    @ApiModelProperty(value = "任务执行超时时间，单位秒", required = true)
    private int executorTimeout;
    @ApiModelProperty(value = "失败重试次数", required = true)
    private int executorFailRetryCount;
    @ApiModelProperty(value = "GLUE类型\t#com.xxl.job.core.glue.GlueTypeEnum", required = true)
    private String glueType;
    @ApiModelProperty(value = "GLUE源代码")
    private String glueSource;
    @ApiModelProperty(value = "GLUE备注")
    private String glueRemark;
    @ApiModelProperty(value = "GLUE更新时间")
    private Date glueUpdatetime;
    @ApiModelProperty(value = "子任务ID，多个逗号分隔")
    private String childJobId;
    @ApiModelProperty(value = "调度状态：0-停止，1-运行")
    private int triggerStatus;
    @ApiModelProperty(value = "上次调度时间")
    private long triggerLastTime;
    @ApiModelProperty(value = "下次调度时间")
    private long triggerNextTime;


}
