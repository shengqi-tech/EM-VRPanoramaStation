package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.CommonAddPo;
import com.shengqitech.ems.models.po.CommonEditPo;
import com.shengqitech.ems.services.ICommonService;
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
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/common")
@Api(value = "基础标签标签管理", tags = "commonController")
public class CommonController extends BaseController {

    @Autowired
    private ICommonService commonService;

    @ApiImplicitParams({@ApiImplicitParam(name = "commonAddPo", value = "添加基础标签标签PO类", dataTypeClass = CommonAddPo.class, required = true),})
    @ApiOperation(value = "新增基础标签标签", nickname = "insertCommon")
    @MyLog(title = "新增基础标签标签", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody CommonAddPo commonAddPo) {
        Boolean flag = commonService.insert(commonAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
    @ApiImplicitParams({@ApiImplicitParam(name = "commonEditPo", value = "编辑基础标签标签PO类", dataTypeClass = CommonEditPo.class, required = true),})
    @ApiOperation(value = "编辑基础标签标签", nickname = "updateCommon")
    @MyLog(title = "编辑基础标签标签", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody CommonEditPo commonEditPo) {
        Boolean flag = commonService.update(commonEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "ems_common_id", value = "基础标签标签id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "删除基础标签标签", nickname = "deleteCommon")
    @MyLog(title = "删除基础标签标签", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_common_id) {
        Boolean flag = commonService.delete(ems_common_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
}
