package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.common.exception.item.ItemExistsException;
import com.shengqitech.ems.mappers.ItemMapper;
import com.shengqitech.ems.models.domains.Item;
import com.shengqitech.ems.models.po.ItemAddPo;
import com.shengqitech.ems.models.po.ItemEditPo;
import com.shengqitech.ems.services.IItemService;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.system.utils.TreeBuilderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class ItemServiceImpl implements IItemService {

    @Autowired
    private ItemMapper itemMapper;

    @Override
    public Set<String> selectMenuPermsByRoleId(Integer roleId) {
        List<String> perms = itemMapper.selectPermsByRoleId(roleId);
        Set<String> permsSet = new HashSet<>();
        for (String perm : perms) {
            if (StringUtils.isNotEmpty(perm)) {
                permsSet.addAll(Arrays.asList(perm.trim().split(",")));
            }
        }
        return permsSet;
    }

    @Override
    public Set<String> selectMenuPermsByUserId(Integer userId) {
        List<String> perms = itemMapper.selectPermsByUserId(userId);
        Set<String> permsSet = new HashSet<>();
        for (String perm : perms) {
            if (StringUtils.isNotEmpty(perm)) {
                permsSet.addAll(Arrays.asList(perm.trim().split(",")));
            }
        }
        return permsSet;
    }


    @Override
    public List<Item> findByUserId(Integer userId) {
        List<Item> items = itemMapper.findByUserId(userId);
        // 构建通用建树器
        TreeBuilderUtils<Item> treeBuilder = new TreeBuilderUtils<>();
        // 建树
        List<Item> tree = treeBuilder.buildTree(items, 0,Item::getEms_item_id,Item::getEms_item_parentid,Item::getEms_item_items);
        return tree;
    }

    @Override
    public List<Item> findByMap(Map<String, Object> map) {
        List<Item> items = itemMapper.findByMap(map);
        // 构建通用建树器
        TreeBuilderUtils<Item> treeBuilder = new TreeBuilderUtils<>();
        // 建树
        List<Item> tree = treeBuilder.buildTree(items, 0,Item::getEms_item_id,Item::getEms_item_parentid,Item::getEms_item_items);
        return tree;
    }

    @Override
    public Boolean insert(ItemAddPo itemAddPo) {
        String code = itemAddPo.getEms_item_code();
        Item existsItem = itemMapper.findByCode(code);
        if (existsItem != null){
            throw new ItemExistsException();
        }
        Date now = new Date();
        Item item = Item.builder()
                .ems_item_parentid(itemAddPo.getEms_item_parentid())
                .ems_item_code(itemAddPo.getEms_item_code())
                .ems_item_name(itemAddPo.getEms_item_name())
                .ems_item_path(itemAddPo.getEms_item_path())
                .ems_item_icon(itemAddPo.getEms_item_icon())
                .ems_item_createtime(now)
                .ems_item_updatetime(now)
                .ems_item_type(itemAddPo.getEms_item_type())
                .build();
        int count = itemMapper.insert(item);
        return count > 0;
    }

    @Override
    public Boolean update(ItemEditPo itemEditPo) {
        Date now = new Date();
        Item item = Item.builder()
                .ems_item_id(itemEditPo.getEms_item_id())
                .ems_item_parentid(itemEditPo.getEms_item_parentid())
                .ems_item_code(itemEditPo.getEms_item_code())
                .ems_item_name(itemEditPo.getEms_item_name())
                .ems_item_path(itemEditPo.getEms_item_path())
                .ems_item_icon(itemEditPo.getEms_item_icon())
                .ems_item_updatetime(now)
                .ems_item_type(itemEditPo.getEms_item_type())
                .build();
        int count = itemMapper.update(item);
        return count > 0;
    }

    @Override
    public Boolean delete(Integer[] ids) {
        int count = itemMapper.delete(ids);
        return count > 0;
    }

}
