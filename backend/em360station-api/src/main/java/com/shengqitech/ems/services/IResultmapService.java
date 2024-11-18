package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.ResultmapAddPo;
import com.shengqitech.ems.models.po.ResultmapEditPo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
public interface IResultmapService {

    /**
     * 新增
     * @param resultmapAddPo
     * @return
     */
    Boolean insert(ResultmapAddPo resultmapAddPo);

    /**
     * 修改
     * @param resultmapEditPo
     * @return
     */
    Boolean update(ResultmapEditPo resultmapEditPo);

    /**
     * 删除
     * @param ems_resultmap_id
     * @return
     */
    Boolean delete(Integer ems_resultmap_id);

}
