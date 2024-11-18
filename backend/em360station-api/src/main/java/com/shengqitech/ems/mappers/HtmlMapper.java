package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Html;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface HtmlMapper{

    /**
     * 新增
     * @param html
     * @return
     */
    int insert(Html html);

    /**
     * 修改
     * @param html
     * @return
     */
    int update(Html html);

    /**
     * 删除
     * @param ems_html_id
     * @return
     */
    int delete(Integer ems_html_id);


    /**
     * 根据标签类型查询
     * @param ems_tagtype_id 标签类型id
     * @return
     */
    List<Html> findByTagtypeId(Integer ems_tagtype_id);

    /**
     * 批量修改
     * @param htmls
     * @return
     */
    int batchUpdate(List<Html> htmls);

    /**
     * 根据全景id删除
     * @param ems_panorama_id
     * @return
     */
    int deleteByPanorama(Integer ems_panorama_id);

}
