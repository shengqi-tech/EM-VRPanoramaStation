package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.GuideMapper;
import com.shengqitech.ems.mappers.LookpointMapper;
import com.shengqitech.ems.models.domains.Guide;
import com.shengqitech.ems.models.domains.Lookpoint;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.GuideAddPo;
import com.shengqitech.ems.models.po.GuideEditPo;
import com.shengqitech.ems.models.vo.GuideVo;
import com.shengqitech.ems.services.IGuideService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */
@Service
public class GuideServiceImpl implements IGuideService {

    @Autowired
    private GuideMapper guideMapper;

    @Autowired
    private LookpointMapper lookpointMapper;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean insert(GuideAddPo guideAddPo) {
        Integer instanceid = guideAddPo.getEms_guide_instanceid();
        Double maxSort = guideMapper.findMaxSort(instanceid);
        Sysfile coverfile = guideAddPo.getEms_guide_coverfile();
        Guide guide = Guide.builder()
                .ems_guide_name(guideAddPo.getEms_guide_name())
                .ems_guide_coverid(coverfile == null ? null : coverfile.getEms_sysfile_id())
                .ems_guide_intr(guideAddPo.getEms_guide_intr())
                .ems_guide_instanceid(instanceid)
                .ems_guide_panoramaid(guideAddPo.getEms_guide_panoramaid())
                .ems_guide_sort(maxSort == null ? 0 : (maxSort+1))
                .ems_guide_jsondata(guideAddPo.getEms_guide_jsondata())
                .build();
        int count = guideMapper.insert(guide);
        List<Lookpoint> lookpointList = guideAddPo.getLookpointList();
        if (lookpointList.size() > 0){
            lookpointList.stream().forEach(lookpoint -> lookpoint.setEms_lookpoint_guideid(guide.getEms_guide_id()));
            lookpointMapper.insertBatch(lookpointList);
        }
        return count > 0;
    }
    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean update(GuideEditPo guideEditPo) {
        Sysfile coverfile = guideEditPo.getEms_guide_coverfile();
        Guide guide = Guide.builder()
                .ems_guide_id(guideEditPo.getEms_guide_id())
                .ems_guide_name(guideEditPo.getEms_guide_name())
                .ems_guide_coverid(coverfile == null ? null : coverfile.getEms_sysfile_id())
                .ems_guide_intr(guideEditPo.getEms_guide_intr())
                .ems_guide_instanceid(guideEditPo.getEms_guide_instanceid())
                .ems_guide_panoramaid(guideEditPo.getEms_guide_panoramaid())
                .ems_guide_sort(guideEditPo.getEms_guide_sort())
                .ems_guide_jsondata(guideEditPo.getEms_guide_jsondata())
                .build();
        int count = guideMapper.update(guide);
        List<Lookpoint> lookpointList = guideEditPo.getLookpointList();
        lookpointMapper.updateBatch(lookpointList);
        return count > 0;
    }

    @Override
    public List<GuideVo> findByMap(Map<String, Object> map) {
        return guideMapper.findByMap(map);
    }

    @Override
    public Boolean sort(Integer sortId, Integer id) {
        Integer count = 0;
        if (id == null) {
            count = guideMapper.sortLast(sortId);
        } else {
            count = guideMapper.sort(sortId, id);
        }
        return count > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer ems_guide_id) {
        lookpointMapper.deleteByGuide(ems_guide_id);
        int count = guideMapper.delete(ems_guide_id);
        return count > 0;
    }
}
