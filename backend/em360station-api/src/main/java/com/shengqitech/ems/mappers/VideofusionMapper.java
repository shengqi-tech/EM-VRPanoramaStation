package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Videofusion;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface VideofusionMapper {

    /**
     * 新增
     * @param videofusion
     * @return
     */
    int insert(Videofusion videofusion);

    /**
     * 修改
     * @param videofusion
     * @return
     */
    int update(Videofusion videofusion);

    /**
     * 根据标签类型查询
     * @param ems_tagtype_id 标签类型id
     * @return
     */
    List<Videofusion> findByTagtypeId(Integer ems_tagtype_id);

    /**
     * 批量修改
     * @param videofusions
     * @return
     */
    int batchUpdate(List<Videofusion> videofusions);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    int deleteByPanorama(Integer ems_panorama_id);
}
