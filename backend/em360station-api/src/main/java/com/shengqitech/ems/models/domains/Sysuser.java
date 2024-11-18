package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 用户实体类
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Sysuser", description = "用户实体类")
public class Sysuser implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "用户表")
    private Integer ems_sysuser_id;

    @ApiModelProperty(value = "登录账号 登录名")
    private String ems_sysuser_loginname;

    @ApiModelProperty(value = "登录账号 密码")
    private String ems_sysuser_password;

    @ApiModelProperty(value = "用户名")
    private String ems_sysuser_name;

    @ApiModelProperty(value = "头像文件id")
    private Integer ems_sysuser_avatarfileid;

    @ApiModelProperty(value = "帐号状态（0停用 1正常）")
    private Integer ems_sysuser_status;

    @ApiModelProperty(value = "客户id")
    private Integer ems_sysuser_customerid;

    @ApiModelProperty(value = "移动电话")
    private String ems_sysuser_mobilephone;

    @ApiModelProperty(value = "个性签名")
    private String ems_sysuser_signature;

    @ApiModelProperty(value = "地址")
    private String ems_sysuser_address;

    @ApiModelProperty(value = "创建时间")
    private Date ems_sysuser_creatime;

    @ApiModelProperty(value = "更新时间")
    private Date ems_sysuser_updatetime;

    @ApiModelProperty(value = "邮箱")
    private String ems_sysuser_email;

    @ApiModelProperty(value = "角色对象")
    private List<Role> roles;

    public boolean isAdmin() {
        return isAdmin(this.ems_sysuser_id);
    }

    public static boolean isAdmin(Integer userId) {
        return userId != null && 1L == userId;
    }
}
