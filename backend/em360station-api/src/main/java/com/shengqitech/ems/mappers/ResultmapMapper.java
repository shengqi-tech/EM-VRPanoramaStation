package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Resultmap;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
public interface ResultmapMapper {
    /**
     * 新增
     * @param resultmap
     * @return
     */
    int insert(Resultmap resultmap);

    /**
     * 修改
     * @param resultmap
     * @return
     */
    int update(Resultmap resultmap);

    /**
     * 删除
     * @param ems_resultmap_id
     * @return
     */
    int delete(Integer ems_resultmap_id);
}
