package com.shengqitech.ems.mappers;

import com.shengqitech.ems.common.aspectj.annotation.DataSource;
import com.shengqitech.ems.common.enums.DataSourceType;
import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.vo.InstanceVo;

import java.util.List;
import java.util.Map;

/**
 * @author : wsh
 * @Date : 2023/6/8
 * @Description:
 */
@DataSource(DataSourceType.SLAVE)
public interface InstanceMapper {

    /**
     * 根据id查询
     * @param ems_instance_id
     * @return
     */
    Instance findById(Integer ems_instance_id);

    /**
     * 根据编号查询
     * @param ems_instance_no
     * @return
     */
    Instance findByNo(String ems_instance_no);

    List<InstanceVo> findByMap(Map<String,Object> map);



    int insert(Instance instance);



    /**
     * 根据编号更新
     * @param instance
     * @return
     */
    int updateByNo(Instance instance);

    /**
     * 保存自定义模板
     * @param ems_instance_id
     * @return
     */
    int saveTemplate(Integer ems_instance_id,String globeconf, Integer isHobby);

    /**
     * 设置是否开放
     * @param ems_instance_id
     * @param ems_instance_isshare
     * @return
     */
    int setHare(Integer ems_instance_id, Integer ems_instance_isshare);

    /**
     * 查询已分配的监测站点
     * @param ids
     * @return
     */
    List<InstanceVo> findAssignInstance(List<Integer> ids);
}
