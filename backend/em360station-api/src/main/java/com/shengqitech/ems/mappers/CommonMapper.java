package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Common;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface CommonMapper {
    /**
     * 新增
     * @param common 基础标签标签
     * @return
     */
    int insert(Common common);
    /**
     * 修改
     * @param common 基础标签标签
     * @return
     */
    int update(Common common);

    /**
     * 根据标签类型查询
     * @param ems_tagtype_id 标签类型id
     * @return
     */
    List<Common> findByTagtypeId(Integer ems_tagtype_id);

    /**
     * 批量修改
     * @param commons
     * @return
     */
    int batchUpdate(List<Common> commons);

    /**
     * 删除
     * @param ems_common_id
     * @return
     */
    int delete(Integer ems_common_id);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    int deleteByPanorama(Integer ems_panorama_id);

    /**
     * 批量插入热点和产品属性的关系
     * @param id 热点id
     * @param propertyids 产品属性id数组
     * @return
     */
    int insertCommonProperties(@Param("id") Integer id, @Param("propertyids") Integer[] propertyids);

    /**
     * 删除热点和产品属性的关系
     * @param ems_common_id
     * @return
     */
    int deleteCommonProperties(@Param("id") Integer ems_common_id);

}
