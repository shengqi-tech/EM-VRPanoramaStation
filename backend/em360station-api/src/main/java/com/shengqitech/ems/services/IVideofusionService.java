package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.VideofusionAddPo;
import com.shengqitech.ems.models.po.VideofusionEditPo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface IVideofusionService{

    /**
     * 新增
     * @param videofusionAddPo
     * @return
     */
    Boolean insert(VideofusionAddPo videofusionAddPo);

    /**
     * 编辑
     * @param videofusionEditPo
     * @return
     */
    Boolean update(VideofusionEditPo videofusionEditPo);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    Boolean deleteByPanorama(Integer ems_panorama_id);

}
