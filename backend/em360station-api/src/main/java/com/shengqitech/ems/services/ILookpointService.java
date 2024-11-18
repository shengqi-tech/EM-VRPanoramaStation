package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.LookpointAddPo;
import com.shengqitech.ems.models.po.LookpointEditPo;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
public interface ILookpointService {

    Boolean insert(LookpointAddPo lookpointAddPo);

    Boolean update(LookpointEditPo lookpointEditPo);


}
