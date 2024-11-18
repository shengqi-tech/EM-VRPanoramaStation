package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;
import java.util.Set;

/**
 * @author : wsh
 * @Date : 2024/3/4
 * @Description: 新增角色PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "RoleAddPo", description = "新增角色PO类")
public class RoleAddPo implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "角色标识", required = true)
    private String ems_role_tag;

    @ApiModelProperty(value = "角色名")
    private String ems_role_name;

    @ApiModelProperty(value = "角色的描述")
    private String ems_role_des;
    @ApiModelProperty(value = "菜单id数组", required = true)
    private Integer[] ems_role_itemids;

    @ApiModelProperty(value = "角色状态")
    private Integer ems_role_status;


}
