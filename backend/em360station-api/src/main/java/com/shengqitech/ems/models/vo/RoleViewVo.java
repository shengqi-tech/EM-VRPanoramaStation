package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Item;
import com.shengqitech.ems.models.domains.Role;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/3/5
 * @Description: 角色详情Vo类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "RoleViewVo", description = "角色详情Vo类")
public class RoleViewVo extends Role {

    @ApiModelProperty(value = "菜单列表")
    List<Item> ems_role_items;

}
