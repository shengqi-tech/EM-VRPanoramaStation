package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.ApiMapper;
import com.shengqitech.ems.models.domains.Api;
import com.shengqitech.ems.models.po.ApiAddPo;
import com.shengqitech.ems.models.po.ApiEditPo;
import com.shengqitech.ems.models.vo.ApiVo;
import com.shengqitech.ems.services.IApiService;
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
 * @since 2023-12-04
 */
@Service
public class ApiServiceImpl implements IApiService {

    @Autowired
    private ApiMapper apiMapper;

    @Override
    public int insert(ApiAddPo apiAddPo) {
        Date now = new Date();
        Api api = Api.builder()
                .ems_api_name(apiAddPo.getEms_api_name())
                .ems_api_url(apiAddPo.getEms_api_url())
                .ems_api_parameters(apiAddPo.getEms_api_parameters())
                .ems_api_header(apiAddPo.getEms_api_header())
                .ems_api_receptorid(apiAddPo.getEms_api_receptorid())
                .ems_api_requesttype(apiAddPo.getEms_api_requesttype())
                .ems_api_sysuserid(apiAddPo.getEms_api_sysuserid())
                .ems_api_restapigroupid(apiAddPo.getEms_api_restapigroupid())
                .ems_api_createtime(now)
                .ems_api_updatetime(now).build();
        int count = apiMapper.insert(api);
        return api.getEms_api_id();
    }

    @Override
    public Boolean update(ApiEditPo apiEditPo) {
        Date now = new Date();
        Api api = Api.builder()
                .ems_api_id(apiEditPo.getEms_api_id())
                .ems_api_name(apiEditPo.getEms_api_name())
                .ems_api_url(apiEditPo.getEms_api_url())
                .ems_api_parameters(apiEditPo.getEms_api_parameters())
                .ems_api_header(apiEditPo.getEms_api_header())
                .ems_api_receptorid(apiEditPo.getEms_api_receptorid())
                .ems_api_requesttype(apiEditPo.getEms_api_requesttype())
                .ems_api_sysuserid(apiEditPo.getEms_api_sysuserid())
                .ems_api_restapigroupid(apiEditPo.getEms_api_restapigroupid())
                .ems_api_updatetime(now).build();
        int count = apiMapper.update(api);
        return count > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer ems_api_id) {
        int count = apiMapper.delete(ems_api_id);
        return count > 0;
    }

    @Override
    public List<ApiVo> findByMap(Map<String, Object> map) {
        List<ApiVo> apiVos = apiMapper.findByMap(map);
        return apiVos;
    }
}
