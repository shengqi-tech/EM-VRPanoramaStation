package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Product;
import com.shengqitech.ems.models.vo.ProductVo;

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
public interface IProductService {

    /**
     * 查询
     * @param map
     * @return
     */
    List<ProductVo> findByMap(Map<String,Object> map);

}
