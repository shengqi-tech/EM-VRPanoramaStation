package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Configuration;


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
public interface IConfigurationService  {

    /**
     * 查询
     * @param map
     * @return
     */
    List<Configuration> findByMap(Map<String,Object> map);
}
