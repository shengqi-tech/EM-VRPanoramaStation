package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.NavigationAddPo;
import com.shengqitech.ems.models.po.NavigationEditPo;
import com.shengqitech.ems.services.INavigationService;
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
@RequestMapping("/navigation")
@Api(value = "导航标签管理", tags = "navigationController")
public class NavigationController extends BaseController {

    @Autowired
    private INavigationService navigationService;

    @ApiImplicitParams({@ApiImplicitParam(name = "navigationAddPo", value = "新增导航标签PO类", dataTypeClass = NavigationAddPo.class, required = true),})
    @ApiOperation(value = "新增导航标签", nickname = "insertNavigation")
    @MyLog(title = "新增导航标签", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody NavigationAddPo navigationAddPo) {
        Boolean flag = navigationService.insert(navigationAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
    @ApiImplicitParams({@ApiImplicitParam(name = "htmlEditPo", value = "编辑导航标签PO类", dataTypeClass = NavigationEditPo.class, required = true),})
    @ApiOperation(value = "编辑导航标签", nickname = "updateNavigation")
    @MyLog(title = "编辑导航标签", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody NavigationEditPo navigationEditPo) {
        Boolean flag = navigationService.update(navigationEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "ems_navigation_id", value = "导航标签id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "删除导航标签", nickname = "deleteNavigation")
    @MyLog(title = "删除导航标签", businessType = BusinessType.DELETE)
    @PostMapping("/delete")
    public Wrapper delete(Integer ems_navigation_id) {
        Boolean flag = navigationService.delete(ems_navigation_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

}
