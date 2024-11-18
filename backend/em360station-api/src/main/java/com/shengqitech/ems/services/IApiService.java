package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Api;
import com.shengqitech.ems.models.po.ApiAddPo;
import com.shengqitech.ems.models.po.ApiEditPo;
import com.shengqitech.ems.models.vo.ApiVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
public interface IApiService {

    /**
     * 新增
     * @param apiAddPo
     * @return
     */
    int insert(ApiAddPo apiAddPo);

    /**
     * 修改
     * @param apiEditPo
     * @return
     */
    Boolean update(ApiEditPo apiEditPo);

    /**
     * 删除
     * @param ems_api_id
     * @return
     */
    Boolean delete(Integer ems_api_id);

    /**
     * 根据参数查询
     * @param map
     * @return
     */
    List<ApiVo> findByMap(Map<String,Object> map);


}
