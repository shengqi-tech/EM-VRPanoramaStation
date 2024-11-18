package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.GuideAddPo;
import com.shengqitech.ems.models.po.GuideEditPo;
import com.shengqitech.ems.models.vo.GuideVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
public interface IGuideService {

    Boolean insert(GuideAddPo guideAddPo);

    Boolean update(GuideEditPo guideEditPo);

    List<GuideVo> findByMap(Map<String,Object> map);

    /**
     * 导览排序
     * @param sortId
     * @param id
     * @return
     */
    Boolean sort(Integer sortId, Integer id);

    /**
     * 删除
     * @param ems_guide_id
     * @return
     */
    Boolean delete(Integer ems_guide_id);

}
