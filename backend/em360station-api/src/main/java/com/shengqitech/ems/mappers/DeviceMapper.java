package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Device;
import com.shengqitech.ems.models.domains.Product;
import com.shengqitech.ems.models.vo.DeviceVo;

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
public interface DeviceMapper {

    int insert(Device device);

    /**
     * 根据id查询
     * @param ems_device_id
     * @return
     */
    Device findById(Integer ems_device_id);

    /**
     * 根据编号查询
     * @param deviceNo
     * @return
     */
    Device findDuplicateDevice(String deviceNo);

    /**
     * 查询
     * @param map
     * @return
     */
    List<DeviceVo> findByMap(Map<String,Object> map);

}
