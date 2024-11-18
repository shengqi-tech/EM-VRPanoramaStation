package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.vo.SituationVo;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author hgy
 * @since 2023-01-25
 */
public interface SituationMapper {


    /**
     * 查询
     * @param map 查询参数
     * @return
     */
    List<SituationVo> findByMap(Map<String, Object> map);



}
