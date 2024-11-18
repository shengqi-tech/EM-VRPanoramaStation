package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Product;
import com.shengqitech.ems.models.vo.ProductVo;

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
public interface ProductMapper {

    /**
     * 插入
     * @param product
     * @return
     */
    int insert(Product product);

    /**
     * 查询重复的产品
     * @param productType
     * @param emsCompositionName
     * @return
     */
    Product findDuplicateProducts(String productType, String emsCompositionName);

    /**
     * 查询
     * @param map
     * @return
     */
    List<ProductVo> findByMap(Map<String,Object> map);

}
