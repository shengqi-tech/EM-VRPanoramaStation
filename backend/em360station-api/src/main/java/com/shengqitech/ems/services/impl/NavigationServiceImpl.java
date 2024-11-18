package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.NavigationMapper;
import com.shengqitech.ems.models.domains.Navigation;
import com.shengqitech.ems.models.po.NavigationAddPo;
import com.shengqitech.ems.models.po.NavigationEditPo;
import com.shengqitech.ems.services.INavigationService;
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
public class NavigationServiceImpl implements INavigationService {

    @Autowired
    private NavigationMapper navigationMapper;

    @Override
    public Boolean insert(NavigationAddPo navigationAddPo) {
        Date now = new Date();
        Navigation navigation = Navigation.builder()
                .ems_navigation_name(navigationAddPo.getEms_navigation_name())
                .ems_navigation_panoramaid(navigationAddPo.getEms_navigation_panoramaid())
                .ems_navigation_topanoramaid(navigationAddPo.getEms_navigation_topanoramaid())
                .ems_navigation_tagtypeid(navigationAddPo.getEms_navigation_tagtypeid())
                .ems_navigation_rotation(navigationAddPo.getEms_navigation_rotation())
                .ems_navigation_location(navigationAddPo.getEms_navigation_location())
                .ems_navigation_widthratio(navigationAddPo.getEms_navigation_widthratio())
                .ems_navigation_heightratio(navigationAddPo.getEms_navigation_heightratio())
                .ems_navigation_taganimationid(navigationAddPo.getEms_navigation_taganimationid())
                .ems_navigation_jsondata(navigationAddPo.getEms_navigation_jsondata())
                .ems_navigation_createtime(now)
                .ems_navigation_updatetime(now)
                .build();
        int count = navigationMapper.insert(navigation);
        return count > 0;
    }

    @Override
    public Boolean update(NavigationEditPo navigationEditPo) {
        Date now = new Date();
        Navigation navigation = Navigation.builder()
                .ems_navigation_id(navigationEditPo.getEms_navigation_id())
                .ems_navigation_name(navigationEditPo.getEms_navigation_name())
                .ems_navigation_panoramaid(navigationEditPo.getEms_navigation_panoramaid())
                .ems_navigation_topanoramaid(navigationEditPo.getEms_navigation_topanoramaid())
                .ems_navigation_tagtypeid(navigationEditPo.getEms_navigation_tagtypeid())
                .ems_navigation_rotation(navigationEditPo.getEms_navigation_rotation())
                .ems_navigation_location(navigationEditPo.getEms_navigation_location())
                .ems_navigation_widthratio(navigationEditPo.getEms_navigation_widthratio())
                .ems_navigation_heightratio(navigationEditPo.getEms_navigation_heightratio())
                .ems_navigation_taganimationid(navigationEditPo.getEms_navigation_taganimationid())
                .ems_navigation_jsondata(navigationEditPo.getEms_navigation_jsondata())
                .ems_navigation_updatetime(now)
                .build();
        int count = navigationMapper.update(navigation);
        return count > 0;
    }

    @Override
    public Boolean delete(Integer ems_navigation_id) {
        int count = navigationMapper.delete(ems_navigation_id);
        return count > 0;
    }

    @Override
    public Boolean deleteByPanorama(Integer ems_panorama_id) {
        return navigationMapper.deleteByPanorama(ems_panorama_id) > 0;
    }
}
