package com.shengqitech.ems.services;


import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.models.domains.Device;
import com.shengqitech.ems.models.vo.DeviceVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface IDeviceService {

    /**
     * 设备同步
     * @param jsonArray
     * @return
     */
    Boolean sync(JSONArray jsonArray);

    /**
     * 查询
     * @param map
     * @return
     */
    List<DeviceVo> findByMap(Map<String,Object> map);

}
