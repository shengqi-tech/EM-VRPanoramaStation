package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Role;
import com.shengqitech.ems.models.vo.RoleViewVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface RoleMapper{


    public List<Role> selectRolePermissionByUserId(Integer userId);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Role> findByMap(Map<String, Object> map);

    /**
     * 根据标识查询
     * @param ems_role_tag
     * @return
     */
    Role findByTag(String ems_role_tag);

    /**
     * 新增
     * @param role
     * @return
     */
    int insert(Role role);

    /**
     * 编辑
     * @param role
     * @return
     */
    int update(Role role);

    /**
     * 删除
     * @param ids
     * @return
     */
    int delete(Integer[] ids);

    /**
     * 根据角色删除角色菜单关系
     * @param ems_role_id
     * @return
     */
    int deleteRoleitem(Integer ems_role_id);

    /**
     * 添加角色菜单关系
     * @param ems_role_id
     * @param ids
     * @return
     */
    int inserRoleItem(Integer ems_role_id, Integer[] ids);

    /**
     * 查询详情
     * @param ems_role_id
     * @return
     */
    RoleViewVo getView(Integer ems_role_id);
}
