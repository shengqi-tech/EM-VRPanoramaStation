package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Configuration;

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
public interface ConfigurationMapper {

    /**
     * 插入
     * @param configuration
     * @return
     */
    int insert(Configuration configuration);

    /**
     * 根据名称查询
     * @param name
     * @return
     */
    Configuration findByName(String name);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Configuration> findByMap(Map<String,Object> map);


}
