package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Lookpoint;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
public interface LookpointMapper {

    /**
     * 新增
     * @param lookpoint
     * @return
     */
    int insert(Lookpoint lookpoint);

    int insertBatch(List<Lookpoint> lookpoints);

    /**
     * 编辑
     * @param lookpoint
     * @return
     */
    int update(Lookpoint lookpoint);

    int updateBatch(List<Lookpoint> lookpoints);

    /**
     * 根据导览删除
     * @param ems_guide_id
     * @return
     */
    int deleteByGuide(Integer ems_guide_id);


}
