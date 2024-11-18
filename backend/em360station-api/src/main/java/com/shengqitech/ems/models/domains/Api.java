package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 平台对接表实体类
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Api", description = "平台对接表实体类")
public class Api implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "平台对接表")
    private Integer ems_api_id;

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
    @ApiModelProperty(value = "创建时间")
    private Date ems_api_createtime;
    @ApiModelProperty(value = "修改时间")
    private Date ems_api_updatetime;
    @ApiModelProperty(value = "分组id")
    private Integer ems_api_restapigroupid;
}
