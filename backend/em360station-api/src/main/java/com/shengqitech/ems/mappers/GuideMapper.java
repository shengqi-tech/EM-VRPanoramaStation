package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Guide;
import com.shengqitech.ems.models.vo.GuideVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
public interface GuideMapper {

    /**
     * 新增
     * @param guide
     * @return
     */
    int insert(Guide guide);

    /**
     * 修改
     * @param guide
     * @return
     */
    int update(Guide guide);

    List<GuideVo> findByMap(Map<String,Object> map);

    /**
     * 根据站点查询最大排序
     * @param ems_instance_id
     * @return
     */
    Double findMaxSort(Integer ems_instance_id);

    int sort(Integer sortId, Integer id);

    int sortLast(Integer sortId);

    /**
     * 删除
     * @param ems_guide_id
     * @return
     */
    int delete(Integer ems_guide_id);
}
