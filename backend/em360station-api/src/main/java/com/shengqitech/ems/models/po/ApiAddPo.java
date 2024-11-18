package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/12/4
 * @Description: 新增平台对接PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ApiAddPo", description = "新增平台对接PO类")
public class ApiAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "api名称")
    private String ems_api_name;
    @ApiModelProperty(value = "地址")
    private String ems_api_url;

    @ApiModelProperty(value = "请求参数JSON(字段名、字段值、字段类型、字段描述)")
    private String ems_api_parameters;

    @ApiModelProperty(value = "请求头JSON(包含token等)")
    private String ems_api_header;

    @ApiModelProperty(value = "对接人id")
    private Integer ems_api_receptorid;

    @ApiModelProperty(value = "请求类型(GET POST)")
    private String ems_api_requesttype;

    @ApiModelProperty(value = "用户id")
    private Integer ems_api_sysuserid;
    @ApiModelProperty(value = "分组id")
    private Integer ems_api_restapigroupid;
}
