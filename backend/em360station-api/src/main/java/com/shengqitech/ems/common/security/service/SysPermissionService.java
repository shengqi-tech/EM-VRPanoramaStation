package com.shengqitech.ems.common.security.service;

import com.shengqitech.ems.models.domains.Role;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.services.IItemService;
import com.shengqitech.ems.services.IRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.util.CollectionUtils;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 用户权限处理
 *
 */
@Component
public class SysPermissionService {
    @Autowired
    private IRoleService roleService;

    @Autowired
    private IItemService menuService;

    /**
     * 获取角色数据权限
     *
     * @param user 用户信息
     * @return 角色权限信息
     */
    public Set<String> getRolePermission(Sysuser user) {
        Set<String> roles = new HashSet<String>();
        // 管理员拥有所有权限
        if (user.isAdmin()) {
            roles.add("admin");
        } else {
            roles.addAll(roleService.selectRolePermissionByUserId(user.getEms_sysuser_id()));
        }
        return roles;
    }

    /**
     * 获取菜单数据权限
     *
     * @param user 用户信息
     * @return 菜单权限信息
     */
    public Set<String> getMenuPermission(Sysuser user) {
        Set<String> perms = new HashSet<String>();
        // 管理员拥有所有权限
        if (user.isAdmin()) {
            perms.add("*:*:*");
        } else {
            List<Role> roles = user.getRoles();
            if (!CollectionUtils.isEmpty(roles)) {
                // 多角色设置permissions属性，以便数据权限匹配权限
                for (Role role : roles) {
                    Set<String> rolePerms = menuService.selectMenuPermsByRoleId(role.getEms_role_id());
                    role.setPermissions(rolePerms);
                    perms.addAll(rolePerms);
                }
            } else {
                perms.addAll(menuService.selectMenuPermsByUserId(user.getEms_sysuser_id()));
            }
        }
        return perms;
    }
}
