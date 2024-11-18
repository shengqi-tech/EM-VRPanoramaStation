package com.shengqitech.ems.services.impl;


import com.shengqitech.ems.models.domains.Html;
import com.shengqitech.ems.models.domains.Property;
import com.shengqitech.ems.mappers.PropertyMapper;
import com.shengqitech.ems.models.po.PropertyAddPo;
import com.shengqitech.ems.models.po.PropertyEditPo;
import com.shengqitech.ems.services.IPropertyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author 
 * @since 2024-01-29
 */
@Service
public class PropertyServiceImpl  implements IPropertyService {
    @Autowired
    private PropertyMapper propertyMapper;
    @Override
    public Boolean insert(PropertyAddPo PropertyAddPo) {

        Property property = Property.builder()
                .ems_property_name(PropertyAddPo.getEms_property_name())
                .ems_property_code(PropertyAddPo.getEms_property_code())
                .ems_property_moduleid(PropertyAddPo.getEms_property_moduleid())
                .ems_property_unit(PropertyAddPo.getEms_property_unit()).build();
        int count = propertyMapper.insert(property);
        return count > 0;

    }

    @Override
    public Boolean update(PropertyEditPo propertyEditPo) {
        Property property = Property.builder()
                .ems_property_id(propertyEditPo.getEms_property_id())
                .ems_property_name(propertyEditPo.getEms_property_name())
                .ems_property_code(propertyEditPo.getEms_property_code())
                .ems_property_moduleid(propertyEditPo.getEms_property_moduleid())
                .ems_property_unit(propertyEditPo.getEms_property_unit()).build();
        int count = propertyMapper.update(property);
        return count > 0;
    }

    @Override
    public Boolean delete(Integer ems_property_id) {
        int count = propertyMapper.delete(ems_property_id);
        return count > 0;
    }




}
