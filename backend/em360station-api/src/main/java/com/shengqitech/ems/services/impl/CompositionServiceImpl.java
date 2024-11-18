package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.CompositionMapper;
import com.shengqitech.ems.models.domains.Composition;
import com.shengqitech.ems.models.vo.SectorVo;
import com.shengqitech.ems.services.ICompositionService;
import com.shengqitech.ems.system.utils.TreeBuilderUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
public class CompositionServiceImpl implements ICompositionService {

    @Autowired
    private CompositionMapper compositionMapper;

    @Override
    public List<Composition> findByMap(Map<String, Object> map) {
        List<Composition> compositions = compositionMapper.findByMap(map);
        // 构建通用建树器
        TreeBuilderUtils<Composition> treeBuilder = new TreeBuilderUtils<>();
        // 建树
        List<Composition> compositionList = treeBuilder.buildTree(compositions, 0,Composition::getEms_composition_id,Composition::getEms_composition_pid,Composition::getEms_composition_compositions);
        return compositionList;
    }
}
