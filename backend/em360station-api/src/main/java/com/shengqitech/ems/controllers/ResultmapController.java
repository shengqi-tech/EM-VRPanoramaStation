package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.ResultmapAddPo;
import com.shengqitech.ems.models.po.ResultmapEditPo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.*;
import com.shengqitech.ems.services.IResultmapService;
import org.springframework.beans.factory.annotation.Autowired;

/**
 * <p>
 *  结果映射表管理
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
@RestController
@RequestMapping("/resultmap")
@Api(value = "结果映射表管理", tags = "resultmapController")
public class ResultmapController extends BaseController {


    @Autowired
    private IResultmapService iResultmapService;

    @ApiImplicitParams({@ApiImplicitParam(name = "resultmapAddPo", value = "新增结果映射表PO类", dataTypeClass = ResultmapAddPo.class, required = true),})
    @ApiOperation(value = "新增结果映射", nickname = "insertResultmap")
    @MyLog(title = "新增结果映射", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody ResultmapAddPo resultmapAddPo) {
        Boolean flag = iResultmapService.insert(resultmapAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "resultmapEditPo", value = "编辑结果映射表PO类", dataTypeClass = ResultmapEditPo.class, required = true),})
    @ApiOperation(value = "编辑结果映射表", nickname = "updateResultmap")
    @MyLog(title = "编辑结果映射表", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody ResultmapEditPo resultmapEditPo) {
        Boolean flag = iResultmapService.update(resultmapEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "ems_resultmap_id", value = "结果映射表id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "删除结果映射表", nickname = "deleteParams")
    @MyLog(title = "删除结果映射表", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_resultmap_id) {
        Boolean flag = iResultmapService.delete(ems_resultmap_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

}
