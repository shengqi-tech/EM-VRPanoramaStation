package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Item;

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
public interface ItemMapper {

    /**
     * 根据角色ID查询权限
     *
     * @param roleId 角色ID
     * @return 权限列表
     */
    public List<String> selectPermsByRoleId(Integer roleId);

    /**
     * 根据用户ID查询权限
     *
     * @param userId 用户ID
     * @return 权限列表
     */
    public List<String> selectPermsByUserId(Integer userId);


    /**
     * 根据用户查询资源
     * @param userId 用户id
     * @return
     */
    public List<Item> findByUserId(Integer userId);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Item> findByMap(Map<String, Object> map);

    /**
     * 根据code查询
     * @param code
     * @return
     */
    Item findByCode(String code);

    /**
     * 新增
     * @param item
     * @return
     */
    int insert(Item item);

    /**
     * 编辑
     * @param item
     * @return
     */
    int update(Item item);

    /**
     * 删除
     * @param ids
     * @return
     */
    int delete(Integer[] ids);
}
