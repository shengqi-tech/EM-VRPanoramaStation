package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.*;
import com.shengqitech.ems.models.domains.*;
import com.shengqitech.ems.models.po.TagtypeAddPo;
import com.shengqitech.ems.models.po.TagtypeEditPo;
import com.shengqitech.ems.models.vo.TagtypeVo;
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
public class TagtypeServiceImpl implements ITagtypeService {

    @Autowired
    private TagtypeMapper tagtypeMapper;

    @Autowired
    private HtmlMapper htmlMapper;

    @Autowired
    private VideofusionMapper videofusionMapper;

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private NavigationMapper navigationMapper;

    @Override
    public Boolean insert(TagtypeAddPo tagtypeAddPo) {
        Date now = new Date();
        Sysfile iconfile = tagtypeAddPo.getEms_tagtype_iconfile();
        Tagtype tagtype = Tagtype.builder()
                .ems_tagtype_name(tagtypeAddPo.getEms_tagtype_name())
                .ems_tagtype_iconfileid(iconfile == null ? null : iconfile.getEms_sysfile_id())
                .ems_tagtype_createtime(now)
                .ems_tagtype_updatetime(now)
                .ems_tagtype_pid(tagtypeAddPo.getEms_tagtype_pid())
                .ems_tagtype_type(tagtypeAddPo.getEms_tagtype_type()).build();
        int count = tagtypeMapper.insert(tagtype);
        return count > 0;
    }

    @Override
    public Boolean update(TagtypeEditPo tagtypeEditPo) {
        Date now = new Date();
        Sysfile iconfile = tagtypeEditPo.getEms_tagtype_iconfile();
        Tagtype tagtype = Tagtype.builder()
                .ems_tagtype_id(tagtypeEditPo.getEms_tagtype_id())
                .ems_tagtype_name(tagtypeEditPo.getEms_tagtype_name())
                .ems_tagtype_iconfileid(iconfile == null ? null : iconfile.getEms_sysfile_id())
                .ems_tagtype_updatetime(now)
                .ems_tagtype_pid(tagtypeEditPo.getEms_tagtype_pid())
                .ems_tagtype_type(tagtypeEditPo.getEms_tagtype_type()).build();
        int count = tagtypeMapper.update(tagtype);
        return count > 0;
    }

    @Override
    public List<TagtypeVo> findByMap(Map<String, Object> map) {
        List<TagtypeVo> tagtypes = tagtypeMapper.findByMap(map);
        // 构建通用建树器
        TreeBuilderUtils<TagtypeVo> treeBuilder = new TreeBuilderUtils<>();
        // 建树
        List<TagtypeVo> tree = treeBuilder.buildTree(tagtypes, 0,TagtypeVo::getEms_tagtype_id,TagtypeVo::getEms_tagtype_pid,TagtypeVo::getEms_tagtype_tagtypes);
        return tree;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer ems_tagtype_id) {
        // 查询相同类型默认的标签
        Tagtype aDefault = tagtypeMapper.findDefault(ems_tagtype_id);

        // 查询网页标签
        List<Html> htmls = htmlMapper.findByTagtypeId(ems_tagtype_id);
        Integer emsTagtypeId = aDefault.getEms_tagtype_id();

        // 关联的网页标签替换为默认的
        htmls.stream().forEach(html -> html.setEms_html_tagtypeid(emsTagtypeId));
        if (htmls.size() != 0){
            htmlMapper.batchUpdate(htmls);
        }

        // 查询全景导航
        List<Navigation> navigations = navigationMapper.findByTagtypeId(ems_tagtype_id);
        // 关联的全景导航替换为默认的
        navigations.stream().forEach(navigation -> navigation.setEms_navigation_tagtypeid(emsTagtypeId));
        if (navigations.size() != 0){
            navigationMapper.batchUpdate(navigations);
        }

        // 查询基础
        List<Common> commons = commonMapper.findByTagtypeId(ems_tagtype_id);
        // 关联的基础替换为默认的
        commons.stream().forEach(common -> common.setEms_common_tagtypeid(emsTagtypeId));
        if (commons.size() != 0){
            commonMapper.batchUpdate(commons);
        }

        // 查询视频融合标签
        List<Videofusion> videofusions = videofusionMapper.findByTagtypeId(ems_tagtype_id);
        // 关联的视频融合标签替换为默认的
        videofusions.stream().forEach(videofusion -> videofusion.setEms_videofusion_tagtypeid(emsTagtypeId));
        if (videofusions.size() != 0){
            videofusionMapper.batchUpdate(videofusions);
        }

        // 删除标签类型
        int count = tagtypeMapper.delete(ems_tagtype_id);
        return count > 0;
    }
}
