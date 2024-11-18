package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

/**
 * Created by xuxueli on 16/9/30.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "XxlJobGroup", description = "执行器实体类")
public class XxlJobGroup {

    @ApiModelProperty(value = "执行器id")
    private int id;
    @ApiModelProperty(value = "执行器AppName")
    private String appname;
    @ApiModelProperty(value = "执行器名称")
    private String title;
    @ApiModelProperty(value = "执行器地址类型：0=自动注册、1=手动录入")
    private int addressType;        // 执行器地址类型：0=自动注册、1=手动录入
    @ApiModelProperty(value = "执行器地址列表，多地址逗号分隔")
    private String addressList;     // 执行器地址列表，多地址逗号分隔(手动录入)
    @ApiModelProperty(value = "修改时间")
    private Date updateTime;
    @ApiModelProperty(value = "调度任务JobHandler与描述JSON数组")
    private String jobHandlers;
    @ApiModelProperty(value = "客户id")
    private Integer customerId;

    // registry list
    private List<String> registryList;  // 执行器地址列表(系统注册)
    public List<String> getRegistryList() {
        if (addressList!=null && addressList.trim().length()>0) {
            registryList = new ArrayList<String>(Arrays.asList(addressList.split(",")));
        }
        return registryList;
    }

}
