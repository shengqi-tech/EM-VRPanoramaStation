package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.HtmlAddPo;
import com.shengqitech.ems.models.po.HtmlEditPo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface IHtmlService {

    /**
     * 添加网页标签
     * @param htmlAddPo
     * @return
     */
    Boolean insert(HtmlAddPo htmlAddPo);
    /**
     * 编辑网页标签
     * @param htmlEditPo
     * @return
     */
    Boolean update(HtmlEditPo htmlEditPo);

    /**
     * 删除网页标签
     * @param ems_html_id
     * @return
     */
    Boolean delete(Integer ems_html_id);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    Boolean deleteByPanorama(Integer ems_panorama_id);

}
