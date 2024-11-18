package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.ConfigurationMapper;
import com.shengqitech.ems.mappers.ProductMapper;
import com.shengqitech.ems.models.domains.Configuration;
import com.shengqitech.ems.services.IConfigurationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class ConfigurationServiceImpl implements IConfigurationService {

    @Autowired
    private ConfigurationMapper configurationMapper;

    @Override
    public List<Configuration> findByMap(Map<String, Object> map) {
        return configurationMapper.findByMap(map);
    }
}
