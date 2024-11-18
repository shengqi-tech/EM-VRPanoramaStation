package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 操作日志记录
 * </p>
 *
 * @author 
 * @since 2024-03-11
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Syslog", description = "操作日志记录")
public class Syslog implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "日志主键")
    private Long ems_syslog_id;

    @ApiModelProperty(value = "模块标题")
    private String ems_syslog_title;

    @ApiModelProperty(value = "业务类型（0其它 1新增 2修改 3删除）")
    private Integer ems_syslog_type;

    @ApiModelProperty(value = "方法名称")
    private String ems_syslog_method;

    @ApiModelProperty(value = "请求方式")
    private String ems_syslog_requestmethod;

    @ApiModelProperty(value = "操作类别（0其它 1后台用户 2手机端用户）")
    private Integer ems_syslog_opertype;

    @ApiModelProperty(value = "操作人员id")
    private Integer ems_syslog_operid;
    @ApiModelProperty(value = "操作人员")
    private String ems_syslog_opername;

    @ApiModelProperty(value = "客户id")
    private Integer ems_syslog_customerid;

    @ApiModelProperty(value = "请求URL")
    private String ems_syslog_operurl;

    @ApiModelProperty(value = "主机地址")
    private String ems_syslog_operip;

    @ApiModelProperty(value = "请求参数")
    private String ems_syslog_operparam;

    @ApiModelProperty(value = "返回参数")
    private String ems_syslog_jsonresult;

    @ApiModelProperty(value = "操作状态（0正常 1异常）")
    private Integer ems_syslog_status;

    @ApiModelProperty(value = "错误消息")
    private String ems_syslog_errormsg;

    @ApiModelProperty(value = "操作时间")
    private Date ems_syslog_opertime;

    @ApiModelProperty(value = "消耗时间")
    private Long ems_syslog_costtime;
}
