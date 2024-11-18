package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.ProductMapper;
import com.shengqitech.ems.models.vo.ProductVo;
import com.shengqitech.ems.services.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  产品
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class ProductServiceImpl implements IProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<ProductVo> findByMap(Map<String, Object> map) {
        return productMapper.findByMap(map);
    }
}
