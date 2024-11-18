package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Role;
import com.shengqitech.ems.models.po.RoleAddPo;
import com.shengqitech.ems.models.po.RoleEditPo;
import com.shengqitech.ems.models.vo.RoleViewVo;
import com.shengqitech.ems.services.IRoleService;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Slf4j
@RestController
@RequestMapping("/role")
@Api(value = "角色管理", tags = "roleController")
public class RoleController extends BaseController {

    @Autowired
    private IRoleService roleService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_role_id", value = "角色id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_role_tag", value = "角色标识", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_role_name", value = "角色名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_role_starttime", value = "开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_role_endtime", value = "结束时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询角色", nickname = "findRoleByMap")
    @MyLog(title = "查询角色", businessType = BusinessType.SELECT)
    @GetMapping("/role")
    public Wrapper<TableDataInfo<Role>> findByMap(Integer ems_role_id, String ems_role_tag, String ems_role_name, Date ems_role_starttime, Date ems_role_endtime) {
        Map<String, Object> map = new HashMap<>();
        if (ems_role_id != null) {
            map.put("ems_role_id", ems_role_id);
        }
        if (!StringUtils.isEmpty(ems_role_tag)) {
            map.put("ems_role_tag", ems_role_tag);
        }
        if (!StringUtils.isEmpty(ems_role_name)) {
            map.put("ems_role_name", ems_role_name);
        }
        if (ems_role_starttime != null) {
            map.put("ems_role_starttime", ems_role_starttime);
        }
        if (ems_role_endtime != null) {
            map.put("ems_role_endtime", ems_role_endtime);
        }
        startPage();
        List<Role> roles = roleService.findByMap(map);
        return WrapMapper.ok(getDataTable(roles));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_role_id", value = "角色id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "查询角色详情", nickname = "getRoleView")
    @MyLog(title = "查询角色详情", businessType = BusinessType.SELECT)
    @GetMapping("/getView")
    public Wrapper<RoleViewVo> getView(Integer ems_role_id){
        RoleViewVo roleViewVo = roleService.getView(ems_role_id);
        return WrapMapper.ok(roleViewVo);
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "roleAddPo", value = "新增角色PO类", dataTypeClass = RoleAddPo.class, required = true),
    })
    @ApiOperation(value = "新增角色", nickname = "insertRoleByMap")
    @MyLog(title = "新增角色", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody RoleAddPo roleAddPo) {
        Boolean flag = roleService.insert(roleAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "roleEditPo", value = "编辑角色PO类", dataTypeClass = RoleEditPo.class, required = true),
    })
    @ApiOperation(value = "编辑角色", nickname = "updateRoleByMap")
    @MyLog(title = "编辑角色", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody RoleEditPo roleEditPo) {
        Boolean flag = roleService.update(roleEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "角色id数组", dataTypeClass = Integer.class, required = true, allowMultiple = true),
    })
    @ApiOperation(value = "删除角色", nickname = "deleteRole")
    @MyLog(title = "删除角色", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer[] ids) {
        Boolean flag = roleService.delete(ids);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

//    @ApiImplicitParams({
//            @ApiImplicitParam(name = "ems_role_id", value = "角色id", dataTypeClass = Integer.class, required = true),
//            @ApiImplicitParam(name = "ids", value = "角色id数组", dataTypeClass = Integer.class, required = true, allowMultiple = true),
//    })
//    @ApiOperation(value = "分配角色菜单", nickname = "assignItem")
//    @PostMapping("/assignItem")
//    public Wrapper assignItem(Integer ems_role_id, Integer[] ids){
//        Boolean flag = roleService.assignItem(ems_role_id, ids);
//        if (flag){
//            return WrapMapper.ok();
//        }
//        return WrapMapper.error();
//    }

}
