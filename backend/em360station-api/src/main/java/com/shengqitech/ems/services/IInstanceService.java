package com.shengqitech.ems.services;

import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.po.InstanceAddPo;
import com.shengqitech.ems.models.vo.InstanceVo;

import java.util.List;
import java.util.Map;

/**
 * @author : wsh
 * @Date : 2023/6/8
 * @Description : 检测站点业务层
 */
public interface IInstanceService {

    List<InstanceVo> findByMap(Map<String,Object> map);

    /**
     * 添加监测站点
     * @param instanceAddPo
     * @return
     */
    Boolean insert(InstanceAddPo instanceAddPo);

    /**
     * 保存自定义模板
     * @param ems_instance_id
     * @return
     */
    Boolean saveTemplate(Integer ems_instance_id,String globeconf,Integer isHobby);

    /**
     * 检测站点同步
     * @param instances
     * @return
     */
    Boolean sync(List<Instance> instances);

    Boolean setHare(Integer ems_instance_id, Integer ems_instance_isshare);

    /**
     * 查询已分配的监测站点
     * @param ems_sysuser_id
     * @return
     */
    List<InstanceVo> findAssignInstance(Integer ems_sysuser_id);
}
