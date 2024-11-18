package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Installconfiguration;
import com.shengqitech.ems.models.vo.InstallconfigurationVo;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface InstallconfigurationMapper {

    int insert(Installconfiguration installconfiguration);

    int update(Installconfiguration installconfiguration);

    /**
     * 根据设备id查询
     * @param ems_device_id
     * @return
     */
    List<InstallconfigurationVo> findByDeviceId(Integer ems_device_id);

    /**
     * 根据设备删除
     * @param ems_device_id
     * @return
     */
    int deleteByDevice(Integer ems_device_id);
}
