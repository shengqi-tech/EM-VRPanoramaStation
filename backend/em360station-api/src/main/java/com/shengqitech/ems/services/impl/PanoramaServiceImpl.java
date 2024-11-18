package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.InstanceMapper;
import com.shengqitech.ems.mappers.PanoramaMapper;
import com.shengqitech.ems.mappers.SysfileMapper;
import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Panorama;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.PanoramaAddPo;
import com.shengqitech.ems.models.po.PanoramaEditPo;
import com.shengqitech.ems.models.vo.PanoramaViewVo;
import com.shengqitech.ems.models.vo.PanoramaVo;
import com.shengqitech.ems.services.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class PanoramaServiceImpl implements IPanoramaService {

    @Autowired
    private PanoramaMapper panoramaMapper;

    @Autowired
    private SysfileMapper sysfileMapper;

    @Autowired
    private InstanceMapper instanceMapper;

    @Autowired
    private ICommonService commonService;

    @Autowired
    private IVideofusionService videofusionService;

    @Autowired
    private IHtmlService htmlService;

    @Autowired
    private INavigationService navigationService;

    @Override
    public Boolean insert(PanoramaAddPo panoramaAddPo) {
        // 创建时间
        Date now = new Date();
        Double panIndex = 0D;
        Double index = panoramaMapper.getMaxIndexByInstanceId(panoramaAddPo.getEms_panorama_instanceid());
        if (index == null){
            panIndex = 1D;
        }else {
            panIndex = index + 1;
        }

        Sysfile coverfile = panoramaAddPo.getEms_panorama_coverfile();
        List<Integer> ids = new ArrayList<>();
        List<Sysfile> slicefiles = panoramaAddPo.getEms_panorama_slicefiles();
        if (slicefiles != null && slicefiles.size() != 0) {
            ids = slicefiles.stream().map(s -> s.getEms_sysfile_id()).collect(Collectors.toList());
        }
        String idsStr = null;
        if (ids != null && ids.size() != 0) {
            idsStr = ids.stream()
                    .map(Object::toString)
                    .collect(Collectors.joining(","));
        }

        Panorama panorama = Panorama.builder()
                .ems_panorama_name(panoramaAddPo.getEms_panorama_name())
                .ems_panorama_level(panoramaAddPo.getEms_panorama_level())
                .ems_panorama_coverid(coverfile == null ? null : coverfile.getEms_sysfile_id())
                .ems_panorama_slicefileids(idsStr == null ? null : idsStr)
                .ems_panorama_index(panIndex)
                .ems_panorama_default(panoramaAddPo.getEms_panorama_default())
                .ems_panorama_initview(panoramaAddPo.getEms_panorama_initview())
                .ems_panorama_fov(panoramaAddPo.getEms_panorama_fov())
                .ems_panorama_instanceid(panoramaAddPo.getEms_panorama_instanceid())
                .ems_panorama_des(panoramaAddPo.getEms_panorama_des())
                .ems_panorama_createtime(now)
                .ems_panorama_updatetime(now)
                .ems_panorama_userid(panoramaAddPo.getEms_panorama_userid())
                .build();
        int count = panoramaMapper.insert(panorama);
        return count > 0;
    }

    @Override
    public Boolean update(PanoramaEditPo panoramaEditPo) {
        // 修改时间
        Date now = new Date();
        Sysfile coverfile = panoramaEditPo.getEms_panorama_coverfile();
        List<Integer> ids = new ArrayList<>();
        List<Sysfile> slicefiles = panoramaEditPo.getEms_panorama_slicefiles();
        if (slicefiles != null && slicefiles.size() != 0) {
            ids = slicefiles.stream().map(s -> s.getEms_sysfile_id()).collect(Collectors.toList());
        }
        String idsStr = null;
        if (ids != null && ids.size() != 0) {
            idsStr = ids.stream()
                    .map(Object::toString)
                    .collect(Collectors.joining(","));
        }

        Panorama panorama = Panorama.builder()
                .ems_panorama_id(panoramaEditPo.getEms_panorama_id())
                .ems_panorama_name(panoramaEditPo.getEms_panorama_name())
                .ems_panorama_level(panoramaEditPo.getEms_panorama_level())
                .ems_panorama_coverid(coverfile == null ? null : coverfile.getEms_sysfile_id())
                .ems_panorama_slicefileids(idsStr == null ? null : idsStr)
                .ems_panorama_index(panoramaEditPo.getEms_panorama_index())
                .ems_panorama_default(panoramaEditPo.getEms_panorama_default())
                .ems_panorama_initview(panoramaEditPo.getEms_panorama_initview())
                .ems_panorama_fov(panoramaEditPo.getEms_panorama_fov())
                .ems_panorama_instanceid(panoramaEditPo.getEms_panorama_instanceid())
                .ems_panorama_des(panoramaEditPo.getEms_panorama_des())
                .ems_panorama_updatetime(now)
                .ems_panorama_userid(panoramaEditPo.getEms_panorama_userid())
                .build();
        int count = panoramaMapper.update(panorama);
        return count > 0;
    }

    @Override
    public List<PanoramaViewVo> findByMap(Map<String, Object> map) {
        List<PanoramaViewVo> panoramaVos = panoramaMapper.findByMap(map);
        for (PanoramaViewVo panoramaVo : panoramaVos) {
            String slicefileids = panoramaVo.getEms_panorama_slicefileids();
            List<Integer> idList = new ArrayList<>();
            if (slicefileids != null && slicefileids != ""){
                idList = Arrays.stream(slicefileids.split(","))
                        .map(String::trim)
                        .map(Integer::valueOf)
                        .collect(Collectors.toList());
            }
            if (idList.size() != 0){
                List<Sysfile> sysfiles = sysfileMapper.findByIds(idList);
                panoramaVo.setEms_panorama_slicefiles(sysfiles);
            }
        }
        return panoramaVos;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer ems_panorama_id) {
        commonService.deleteByPanorama(ems_panorama_id);
        navigationService.deleteByPanorama(ems_panorama_id);
        videofusionService.deleteByPanorama(ems_panorama_id);
        htmlService.deleteByPanorama(ems_panorama_id);
        int count = panoramaMapper.delete(ems_panorama_id);
        return count > 0;
    }

    @Override
    public PanoramaViewVo getView(Integer ems_panorama_id) {
        PanoramaViewVo panoramaViewVo = panoramaMapper.getView(ems_panorama_id);
        if (panoramaViewVo == null) {
            return null;
        }
        String slicefileids = panoramaViewVo.getEms_panorama_slicefileids();
        List<Integer> idList = Arrays.stream(slicefileids.split(","))
                .map(String::trim)
                .map(Integer::valueOf)
                .collect(Collectors.toList());
        List<Sysfile> sysfiles = sysfileMapper.findByIds(idList);
        panoramaViewVo.setEms_panorama_slicefiles(sysfiles);
        Instance instance = instanceMapper.findById(panoramaViewVo.getEms_panorama_instanceid());
        panoramaViewVo.setEms_panorama_instance(instance);
        return panoramaViewVo;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean setHomePage(Integer ems_panorama_id, Integer ems_instance_id) {
        // 重置
        panoramaMapper.resetDefault(ems_instance_id);
        // 设置
        int count = panoramaMapper.setHomePage(ems_panorama_id);
        return count > 0;
    }

    @Override
    public Boolean sort(Integer sortId, Integer id) {
        Integer count = 0;
        if (id == null) {
            count = panoramaMapper.sortLast(sortId);
        } else {
            count = panoramaMapper.sort(sortId, id);
        }
        return count > 0;
    }
}
