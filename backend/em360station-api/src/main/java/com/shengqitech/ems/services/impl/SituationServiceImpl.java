package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.*;
import com.shengqitech.ems.models.domains.*;
import com.shengqitech.ems.models.po.TagtypeAddPo;
import com.shengqitech.ems.models.po.TagtypeEditPo;
import com.shengqitech.ems.models.vo.ElementVo;
import com.shengqitech.ems.models.vo.SectorVo;
import com.shengqitech.ems.models.vo.SituationVo;
import com.shengqitech.ems.models.vo.TagtypeVo;
import com.shengqitech.ems.services.ISituationService;
import com.shengqitech.ems.services.ITagtypeService;
import com.shengqitech.ems.system.utils.TreeBuilderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class SituationServiceImpl implements ISituationService {

    @Autowired
    private SituationMapper situationMapper;

    @Autowired
    private SectorMapper sectorMapper;

    @Autowired
    private ElementMapper elementMapper;

    @Override
    public List<SituationVo> findByMap(Map<String, Object> map) {
        List<SituationVo> situationVos = situationMapper.findByMap(map);

        List<ElementVo> elementVos =  elementMapper.findByMap(map);
        situationVos.get(0).setEms_situation_elementVos(elementVos);

        List<SectorVo> sectorVos =  sectorMapper.findByMap(map);
        // 构建通用建树器
        TreeBuilderUtils<SectorVo> treeBuilder = new TreeBuilderUtils<>();
        // 建树
        List<SectorVo> sectorVoTree = treeBuilder.buildTree(sectorVos, 0,SectorVo::getEms_sector_id,SectorVo::getEms_sector_pid,SectorVo::getEms_sector_sectors);
        situationVos.get(1).setEms_situation_sectorVos(sectorVoTree);
        return situationVos;
    }

}
