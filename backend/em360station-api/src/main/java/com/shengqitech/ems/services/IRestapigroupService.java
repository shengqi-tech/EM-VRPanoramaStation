package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Restapigroup;
import com.shengqitech.ems.models.vo.RestapigroupVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-12-14
 */
public interface IRestapigroupService {

    /**
     * 新增
     * @param restapigroup
     * @return
     */
    Boolean insert(Restapigroup restapigroup);

    /**
     * 修改
     * @param restapigroup
     * @return
     */
    Boolean update(Restapigroup restapigroup);

    /**
     * 根据参数查询
     * @param map
     * @return
     */
    List<RestapigroupVo> findByMap(Map<String,Object> map);

}
