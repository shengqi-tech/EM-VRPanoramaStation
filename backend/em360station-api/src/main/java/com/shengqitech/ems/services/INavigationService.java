package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.NavigationAddPo;
import com.shengqitech.ems.models.po.NavigationEditPo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface INavigationService {

    /**
     * 新增
     * @param navigationAddPo
     * @return
     */
    Boolean insert(NavigationAddPo navigationAddPo);

    /**
     * 修改
     * @param navigationEditPo
     * @return
     */
    Boolean update(NavigationEditPo navigationEditPo);

    /**
     * 删除
     * @param ems_navigation_id
     * @return
     */
    Boolean delete(Integer ems_navigation_id);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    Boolean deleteByPanorama(Integer ems_panorama_id);
}
