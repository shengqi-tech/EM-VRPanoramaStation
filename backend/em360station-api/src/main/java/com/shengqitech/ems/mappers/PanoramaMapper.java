package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Panorama;
import com.shengqitech.ems.models.vo.PanoramaViewVo;
import com.shengqitech.ems.models.vo.PanoramaVo;

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
public interface PanoramaMapper{

    /**
     * 添加
     * @param panorama
     * @return
     */
    int insert(Panorama panorama);
    /**
     * 添加
     * @param panorama
     * @return
     */
    int update(Panorama panorama);

    /**
     * 查询
     * @param map
     * @return
     */
    List<PanoramaViewVo> findByMap(Map<String,Object> map);

    /**
     * 删除
     * @param ems_panorama_id
     * @return
     */
    int delete (Integer ems_panorama_id);

    /**
     * 查询详情
     * @param ems_panorama_id
     * @return
     */
    PanoramaViewVo getView(Integer ems_panorama_id);

    /**
     * 重置起始页
     * @return
     */
    int resetDefault(Integer ems_instance_id);

    /**
     * 设置起始页
     * @param ems_panorama_id
     * @return
     */
    int setHomePage(Integer ems_panorama_id);

    int sort(Integer sortId, Integer id);

    int sortLast(Integer sortId);

    /**
     * 根据站点查询全景的最大index
     * @param ems_instance_id
     * @return
     */
    Double getMaxIndexByInstanceId(Integer ems_instance_id);

}
