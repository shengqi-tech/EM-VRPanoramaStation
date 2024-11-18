package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Role;
import com.shengqitech.ems.models.po.RoleAddPo;
import com.shengqitech.ems.models.po.RoleEditPo;
import com.shengqitech.ems.models.vo.RoleViewVo;

import java.util.List;
import java.util.Map;
import java.util.Set;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface IRoleService {

    /**
     * 根据用户ID查询角色权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    public Set<String> selectRolePermissionByUserId(Integer userId);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Role> findByMap(Map<String, Object> map);

    /**
     * 新增
     * @param roleAddPo
     * @return
     */
    Boolean insert(RoleAddPo roleAddPo);

    /**
     * 编辑
     * @param roleEditPo
     * @return
     */
    Boolean update(RoleEditPo roleEditPo);

    /**
     * 删除
     * @param ids
     * @return
     */
    Boolean delete(Integer[] ids);

    /**
     * 分配角色资源
     * @param ems_role_id
     * @param ids
     * @return
     */
    Boolean assignItem(Integer ems_role_id, Integer[] ids);

    /**
     * 查询详情
     * @param ems_role_id
     * @return
     */
    RoleViewVo getView(Integer ems_role_id);
}
