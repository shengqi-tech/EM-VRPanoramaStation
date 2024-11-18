package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Html;
import com.shengqitech.ems.models.domains.Property;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2024-01-29
 */
public interface PropertyMapper {

    /**
     * 新增
     * @param property
     * @return
     */
    int insert(Property property);

    /**
     * 修改
     * @param property
     * @return
     */
    int update(Property property);

    /**
     * 删除
     * @param ems_property_id
     * @return
     */
    int delete(Integer ems_property_id);

    List<Property> selectByModuleId(Integer ems_module_id);
}
