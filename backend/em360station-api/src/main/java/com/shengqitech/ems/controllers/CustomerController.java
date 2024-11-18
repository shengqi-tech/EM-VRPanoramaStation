package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.CustomerAddPo;
import com.shengqitech.ems.models.po.CustomerEditPo;
import com.shengqitech.ems.models.vo.CustomerVo;
import com.shengqitech.ems.services.ICustomerService;
import com.shengqitech.ems.system.config.ProjectConfig;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

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
@RequestMapping("/customer")
@Api(value = "客户管理", tags = "customerController")
public class CustomerController extends BaseController {

    @Autowired
    private ICustomerService customerService;

    @ApiImplicitParams({@ApiImplicitParam(name = "customerAddPo", value = "添加客户PO类", dataTypeClass = CustomerAddPo.class, required = true),})
    @ApiOperation(value = "新增客户", nickname = "insertCustomer")
    @MyLog(title = "新增客户", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper<Integer> insert(@RequestBody CustomerAddPo customerAddPo) {
        Boolean flag = customerService.insert(customerAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "customerEditPo", value = "编辑客户PO类", dataTypeClass = CustomerEditPo.class, required = true),})
    @ApiOperation(value = "编辑客户", nickname = "updateCustomer")
    @MyLog(title = "编辑客户", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody CustomerEditPo customerEditPo) {
        Boolean flag = customerService.update(customerEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_customer_id", value = "客户id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_customer_name", value = "客户名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询客户", nickname = "findCustomerByMap")
    @MyLog(title = "查询客户", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<CustomerVo>> findByMap(Integer ems_customer_id, String ems_customer_name){
        Map<String,Object> map = new HashMap<>();
        if (ems_customer_id != null){
            map.put("ems_customer_id",ems_customer_id);
        }
        if (!StringUtils.isEmpty(ems_customer_name)){
            map.put("ems_customer_name",ems_customer_name);
        }
        startPage();
        List<CustomerVo> customerVos = customerService.findByMap(map);
        return WrapMapper.ok(getDataTable(customerVos));
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "ems_customer_id", value = "客户id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "删除客户", nickname = "deleteCustomer")
    @MyLog(title = "删除客户", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_customer_id){
        Boolean flag = customerService.delete(ems_customer_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }


    @ApiOperation(value = "上传客户文件", nickname = "uploadCustomerLogoFile")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "文件对象", dataTypeClass = MultipartFile.class, required = true),
    })
    @MyLog(title = "上传客户文件", businessType = BusinessType.OTHER)
    @PostMapping("/upload")
    public Wrapper<Sysfile> upload(@RequestPart("file") MultipartFile file) {
        return super.upload(file, ProjectConfig.getCustomerUploadPath(),null);
    }
}
