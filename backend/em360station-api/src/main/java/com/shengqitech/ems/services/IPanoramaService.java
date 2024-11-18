package com.shengqitech.ems.services;

import com.shengqitech.ems.models.po.PanoramaAddPo;
import com.shengqitech.ems.models.po.PanoramaEditPo;
import com.shengqitech.ems.models.vo.PanoramaViewVo;
import com.shengqitech.ems.models.vo.PanoramaVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface IPanoramaService{

    /**
     * 添加全景
     * @param panoramaAddPo
     * @return
     */
    Boolean insert(PanoramaAddPo panoramaAddPo);
    /**
     * 编辑全景
     * @param panoramaEditPo
     * @return
     */
    Boolean update(PanoramaEditPo panoramaEditPo);

    /**
     * 查询
     * @param map 查询参数
     * @return
     */
    List<PanoramaViewVo> findByMap(Map<String,Object> map);

    /**
     * 删除
     * @param ems_panorama_id
     * @return
     */
    Boolean delete(Integer ems_panorama_id);

    /**
     * 查询全景详情
     * @param ems_panorama_id 全景id
     * @return
     */
    PanoramaViewVo getView(Integer ems_panorama_id);

    /**
     * 设置起始页
     * @param ems_panorama_id
     * @param ems_instance_id
     * @return
     */
    Boolean setHomePage(Integer ems_panorama_id, Integer ems_instance_id);

    /**
     * 全景排序
     * @param sortId
     * @param id
     * @return
     */
    Boolean sort(Integer sortId, Integer id);


}
