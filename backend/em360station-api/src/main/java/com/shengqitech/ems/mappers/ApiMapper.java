package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Api;
import com.shengqitech.ems.models.vo.ApiVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
public interface ApiMapper {

    /**
     * 新增
     * @param api
     * @return
     */
    int insert(Api api);

    /**
     * 修改
     * @param api
     * @return
     */
    int update(Api api);

    /**
     * 删除
     * @param ems_api_id
     * @return
     */
    int delete(Integer ems_api_id);

    /**
     * 根据条件查询
     * @param map
     * @return
     */
    List<ApiVo> findByMap(Map<String,Object> map);
}
