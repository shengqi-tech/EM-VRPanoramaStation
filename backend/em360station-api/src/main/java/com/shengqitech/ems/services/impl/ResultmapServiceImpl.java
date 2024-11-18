package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.ResultmapMapper;
import com.shengqitech.ems.models.domains.Resultmap;
import com.shengqitech.ems.models.po.ResultmapAddPo;
import com.shengqitech.ems.models.po.ResultmapEditPo;
import com.shengqitech.ems.services.IResultmapService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
@Service
public class ResultmapServiceImpl  implements IResultmapService {

    @Autowired
    private ResultmapMapper resultmapMapper;

    @Override
    public Boolean insert(ResultmapAddPo resultmapAddPo) {
        Date now = new Date();
        Resultmap resultmap = Resultmap.builder()
                .ems_resultmap_source(resultmapAddPo.getEms_resultmap_source())
                .ems_resultmap_destination(resultmapAddPo.getEms_resultmap_destination())
                .ems_resultmap_apiid(resultmapAddPo.getEms_resultmap_apiid())
                .ems_resultmap_createtime(now)
                .ems_resultmap_updatetime(now).build();
        int count = resultmapMapper.insert(resultmap);
        return count > 0;
    }

    @Override
    public Boolean update(ResultmapEditPo resultmapEditPo) {
        Date now = new Date();
        Resultmap resultmap = Resultmap.builder()
                .ems_resultmap_id(resultmapEditPo.getEms_resultmap_id())
                .ems_resultmap_source(resultmapEditPo.getEms_resultmap_source())
                .ems_resultmap_destination(resultmapEditPo.getEms_resultmap_destination())
                .ems_resultmap_apiid(resultmapEditPo.getEms_resultmap_apiid())
                .ems_resultmap_updatetime(now).build();
        int count = resultmapMapper.update(resultmap);
        return count > 0;
    }

    @Override
    public Boolean delete(Integer ems_resultmap_id) {
        int count = resultmapMapper.delete(ems_resultmap_id);
        return count > 0;
    }
}
