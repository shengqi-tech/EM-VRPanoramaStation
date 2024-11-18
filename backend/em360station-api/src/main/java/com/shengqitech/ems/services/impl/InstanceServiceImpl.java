package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.common.constant.Constants;
import com.shengqitech.ems.common.security.service.PermissionService;
import com.shengqitech.ems.mappers.AssignMapper;
import com.shengqitech.ems.mappers.InstanceMapper;
import com.shengqitech.ems.mappers.SectionMapper;
import com.shengqitech.ems.mappers.SysuserMapper;
import com.shengqitech.ems.models.domains.*;
import com.shengqitech.ems.models.po.InstanceAddPo;
import com.shengqitech.ems.models.vo.InstanceVo;
import com.shengqitech.ems.models.vo.SysuserViewVo;
import com.shengqitech.ems.services.IInstanceService;
import com.shengqitech.ems.system.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

/**
 * @author : wsh
 * @Date : 2023/6/8
 * @Description: 检测站点业务层实现类
 */
@Service
public class InstanceServiceImpl implements IInstanceService {

    @Autowired
    private InstanceMapper instanceMapper;

    @Autowired
    private SectionMapper sectionMapper;

    @Autowired
    private AssignMapper assignMapper;

    @Autowired
    private PermissionService permissionService;

    @Autowired
    private SysuserMapper sysuserMapper;

    @Override
    public List<InstanceVo> findByMap(Map<String, Object> map) {

        Authentication authentication = SecurityUtils.getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        List<Role> roles = loginUser.getUser().getRoles();
        boolean isUserRole = false;
        for (Role role : roles) {
            if ("user".equals(role.getEms_role_tag())) {
                isUserRole = true;
                break;
            }
        }
        if (isUserRole) {
            Integer customerid = loginUser.getUser().getEms_sysuser_customerid();
            map.put("ems_instance_contractorid", customerid);
        }
        List<InstanceVo> instanceVos = instanceMapper.findByMap(map);
        return instanceVos;
    }

    @Override
    public Boolean insert(InstanceAddPo instanceAddPo) {
        Sysfile sysfile = instanceAddPo.getEms_instance_picfile();
        Date now = new Date();
        Instance instance = Instance.builder()
                .ems_instance_coordinate(instanceAddPo.getEms_instance_coordinate())
                .ems_instance_name(instanceAddPo.getEms_instance_name())
                .ems_instance_no(instanceAddPo.getEms_instance_no())
                .ems_instance_csolutionid(instanceAddPo.getEms_instance_csolutionid())
                .ems_instance_constructionstarttime(now)
                .ems_instance_sceneid(instanceAddPo.getEms_instance_sceneid())
                .ems_instance_picfileid(sysfile == null ? -1 : sysfile.getEms_sysfile_id() == null ? -1 : sysfile.getEms_sysfile_id())
                .ems_instance_des(instanceAddPo.getEms_instance_des())
                .ems_instance_sectionid(instanceAddPo.getEms_instance_sectionid())
                .ems_instance_createtime(now)
                .ems_instance_updatetime(now)
                .ems_instance_address(instanceAddPo.getEms_instance_address())
                .build();
        int count = instanceMapper.insert(instance);
        return count > 0;
    }

    @Override
    public Boolean saveTemplate(Integer ems_instance_id, String globeconf, Integer isHobby) {
        return instanceMapper.saveTemplate(ems_instance_id, globeconf, isHobby) > 0;
    }

    @Override
    public Boolean sync(List<Instance> instances) {
        Map<Boolean, List<Instance>> partitionedInstances = instances.stream()
                .collect(Collectors.partitioningBy(instance -> instanceMapper.findByNo(instance.getEms_instance_no()) == null));
        // 未同步站点
        List<Instance> existingInstances = partitionedInstances.get(true);
        // 已同步站点
        List<Instance> nonExistingInstances = partitionedInstances.get(false); // 获取不满足条件的元素
        for (Instance instance : existingInstances) {
            // 新增断面
            Section section = Section.builder()
                    .ems_section_name(instance.getEms_instance_no() + "_断面")
                    .ems_section_settingtime(new Date())
                    .ems_section_sectionlevelid(0)
                    .ems_section_sectionfunctionid(3)
                    .ems_section_sectiontypeid(10)
                    .ems_section_activityid(6).build();
            sectionMapper.insert(section);

            // 新增未同步站点
            instance.setEms_instance_sectionid(section.getEms_section_id());
            instance.setEms_instance_createtime(new Date());
            instanceMapper.insert(instance);
        }
        for (Instance instance : nonExistingInstances) {
            // 修改已同步站点
            instanceMapper.updateByNo(instance);
        }
        return null;
    }

    @Override
    public Boolean setHare(Integer ems_instance_id, Integer ems_instance_isshare) {
        int count = instanceMapper.setHare(ems_instance_id, ems_instance_isshare);
        return count > 0;
    }

    @Override
    public List<InstanceVo> findAssignInstance(Integer ems_sysuser_id) {
        List<InstanceVo> assignInstance = new ArrayList<>();
//        SysuserViewVo sysuserViewVo = sysuserMapper.getView(ems_sysuser_id);
//        List<Role> roles = sysuserViewVo.getRoles();
//        String idString = roles.stream()
//                .map(Role::getEms_role_tag)
//                .map(String::valueOf)
//                .collect(Collectors.joining(","));
//
//        // 所有监测站
//        boolean allFlag = permissionService.hasAnyRoles(idString);
//        if (allFlag) {
//            assignInstance = instanceMapper.findByMap(new HashMap<>());
//            return assignInstance;
//        }
//        // 本公司监测站
//        boolean customerFlag = permissionService.hasAnyRoles(Constants.CUSTOMER_INSTANCEROLE);
//        if (customerFlag) {
//            LoginUser loginUser = SecurityUtils.getLoginUser();
//            Integer ems_sysuser_customerid = loginUser.getUser().getEms_sysuser_customerid();
//            map.put("ems_instance_contractorid", ems_sysuser_customerid);//            Map<String, Object> map = new HashMap<>();
//            assignInstance = instanceMapper.findByMap(new HashMap<>());
//            return assignInstance;
//        }

        List<Assign> assigns = assignMapper.fingByUser(ems_sysuser_id);
        List<Integer> ids;
        if (assigns.size() != 0) {
            ids = assigns.stream()
                    .map(Assign::getEms_assign_instanceid)
                    .collect(Collectors.toList());
            assignInstance = instanceMapper.findAssignInstance(ids);
        }
        return assignInstance;
    }

}
