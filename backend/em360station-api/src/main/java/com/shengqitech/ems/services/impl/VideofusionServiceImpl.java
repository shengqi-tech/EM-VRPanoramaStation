package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.VideofusionMapper;
import com.shengqitech.ems.models.domains.Videofusion;
import com.shengqitech.ems.models.po.VideofusionAddPo;
import com.shengqitech.ems.models.po.VideofusionEditPo;
import com.shengqitech.ems.services.IVideofusionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class VideofusionServiceImpl implements IVideofusionService {

    @Autowired
    private VideofusionMapper videofusionMapper;

    @Override
    public Boolean insert(VideofusionAddPo videofusionAddPo) {
        Date now = new Date();
        Videofusion videofusion = Videofusion.builder()
                .ems_videofusion_name(videofusionAddPo.getEms_videofusion_name())
                .ems_videofusion_panoramaid(videofusionAddPo.getEms_videofusion_panoramaid())
                .ems_videofusion_tagtypeid(videofusionAddPo.getEms_videofusion_tagtypeid())
                .ems_videofusion_flvurl(videofusionAddPo.getEms_videofusion_flvurl())
                .ems_videofusion_param(videofusionAddPo.getEms_videofusion_param())
                .ems_videofusion_deviceid(videofusionAddPo.getEms_videofusion_deviceid())
                .ems_videofusion_rotation(videofusionAddPo.getEms_videofusion_rotation())
                .ems_videofusion_location(videofusionAddPo.getEms_videofusion_location())
                .ems_videofusion_widthratio(videofusionAddPo.getEms_videofusion_widthratio())
                .ems_videofusion_heightratio(videofusionAddPo.getEms_videofusion_heightratio())
                .ems_videofusion_camrotation(videofusionAddPo.getEms_videofusion_camrotation())
                .ems_videofusion_viewscale(videofusionAddPo.getEms_videofusion_viewscale())
                .ems_videofusion_near(videofusionAddPo.getEms_videofusion_near())
                .ems_videofusion_far(videofusionAddPo.getEms_videofusion_far())
                .ems_videofusion_createtime(now)
                .ems_videofusion_updatetime(now).build();
        int count = videofusionMapper.insert(videofusion);

        return count > 0;
    }

    @Override
    public Boolean update(VideofusionEditPo videofusionEditPo) {
        Date now = new Date();
        Videofusion videofusion = Videofusion.builder()
                .ems_videofusion_id(videofusionEditPo.getEms_videofusion_id())
                .ems_videofusion_name(videofusionEditPo.getEms_videofusion_name())
                .ems_videofusion_panoramaid(videofusionEditPo.getEms_videofusion_panoramaid())
                .ems_videofusion_tagtypeid(videofusionEditPo.getEms_videofusion_tagtypeid())
                .ems_videofusion_flvurl(videofusionEditPo.getEms_videofusion_flvurl())
                .ems_videofusion_param(videofusionEditPo.getEms_videofusion_param())
                .ems_videofusion_deviceid(videofusionEditPo.getEms_videofusion_deviceid())
                .ems_videofusion_rotation(videofusionEditPo.getEms_videofusion_rotation())
                .ems_videofusion_location(videofusionEditPo.getEms_videofusion_location())
                .ems_videofusion_widthratio(videofusionEditPo.getEms_videofusion_widthratio())
                .ems_videofusion_heightratio(videofusionEditPo.getEms_videofusion_heightratio())
                .ems_videofusion_camrotation(videofusionEditPo.getEms_videofusion_camrotation())
                .ems_videofusion_viewscale(videofusionEditPo.getEms_videofusion_viewscale())
                .ems_videofusion_near(videofusionEditPo.getEms_videofusion_near())
                .ems_videofusion_far(videofusionEditPo.getEms_videofusion_far())
                .ems_videofusion_updatetime(now).build();
        int count = videofusionMapper.update(videofusion);
        return count > 0;
    }

    @Override
    public Boolean deleteByPanorama(Integer ems_panorama_id) {
        return videofusionMapper.deleteByPanorama(ems_panorama_id) > 0;
    }
}
