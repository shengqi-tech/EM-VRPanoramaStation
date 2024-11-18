package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.common.exception.file.InvalidExtensionException;
import com.shengqitech.ems.common.exception.user.UserExistsException;
import com.shengqitech.ems.common.security.service.TokenService;
import com.shengqitech.ems.mappers.AssignMapper;
import com.shengqitech.ems.mappers.SysuserMapper;
import com.shengqitech.ems.models.domains.Assign;
import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.models.po.SysuserAddPo;
import com.shengqitech.ems.models.vo.InstanceVo;
import com.shengqitech.ems.models.vo.SysuserViewVo;
import com.shengqitech.ems.models.vo.SysuserVo;
import com.shengqitech.ems.models.po.SysuserEditPo;
import com.shengqitech.ems.services.ISysuserService;
import com.shengqitech.ems.system.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class SysuserServiceImpl implements ISysuserService {

    @Autowired
    private SysuserMapper userMapper;

    @Autowired
    private AssignMapper assignMapper;

    @Autowired
    private TokenService tokenService;


    @Override
    public Sysuser selectUserByUserName(String userName) {
        return userMapper.selectUserByUserName(userName);
    }

    /**
     * 注册用户信息
     *
     * @param sysuserAddPo 用户信息
     * @return 结果
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public boolean registerUser(SysuserAddPo sysuserAddPo) throws IOException, InvalidExtensionException {
//        MultipartFile avatarfile = userDto.getMpi_sysuser_avatarfile();
//        if (avatarfile != null && !avatarfile.isEmpty()) {
//            String avatar = FileUploadUtils.upload(ProjectConfig.getUserPath(), avatarfile, MimeTypeUtils.IMAGE_EXTENSION);
//            userDto.setMpi_sysuser_avatarpath(avatar);
//        }
        Sysfile file = sysuserAddPo.getEms_sysuser_avatarfile();
        Sysuser sysuser = Sysuser.builder()
                .ems_sysuser_loginname(sysuserAddPo.getEms_sysuser_loginname())
                .ems_sysuser_password(sysuserAddPo.getEms_sysuser_password())
                .ems_sysuser_name(sysuserAddPo.getEms_sysuser_name())
                .ems_sysuser_status(1)
                .ems_sysuser_customerid(sysuserAddPo.getEms_sysuser_customerid())
                .ems_sysuser_avatarfileid(file == null ? null : file.getEms_sysfile_id()).build();

        int count = userMapper.insert(sysuser);
        int num = userMapper.insertUserRoles(sysuser.getEms_sysuser_id(), sysuserAddPo.getEms_role_ids());
        return count > 0 && num > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean update(SysuserEditPo sysuserEditPo) {
        Date now = new Date();
        Sysfile avatarfile = sysuserEditPo.getEms_sysuser_avatarfile();
        Integer[] roleIds = sysuserEditPo.getEms_role_ids();
        Sysuser sysuser = Sysuser.builder()
                .ems_sysuser_id(sysuserEditPo.getEms_sysuser_id())
                .ems_sysuser_name(sysuserEditPo.getEms_sysuser_name())
                .ems_sysuser_customerid(sysuserEditPo.getEms_sysuser_customerid())
                .ems_sysuser_avatarfileid(avatarfile == null ? null : avatarfile.getEms_sysfile_id())
                .ems_sysuser_signature(sysuserEditPo.getEms_sysuser_signature())
                .ems_sysuser_address(sysuserEditPo.getEms_sysuser_address())
                .ems_sysuser_mobilephone(sysuserEditPo.getEms_sysuser_mobilephone())
                .ems_sysuser_status(sysuserEditPo.getEms_sysuser_status())
                .ems_sysuser_creatime(now)
                .ems_sysuser_updatetime(now)
                .ems_sysuser_email(sysuserEditPo.getEms_sysuser_email())
                .build();
        int count = userMapper.update(sysuser);
        // 删除用户角色关系
        userMapper.deleteUserRolesByUserid(sysuser.getEms_sysuser_id());
        // 添加用户角色关系
        userMapper.insertUserRoles(sysuser.getEms_sysuser_id(), roleIds);
        return count > 0;
    }

    @Override
    public Boolean personalSetting(Sysuser sysuser) {
        int count = userMapper.update(sysuser);
        return count > 0;
    }

    @Override
    public Boolean resetPwd(Sysuser sysuser) {
        return userMapper.update(sysuser) > 0;
    }

    @Override
    public List<SysuserVo> findByMap(Map<String, Object> map) {
        return userMapper.findByMap(map);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean insert(SysuserAddPo sysuserAddPo) {
        Date now = new Date();
        Integer[] roleIds = sysuserAddPo.getEms_role_ids();
        Sysfile avatarfile = sysuserAddPo.getEms_sysuser_avatarfile();
        Sysuser sysuser = Sysuser.builder()
                .ems_sysuser_loginname(sysuserAddPo.getEms_sysuser_loginname())
                .ems_sysuser_password(SecurityUtils.encryptPassword(sysuserAddPo.getEms_sysuser_password()))
                .ems_sysuser_name(sysuserAddPo.getEms_sysuser_name())
                .ems_sysuser_customerid(sysuserAddPo.getEms_sysuser_customerid())
                .ems_sysuser_avatarfileid(avatarfile == null ? null : avatarfile.getEms_sysfile_id())
                .ems_sysuser_signature(sysuserAddPo.getEms_sysuser_signature())
                .ems_sysuser_address(sysuserAddPo.getEms_sysuser_address())
                .ems_sysuser_mobilephone(sysuserAddPo.getEms_sysuser_mobilephone())
                .ems_sysuser_status(sysuserAddPo.getEms_sysuser_status())
                .ems_sysuser_creatime(now)
                .ems_sysuser_updatetime(now)
                .ems_sysuser_email(sysuserAddPo.getEms_sysuser_email())
                .build();
        Sysuser existsUser = userMapper.checkUserNameUnique(sysuser.getEms_sysuser_loginname());
        if (existsUser != null) {
            throw new UserExistsException();
        }
        int count = userMapper.insert(sysuser);
        userMapper.insertUserRoles(sysuser.getEms_sysuser_id(), roleIds);
        return count > 0;
    }

    @Override
    public SysuserViewVo getView(Integer ems_sysuser_id) {
        return userMapper.getView(ems_sysuser_id);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer[] ids) {
        for (Integer id : ids) {
            userMapper.deleteUserRolesByUserid(id);
        }
        return userMapper.delete(ids) > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean assignRoles(Integer ems_sysuser_id, Integer[] ids) {
        // 删除用户与角色关系
        userMapper.deleteUserRolesByUserid(ems_sysuser_id);
        // 添加用户与角色关系
        int count = userMapper.insertUserRoles(ems_sysuser_id, ids);
        return count > 0;
    }
    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean assignInstance(Integer ems_sysuser_id, Integer[] ems_instance_ids, String ems_assign_expirationdate) {
        // 删除用户与检测站点的关系
        assignMapper.deleteByUser(ems_sysuser_id);
        Integer count = 0;
        Date now = new Date();
        for (Integer ems_instance_id : ems_instance_ids) {
            Assign assign = Assign.builder()
                    .ems_assign_time(now)
                    .ems_assign_expirationdate(ems_assign_expirationdate)
                    .ems_assign_instanceid(ems_instance_id)
                    .ems_assign_userid(ems_sysuser_id)
                    .build();
            count += assignMapper.insert(assign);
        }
        return count > 0;
    }
}
