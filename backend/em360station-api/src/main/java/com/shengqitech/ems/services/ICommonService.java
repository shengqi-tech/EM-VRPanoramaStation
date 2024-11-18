package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.CommonAddPo;
import com.shengqitech.ems.models.po.CommonEditPo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface ICommonService {

    /**
     * 添加基础标签标签
     * @param commonAddPo
     * @return
     */
    Boolean insert(CommonAddPo commonAddPo);
    /**
     * 编辑基础标签标签
     * @param commonEditPo
     * @return
     */
    Boolean update(CommonEditPo commonEditPo);

    /**
     * 删除基础标签标签
     * @param ems_common_id
     * @return
     */
    Boolean delete(Integer ems_common_id);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    Boolean deleteByPanorama(Integer ems_panorama_id);

}
