package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Restapigroup;
import com.shengqitech.ems.models.vo.RestapigroupVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-12-14
 */
public interface RestapigroupMapper {

    int insert(Restapigroup restapigroup);

    int update(Restapigroup restapigroup);

    List<RestapigroupVo> findByMap(Map<String,Object> map);
}
