package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Tagtype;
import com.shengqitech.ems.models.po.TagtypeAddPo;
import com.shengqitech.ems.models.po.TagtypeEditPo;
import com.shengqitech.ems.models.vo.TagtypeVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface ITagtypeService {
    /**
     * 添加标签类型
     * @param tagtypeAddPo
     * @return
     */
    Boolean insert(TagtypeAddPo tagtypeAddPo);
    /**
     * 编辑标签类型
     * @param tagtypeEditPo
     * @return
     */
    Boolean update(TagtypeEditPo tagtypeEditPo);

    List<TagtypeVo> findByMap(Map<String,Object> map);

    /**
     * 删除标签类型
     * @param ems_tagtype_id 标签类型id
     * @return
     */
    Boolean delete(Integer ems_tagtype_id);
}
