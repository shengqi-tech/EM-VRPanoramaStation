package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Devicecommon;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface DevicecommonMapper {

    /**
     * 新增
     * @param devicecommon
     * @return
     */
    int insert(Devicecommon devicecommon);

    /**
     * 根据基础标签id删除
     * @param ems_common_id
     * @return
     */
    int deleteByCommonid(Integer ems_common_id);

}
