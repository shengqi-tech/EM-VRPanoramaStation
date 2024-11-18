package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.XxlJobInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/12/25
 * @Description: 调度任务VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "XxlJobInfoVo", description = "调度任务VO类")
public class XxlJobInfoVo extends XxlJobInfo {

    @ApiModelProperty("执行器Vo类")
    private XxlJobGroupVo jobGroupVo;

}
