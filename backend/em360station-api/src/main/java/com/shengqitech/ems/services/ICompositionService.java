package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Composition;

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
public interface ICompositionService {

    /**
     * 查询
     * @param map
     * @return
     */
    List<Composition> findByMap(Map<String,Object> map);

}
