package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Navigation;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface NavigationMapper {

    /**
     * 新增
     * @param navigation
     * @return
     */
    int insert(Navigation navigation);

    /**
     * 修改
     * @param navigation
     * @return
     */
    int update(Navigation navigation);

    /**
     * 删除
     * @param ems_navigation_id
     * @return
     */
    int delete(Integer ems_navigation_id);

    /**
     * 根据标签类型查询
     * @param ems_tagtype_id 标签类型id
     * @return
     */
    List<Navigation> findByTagtypeId(Integer ems_tagtype_id);

    /**
     * 批量修改
     * @param navigations
     * @return
     */
    int batchUpdate(List<Navigation> navigations);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    int deleteByPanorama(Integer ems_panorama_id);
}
