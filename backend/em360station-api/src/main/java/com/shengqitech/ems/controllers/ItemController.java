package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Item;
import com.shengqitech.ems.models.po.ItemAddPo;
import com.shengqitech.ems.models.po.ItemEditPo;
import com.shengqitech.ems.services.IItemService;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/item")
@Api(value = "菜单项管理", tags = "itemController")
public class ItemController extends BaseController {

    @Autowired
    private IItemService itemService;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "mpi_sysuser_id", value = "用户id", required = true),
    })
    @ApiOperation(value = "根据用户查询菜单项", nickname = "findMenusByUserId")
    @MyLog(title = "根据用户查询菜单项", businessType = BusinessType.SELECT)
    @GetMapping("/findMenusByUserId")
    public Wrapper<List<Item>> findMenusByUserId(Integer mpi_sysuser_id) {
        List<Item> items = itemService.findByUserId(mpi_sysuser_id);
        return WrapMapper.ok(items);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_item_id", value = "菜单id", required = false),
            @ApiImplicitParam(name = "ems_item_parentid", value = "父节点id", required = false),
            @ApiImplicitParam(name = "ems_item_code", value = "菜单标识", required = false),
            @ApiImplicitParam(name = "ems_item_name", value = "菜单名称", required = false),
            @ApiImplicitParam(name = "ems_item_starttime", value = "开始时间", required = false),
            @ApiImplicitParam(name = "ems_item_endtime", value = "结束时间", required = false),
    })
    @ApiOperation(value = "查询菜单项", nickname = "findItemByMap")
    @MyLog(title = "查询菜单项", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<Item>> findByMap(Integer ems_item_id, Integer ems_item_parentid, String ems_item_code, String ems_item_name, Date ems_item_starttime, Date ems_item_endtime) {
        Map<String, Object> map = new HashMap<>();
        if (ems_item_id != null){
            map.put("ems_item_id", ems_item_id);
        }
        if (ems_item_parentid != null){
            map.put("ems_item_parentid", ems_item_parentid);
        }
        if (!StringUtils.isEmpty(ems_item_code)){
            map.put("ems_item_code", ems_item_code);
        }
        if (!StringUtils.isEmpty(ems_item_name)){
            map.put("ems_item_name", ems_item_name);
        }
        if (ems_item_starttime != null){
            map.put("ems_item_starttime", ems_item_starttime);
        }
        if (ems_item_endtime != null){
            map.put("ems_item_endtime", ems_item_endtime);
        }
        List<Item> items = itemService.findByMap(map);
        return WrapMapper.ok(items);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "itemAddPo", value = "新增菜单PO类", dataTypeClass = ItemAddPo.class, required = true),
    })
    @ApiOperation(value = "新增菜单项", nickname = "insertItem")
    @MyLog(title = "新增菜单项", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody ItemAddPo itemAddPo){
        Boolean flag = itemService.insert(itemAddPo);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
    @ApiImplicitParams({
            @ApiImplicitParam(name = "itemEditPo", value = "编辑菜单PO类", dataTypeClass = ItemEditPo.class, required = true),
    })
    @ApiOperation(value = "编辑菜单项", nickname = "updateItem")
    @MyLog(title = "编辑菜单项", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody ItemEditPo itemEditPo){
        Boolean flag = itemService.update(itemEditPo);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "菜单id数组", dataTypeClass = Integer.class, required = true, allowMultiple = true),
    })
    @ApiOperation(value = "删除菜单项", nickname = "deleteItem")
    @MyLog(title = "删除菜单项", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer[] ids){
        Boolean flag = itemService.delete(ids);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

}
