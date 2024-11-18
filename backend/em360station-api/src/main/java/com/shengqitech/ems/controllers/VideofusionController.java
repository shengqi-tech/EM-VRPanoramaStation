package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.VideofusionAddPo;
import com.shengqitech.ems.models.po.VideofusionEditPo;
import com.shengqitech.ems.services.IVideofusionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/videofusion")
@Api(value = "视频融合标签管理", tags = "videofusionController")
public class VideofusionController extends BaseController {

    @Autowired
    private IVideofusionService videofusionService;

    @ApiImplicitParams({@ApiImplicitParam(name = "videofusionAddPo", value = "新增视频融合标签PO类", dataTypeClass = VideofusionAddPo.class, required = true),})
    @ApiOperation(value = "新增视频融合标签", nickname = "insertVideofusion")
    @MyLog(title = "新增视频融合标签", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody VideofusionAddPo videofusionAddPo) {
        Boolean flag = videofusionService.insert(videofusionAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {@ApiImplicitParam(name = "videofusionEditPo", value = "添加全景场景PO类", dataTypeClass = VideofusionEditPo.class, required = true),})
    @ApiOperation(value = "修改视频融合标签", nickname = "updateVideofusion")
    @MyLog(title = "修改视频融合标签", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody VideofusionEditPo videofusionEditPo) {
        Boolean flag = videofusionService.update(videofusionEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

}
