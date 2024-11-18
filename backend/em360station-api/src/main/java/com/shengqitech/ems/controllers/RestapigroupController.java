package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Restapigroup;
import com.shengqitech.ems.models.po.HtmlAddPo;
import com.shengqitech.ems.models.po.HtmlEditPo;
import com.shengqitech.ems.models.vo.PanoramaVo;
import com.shengqitech.ems.models.vo.RestapigroupVo;
import com.shengqitech.ems.services.IRestapigroupService;
import com.shengqitech.ems.system.page.TableDataInfo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.shengqitech.ems.controllers.BaseController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-12-14
 */
@RestController
@RequestMapping("/restapigroup")
@Api(value = "restapi分组管理", tags = "restapigroupController")
public class RestapigroupController extends BaseController {

    @Autowired
    private IRestapigroupService restapigroupService;

    @ApiImplicitParams({@ApiImplicitParam(name = "restapigroup", value = "新增restapi分组", dataTypeClass = Restapigroup.class, required = true),})
    @ApiOperation(value = "新增restapi分组", nickname = "insertRestapigroup")
    @MyLog(title = "新增restapi分组", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody Restapigroup restapigroup) {
        Boolean flag = restapigroupService.insert(restapigroup);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
    @ApiImplicitParams({@ApiImplicitParam(name = "restapigroup", value = "编辑网页标签PO类", dataTypeClass = Restapigroup.class, required = true),})
    @ApiOperation(value = "编辑restapi分组", nickname = "updateRestapigroup")
    @MyLog(title = "编辑restapi分组", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody Restapigroup restapigroup) {
        Boolean flag = restapigroupService.update(restapigroup);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }


    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_restapigroup_id", value = "分组id", dataTypeClass = Integer.class, required = false),
    })
    @ApiOperation(value = "查询restapi分组", nickname = "findRestapigroupByMap")
    @MyLog(title = "查询restapi分组", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<RestapigroupVo>> findByMap(Integer ems_restapigroup_id) {
        Map<String,Object> map = new HashMap<>();
        if (ems_restapigroup_id != null){
            map.put("ems_restapigroup_id",ems_restapigroup_id);
        }
        List<RestapigroupVo> restapigroupVos = restapigroupService.findByMap(map);
        return WrapMapper.ok(restapigroupVos);
    }




}
