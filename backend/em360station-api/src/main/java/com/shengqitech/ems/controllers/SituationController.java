package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;


import com.shengqitech.ems.models.vo.SituationVo;


import com.shengqitech.ems.services.ISituationService;
import com.shengqitech.ems.services.ITagtypeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author hgy
 * @since 2023-01-25
 */
@RestController
@RequestMapping("/situation")
@Api(value = "监测状况", tags = "situationController")
public class SituationController extends BaseController {

    @Autowired
    private ISituationService situationService;

//    @ApiImplicitParams(value = {
//            @ApiImplicitParam(name = "ems_api_url", value = "请求地址", dataTypeClass = String.class, required = false),
//            @ApiImplicitParam(name = "ems_api_requesttype", value = "请求类型(GET POST)", dataTypeClass = String.class, required = false),
//            @ApiImplicitParam(name = "ems_api_starttime", value = "开始时间", dataTypeClass = Date.class, required = false),
//            @ApiImplicitParam(name = "ems_api_endtime", value = "结束时间", dataTypeClass = Date.class, required = false),
//            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
//            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量" , required = false, dataTypeClass = Integer.class, paramType = "query"),
//    })
    @ApiOperation(value = "查询监测状况", nickname = "findSituationByMap")
    @MyLog(title = "查询监测状况", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<SituationVo>> findByMap() {
        Map<String, Object> map = new HashMap<>();
        List<SituationVo> situationVos = situationService.findByMap(map);
        return WrapMapper.ok(situationVos);

    }


}