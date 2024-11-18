package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Item;
import com.shengqitech.ems.models.po.ItemAddPo;
import com.shengqitech.ems.models.po.ItemEditPo;

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
public interface IItemService {

    /**
     * 根据角色ID查询权限
     *
     * @param roleId 角色ID
     * @return 权限列表
     */
    Set<String> selectMenuPermsByRoleId(Integer roleId);

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    Set<String> selectMenuPermsByUserId(Integer userId);


    /**
     * 根据用户查询资源
     * @param userId 用户id
     * @return
     */
    List<Item> findByUserId(Integer userId);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Item> findByMap(Map<String, Object> map);

    /**
     * 新增
     * @param itemAddPo
     * @return
     */
    Boolean insert(ItemAddPo itemAddPo);

    /**
     * 编辑
     * @param itemEditPo
     * @return
     */
    Boolean update(ItemEditPo itemEditPo);

    /**
     * 删除
     * @param ids
     * @return
     */
    Boolean delete(Integer[] ids);

}
