package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Role", description = "角色表")
public class Role implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "角色表")
    private Integer ems_role_id;

    @ApiModelProperty(value = "角色标识")
    private String ems_role_tag;

    @ApiModelProperty(value = "角色名")
    private String ems_role_name;

    @ApiModelProperty(value = "角色的描述")
    private String ems_role_des;

    @ApiModelProperty(value = "创建时间")
    private Date ems_role_createtime;

    @ApiModelProperty(value = "更新时间")
    private Date ems_role_updatetime;
    @ApiModelProperty(value = "角色状态")
    private Integer ems_role_status;

    /** 角色菜单权限 */
    @ApiModelProperty(value = "角色菜单权限")
    private Set<String> permissions;
}
