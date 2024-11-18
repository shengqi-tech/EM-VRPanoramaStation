package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Tagtype;
import com.shengqitech.ems.models.vo.SectorVo;
import com.shengqitech.ems.models.vo.TagtypeVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author hgy
 * @since 2024-01-25
 */
public interface SectorMapper {



    /**
     * 查询
     * @param map 查询参数
     * @return
     */
    List<SectorVo> findByMap(Map<String, Object> map);



}
