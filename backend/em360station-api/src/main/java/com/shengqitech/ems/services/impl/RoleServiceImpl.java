package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.common.exception.role.RoleExistsException;
import com.shengqitech.ems.mappers.RoleMapper;
import com.shengqitech.ems.models.domains.Role;
import com.shengqitech.ems.models.po.RoleAddPo;
import com.shengqitech.ems.models.po.RoleEditPo;
import com.shengqitech.ems.models.vo.RoleViewVo;
import com.shengqitech.ems.services.IRoleService;
import com.shengqitech.ems.system.utils.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
public class RoleServiceImpl implements IRoleService {

    @Autowired
    private RoleMapper roleMapper;

    @Override
    public Set<String> selectRolePermissionByUserId(Integer userId) {
        List<Role> perms = roleMapper.selectRolePermissionByUserId(userId);
        Set<String> permsSet = new HashSet<>();
        for (Role perm : perms) {
            if (StringUtils.isNotNull(perm)) {
                permsSet.addAll(Arrays.asList(perm.getEms_role_tag().trim().split(",")));
            }
        }
        return permsSet;
    }

    @Override
    public List<Role> findByMap(Map<String, Object> map) {
        return roleMapper.findByMap(map);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean insert(RoleAddPo roleAddPo) {
        Date now = new Date();
        Integer[] emsRoleItemids = roleAddPo.getEms_role_itemids();
        Role role = Role.builder()
                .ems_role_tag(roleAddPo.getEms_role_tag())
                .ems_role_name(roleAddPo.getEms_role_name())
                .ems_role_des(roleAddPo.getEms_role_des())
                .ems_role_createtime(now)
                .ems_role_updatetime(now)
                .build();
        Role existsRole = roleMapper.findByTag(role.getEms_role_tag());
        if (existsRole != null) {
            throw new RoleExistsException();
        }
        int count = roleMapper.insert(role);
        roleMapper.inserRoleItem(role.getEms_role_id(),emsRoleItemids);
        return count > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean update(RoleEditPo roleEditPo) {
        Date now = new Date();
        Integer emsRoleId = roleEditPo.getEms_role_id();
        Integer[] emsRoleItemids = roleEditPo.getEms_role_itemids();
        Role role = Role.builder()
                .ems_role_id(emsRoleId)
                .ems_role_tag(roleEditPo.getEms_role_tag())
                .ems_role_name(roleEditPo.getEms_role_name())
                .ems_role_des(roleEditPo.getEms_role_des())
                .ems_role_status(roleEditPo.getEms_role_status())
                .ems_role_updatetime(now)
                .build();
        roleMapper.deleteRoleitem(emsRoleId);
        roleMapper.inserRoleItem(emsRoleId, emsRoleItemids);
        return roleMapper.update(role) > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer[] ids) {
        for (Integer id : ids) {
            roleMapper.deleteRoleitem(id);
        }
        return roleMapper.delete(ids) > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean assignItem(Integer ems_role_id, Integer[] ids) {
        roleMapper.deleteRoleitem(ems_role_id);
        int count = roleMapper.inserRoleItem(ems_role_id, ids);
        return count > 0;
    }

    @Override
    public RoleViewVo getView(Integer ems_role_id) {
        return roleMapper.getView(ems_role_id);
    }

}
