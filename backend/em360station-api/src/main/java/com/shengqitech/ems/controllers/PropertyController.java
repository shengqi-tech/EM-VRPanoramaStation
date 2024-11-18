package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.PropertyAddPo;
import com.shengqitech.ems.models.po.PropertyEditPo;
import com.shengqitech.ems.services.IPropertyService;
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
 * @author 
 * @since 2024-01-31
 */
@RestController
@RequestMapping("/property")
@Api(value = "产品属性管理", tags = "propertyController")
public class PropertyController extends BaseController {

    @Autowired
    private IPropertyService propertyService;

    @ApiImplicitParams({@ApiImplicitParam(name = "propertyAddPo", value = "新增网页标签PO类", dataTypeClass = PropertyAddPo.class, required = true),})
    @ApiOperation(value = "新增产品属性", nickname = "insertProperty")
    @MyLog(title = "新增产品属性", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody PropertyAddPo propertyAddPo) {
        Boolean flag = propertyService.insert(propertyAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
    @ApiImplicitParams({@ApiImplicitParam(name = "propertyEditPo", value = "编辑产品属性PO类", dataTypeClass = PropertyEditPo.class, required = true),})
    @ApiOperation(value = "编辑产品属性", nickname = "updateProperty")
    @MyLog(title = "编辑产品属性", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody PropertyEditPo propertyEditPo) {
        Boolean flag = propertyService.update(propertyEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_propery_id", value = "产品属性id", dataTypeClass = Integer.class, required = true)
    })
    @ApiOperation(value = "删除产品属性", nickname = "deletePropery")
    @MyLog(title = "删除产品属性", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_propery_id){
        Boolean flag = propertyService.delete(ems_propery_id);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }



}
