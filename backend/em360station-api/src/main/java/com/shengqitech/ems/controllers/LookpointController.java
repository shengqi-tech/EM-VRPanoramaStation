package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.LookpointAddPo;
import com.shengqitech.ems.models.po.LookpointEditPo;
import com.shengqitech.ems.services.ILookpointService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wsh
 * @since 2024-01-02
 */

@RestController
@RequestMapping("/lookpoint")
@Api(value = "看点管理", tags = "lookpointController")
public class LookpointController extends BaseController {

    @Autowired
    private ILookpointService lookpointService;

    @ApiImplicitParams({@ApiImplicitParam(name = "lookpointAddPo", value = "新增看点PO类", dataTypeClass = LookpointAddPo.class, required = true),})
    @ApiOperation(value = "新增看点", nickname = "insertLookpoint")
    @MyLog(title = "新增看点", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody LookpointAddPo lookpointAddPo) {
        Boolean flag = lookpointService.insert(lookpointAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "lookpointEditPo", value = "编辑看点PO类", dataTypeClass = LookpointEditPo.class, required = true),})
    @ApiOperation(value = "编辑看点", nickname = "updateLookpoint")
    @MyLog(title = "编辑看点", businessType = BusinessType.SELECT)
    @PostMapping("/update")
    public Wrapper update(@RequestBody LookpointEditPo lookpointEditPo) {
        Boolean flag = lookpointService.update(lookpointEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }





}
