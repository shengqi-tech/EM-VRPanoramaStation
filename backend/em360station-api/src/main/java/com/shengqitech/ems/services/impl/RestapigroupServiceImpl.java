package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.RestapigroupMapper;
import com.shengqitech.ems.models.domains.Restapigroup;
import com.shengqitech.ems.models.vo.RestapigroupVo;
import com.shengqitech.ems.services.IRestapigroupService;
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
 * @since 2023-12-14
 */
@Service
public class RestapigroupServiceImpl  implements IRestapigroupService {

    @Autowired
    private RestapigroupMapper restapigroupMapper;

    @Override
    public Boolean insert(Restapigroup restapigroup) {
        return restapigroupMapper.insert(restapigroup) > 0;
    }

    @Override
    public Boolean update(Restapigroup restapigroup) {
        return restapigroupMapper.update(restapigroup) > 0;
    }

    @Override
    public List<RestapigroupVo> findByMap(Map<String, Object> map) {
        return restapigroupMapper.findByMap(map);
    }
}
