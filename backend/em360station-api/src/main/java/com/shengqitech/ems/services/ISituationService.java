package com.shengqitech.ems.services;


import com.shengqitech.ems.models.vo.SituationVo;
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
public interface ISituationService {

    List<SituationVo> findByMap(Map<String,Object> map);

}
