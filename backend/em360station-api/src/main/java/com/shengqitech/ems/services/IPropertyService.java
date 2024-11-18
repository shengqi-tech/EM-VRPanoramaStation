package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.PropertyAddPo;
import com.shengqitech.ems.models.po.PropertyEditPo;

/**
 * <p>
 *  产品属性服务接口
 * </p>
 *
 * @author 
 * @since 2024-01-31
 */
public interface IPropertyService {

    /**
     * 添加产品属性
     * @param PropertyAddPo
     * @return
     */
    Boolean insert(PropertyAddPo PropertyAddPo);
    /**
     * 编辑产品属性
     * @param propertyEditPo
     * @return
     */
    Boolean update(PropertyEditPo propertyEditPo);

    /**
     * 删除产品属性
     * @param ems_property_id
     * @return
     */
    Boolean delete(Integer ems_property_id);
}
