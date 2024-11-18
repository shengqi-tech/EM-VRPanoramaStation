package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.LookpointMapper;
import com.shengqitech.ems.models.domains.Lookpoint;
import com.shengqitech.ems.models.po.LookpointAddPo;
import com.shengqitech.ems.models.po.LookpointEditPo;
import com.shengqitech.ems.services.ILookpointService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
@Service
public class LookpointServiceImpl  implements ILookpointService {

    @Autowired
    private LookpointMapper lookpointMapper;

    @Override
    public Boolean insert(LookpointAddPo lookpointAddPo) {
        Lookpoint lookpoint = Lookpoint.builder()
                .ems_lookpoint_fov(lookpointAddPo.getEms_lookpoint_fov())
                .ems_lookpoint_weight(lookpointAddPo.getEms_lookpoint_weight())
                .ems_lookpoint_startcoordinate(lookpointAddPo.getEms_lookpoint_startcoordinate())
                .ems_lookpoint_hotspotid(lookpointAddPo.getEms_lookpoint_hotspotid())
                .ems_lookpoint_guideid(lookpointAddPo.getEms_lookpoint_guideid())
                .build();
        int count = lookpointMapper.insert(lookpoint);
        return count > 0;
    }

    @Override
    public Boolean update(LookpointEditPo lookpointEditPo) {
        Lookpoint lookpoint = Lookpoint.builder()
                .ems_lookpoint_id(lookpointEditPo.getEms_lookpoint_id())
                .ems_lookpoint_fov(lookpointEditPo.getEms_lookpoint_fov())
                .ems_lookpoint_weight(lookpointEditPo.getEms_lookpoint_weight())
                .ems_lookpoint_startcoordinate(lookpointEditPo.getEms_lookpoint_startcoordinate())
                .ems_lookpoint_hotspotid(lookpointEditPo.getEms_lookpoint_id())
                .ems_lookpoint_guideid(lookpointEditPo.getEms_lookpoint_guideid())
                .build();
        int count = lookpointMapper.update(lookpoint);
        return count > 0;
    }
}
