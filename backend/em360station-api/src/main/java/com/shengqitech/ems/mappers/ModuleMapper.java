package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Module;
import com.shengqitech.ems.models.vo.ModuleVo;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author 
 * @since 2024-01-29
 */
public interface ModuleMapper {

    /**
     * 查询是否重复
     * @param ems_module_type
     * @return
     */
    Module findDuplicateModule(String ems_module_type);

    /**
     * 查询
     * @param module
     * @return
     */
    int insert(Module module);

}
