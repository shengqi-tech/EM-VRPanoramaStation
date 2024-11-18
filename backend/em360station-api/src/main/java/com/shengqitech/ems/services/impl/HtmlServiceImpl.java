package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.HtmlMapper;
import com.shengqitech.ems.models.domains.Html;
import com.shengqitech.ems.models.po.HtmlAddPo;
import com.shengqitech.ems.models.po.HtmlEditPo;
import com.shengqitech.ems.services.IHtmlService;
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
public class HtmlServiceImpl implements IHtmlService {

    @Autowired
    private HtmlMapper htmlMapper;

    @Override
    public Boolean insert(HtmlAddPo htmlAddPo) {
        Date now = new Date();
        Html html = Html.builder()
                .ems_html_name(htmlAddPo.getEms_html_name())
                .ems_html_panoramaid(htmlAddPo.getEms_html_panoramaid())
                .ems_html_tagtypeid(htmlAddPo.getEms_html_tagtypeid())
                .ems_html_url(htmlAddPo.getEms_html_url())
                .ems_html_widthratio(htmlAddPo.getEms_html_widthratio())
                .ems_html_heightratio(htmlAddPo.getEms_html_heightratio())
                .ems_html_taganimationid(htmlAddPo.getEms_html_taganimationid())
                .ems_html_rotation(htmlAddPo.getEms_html_rotation())
                .ems_html_location(htmlAddPo.getEms_html_location())
                .ems_html_jsondata(htmlAddPo.getEms_html_jsondata())
                .ems_html_createtime(now)
                .ems_html_updatetime(now).build();
        int count = htmlMapper.insert(html);
        return count > 0;
    }

    @Override
    public Boolean update(HtmlEditPo htmlEditPo) {
        Date now = new Date();
        Html html = Html.builder()
                .ems_html_id(htmlEditPo.getEms_html_id())
                .ems_html_name(htmlEditPo.getEms_html_name())
                .ems_html_panoramaid(htmlEditPo.getEms_html_panoramaid())
                .ems_html_tagtypeid(htmlEditPo.getEms_html_tagtypeid())
                .ems_html_url(htmlEditPo.getEms_html_url())
                .ems_html_widthratio(htmlEditPo.getEms_html_widthratio())
                .ems_html_heightratio(htmlEditPo.getEms_html_heightratio())
                .ems_html_taganimationid(htmlEditPo.getEms_html_taganimationid())
                .ems_html_rotation(htmlEditPo.getEms_html_rotation())
                .ems_html_location(htmlEditPo.getEms_html_location())
                .ems_html_jsondata(htmlEditPo.getEms_html_jsondata())
                .ems_html_updatetime(now).build();
        int count = htmlMapper.update(html);
        return count > 0;
    }

    @Override
    public Boolean delete(Integer ems_html_id) {
        int count = htmlMapper.delete(ems_html_id);
        return count > 0;
    }

    @Override
    public Boolean deleteByPanorama(Integer ems_panorama_id) {
        return htmlMapper.deleteByPanorama(ems_panorama_id) > 0;
    }
}
