package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/3/4
 * @Description: 编辑角色PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "RoleEditPo", description = "编辑角色PO类")
public class RoleEditPo extends RoleAddPo{

    @ApiModelProperty(value = "角色id")
    private Integer ems_role_id;

}
