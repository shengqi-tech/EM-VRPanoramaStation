package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Assign;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2024-03-08
 */
public interface AssignMapper {

    /**
     * 新增
     * @param assign
     * @return
     */
    int insert(Assign assign);

    /**
     * 根据用户删除
     * @param ems_sysuser_id
     * @return
     */
    int deleteByUser(Integer ems_sysuser_id);

    /**
     * 根据用户查询
     * @param ems_sysuser_id
     * @return
     */
    List<Assign> fingByUser(Integer ems_sysuser_id);


}
