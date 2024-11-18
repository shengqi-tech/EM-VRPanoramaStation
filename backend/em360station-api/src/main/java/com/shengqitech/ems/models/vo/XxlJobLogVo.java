package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.XxlJobLog;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/27
 * @Description: 调度日志VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobLogVo", description = "调度日志VO类")
public class XxlJobLogVo extends XxlJobLog {

    @ApiModelProperty(value = "客户ID")
    private Integer ems_customer_id;
    @ApiModelProperty(value = "客户名称")
    private String ems_customer_name;
    @ApiModelProperty(value = "调度任务名称")
    private String jobDesc;

}
