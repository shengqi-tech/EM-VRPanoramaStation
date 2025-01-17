package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2024/2/28
 * @Description: 编辑用户信息PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "SysuserEditPo", description = "编辑用户信息PO类")
public class SysuserEditPo implements Serializable{
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "用户id")
    private Integer ems_sysuser_id;

    @ApiModelProperty(value = "用户名", required = true)
    private String ems_sysuser_name;

//    @ApiModelProperty(value = "帐号状态（0停用 1正常）", required = false)
//    private Integer ems_sysuser_status;

    @ApiModelProperty(value = "客户id", required = true)
    private Integer ems_sysuser_customerid;

    @ApiModelProperty(value = "用户角色(用于用户注册的时候选择角色)", name = "ems_role_ids", required = true)
    private Integer[] ems_role_ids;

    @ApiModelProperty(value = "用户头像文件")
    private Sysfile ems_sysuser_avatarfile;
    @ApiModelProperty(value = "个性签名 描述 简介")
    private String ems_sysuser_signature;
    @ApiModelProperty(value = "用户地址")
    private String ems_sysuser_address;
    @ApiModelProperty(value = "移动电话")
    private String ems_sysuser_mobilephone;
    @ApiModelProperty(value = "邮箱")
    private String ems_sysuser_email;
    @ApiModelProperty(value = "帐号状态（0停用 1正常）", required = true)
    private Integer ems_sysuser_status;
}
