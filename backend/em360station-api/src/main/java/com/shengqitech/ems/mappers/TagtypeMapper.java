package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Tagtype;
import com.shengqitech.ems.models.vo.TagtypeVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface TagtypeMapper{

    /**
     * 新增
     * @param tagtype
     * @return
     */
    int insert(Tagtype tagtype);

    /**
     * 修改
     * @param tagtype
     * @return
     */
    int update(Tagtype tagtype);

    /**
     * 删除
     * @param ems_tagtype_id
     * @return
     */
    int delete(Integer ems_tagtype_id);

    /**
     * 查询
     * @param map 查询参数
     * @return
     */
    List<TagtypeVo> findByMap(Map<String,Object> map);

    Tagtype findDefault(Integer ems_tagtype_id);

}
