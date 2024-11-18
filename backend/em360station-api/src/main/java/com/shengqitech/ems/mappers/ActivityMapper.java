package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Activity;
import com.shengqitech.ems.models.vo.SectorVo;

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
public interface ActivityMapper {



    /**
     * 查询
     * @param id 查询参数 要素id
     * @return
     */
    List<Activity> selectByElementId(Integer id);


    List<Activity> selectBySectorId(Integer id);


}
