package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.TagtypeAddPo;
import com.shengqitech.ems.models.po.TagtypeEditPo;
import com.shengqitech.ems.models.vo.TagtypeVo;
import com.shengqitech.ems.services.ITagtypeService;
import com.shengqitech.ems.system.config.ProjectConfig;
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
@RequestMapping("/tagtype")
@Api(value = "标签类型管理", tags = "tagtypeController")
public class TagtypeController extends BaseController {

    @Autowired
    private ITagtypeService tagtypeService;

    @ApiImplicitParams({@ApiImplicitParam(name = "tagtypeAddPo", value = "添加标签类型PO类", dataTypeClass = TagtypeAddPo.class, required = true),})
    @ApiOperation(value = "新增标签类型", nickname = "insertTagtype")
    @MyLog(title = "新增标签类型", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody TagtypeAddPo tagtypeAddPo) {
        Boolean flag = tagtypeService.insert(tagtypeAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {@ApiImplicitParam(name = "tagtypeEditPo", value = "编辑标签类型PO类", dataTypeClass = TagtypeEditPo.class, required = true),})
    @ApiOperation(value = "编辑标签类型", nickname = "updateTagtype")
    @MyLog(title = "编辑标签类型", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody TagtypeEditPo tagtypeEditPo) {
        Boolean flag = tagtypeService.update(tagtypeEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_tagtype_id", value = "标签类型id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_tagtype_pid", value = "标签类型pid", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_tagtype_name", value = "标签类型名称", dataTypeClass = String.class, required = false),
    })
    @ApiOperation(value = "查询标签类型", nickname = "findTagtypeByMap")
    @MyLog(title = "查询标签类型", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<TagtypeVo>> findByMap(Integer ems_tagtype_id,Integer ems_tagtype_pid,String ems_tagtype_name) {
        Map<String,Object> map = new HashMap<>();
        if (ems_tagtype_id != null){
            map.put("ems_tagtype_id", ems_tagtype_id);
        }
        if (ems_tagtype_pid != null){
            map.put("ems_tagtype_pid", ems_tagtype_pid);
        }
        if (!StringUtils.isNull(ems_tagtype_name)){
            map.put("ems_tagtype_name", ems_tagtype_name);
        }
        List<TagtypeVo> tagtypes = tagtypeService.findByMap(map);
        return WrapMapper.ok(tagtypes);
    }

    @ApiImplicitParams(value = {@ApiImplicitParam(name = "ems_tagtype_id", value = "标签类型id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "删除标签类型", nickname = "deleteTagtype")
    @MyLog(title = "删除标签类型", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_tagtype_id) {
        Boolean flag = tagtypeService.delete(ems_tagtype_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiOperation(value = "上传标签类型文件", nickname = "uploadTagtype")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "文件对象", dataTypeClass = MultipartFile.class, required = true),
            @ApiImplicitParam(name = "type", value = "文件类型", dataTypeClass = String.class, required = true),
    })
    @MyLog(title = "上传标签类型文件", businessType = BusinessType.OTHER)
    @PostMapping("/upload")
    public Wrapper<Sysfile> upload(@RequestPart("file") MultipartFile file,String type) {
        return super.upload(file, ProjectConfig.getTagtypeUploadPath(),type);
    }

}
