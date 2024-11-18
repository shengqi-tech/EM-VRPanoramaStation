package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Composition;

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
public interface CompositionMapper {

    /**
     * 插入
     * @param composition
     * @return
     */
    int insert(Composition composition);

    /**
     * 批量插入
     * @param compositions
     * @return
     */
    int batchInsert(List<Composition> compositions);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Composition> findByMap(Map<String,Object> map);

    /**
     * 根据组成名称查询
     * @param name
     * @return
     */
    Composition findByName(String name);

    Composition findDuplicateComposition(String compositionName);
}
