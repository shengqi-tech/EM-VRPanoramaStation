package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.GuideAddPo;
import com.shengqitech.ems.models.po.GuideEditPo;
import com.shengqitech.ems.models.vo.GuideVo;
import com.shengqitech.ems.services.IGuideService;
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
 * @since 2024-01-02
 */
@RestController
@RequestMapping("/guide")
@Api(value = "导览管理", tags = "guideController")
public class GuideController extends BaseController {

    @Autowired
    private IGuideService guideService;

    @ApiImplicitParams({@ApiImplicitParam(name = "guideAddPo", value = "新增导览PO类", dataTypeClass = GuideAddPo.class, required = true),})
    @ApiOperation(value = "新增导览", nickname = "insertGuide")
    @MyLog(title = "新增导览", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody GuideAddPo guideAddPo) {
        Boolean flag = guideService.insert(guideAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "guideEditPo", value = "编辑导览PO类", dataTypeClass = GuideEditPo.class, required = true),})
    @ApiOperation(value = "编辑导览", nickname = "updateGuide")
    @MyLog(title = "编辑导览", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody GuideEditPo guideEditPo) {
        Boolean flag = guideService.update(guideEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_guide_id", value = "导览id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_guide_name", value = "导览名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_guide_instanceid", value = "检测站点id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询导览", nickname = "findGuideByMap")
    @MyLog(title = "查询导览", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<GuideVo>> findByMap(Integer ems_guide_id, String ems_guide_name, Integer ems_guide_instanceid){
        Map<String,Object> map = new HashMap<>();
        if (ems_guide_id != null) {
            map.put("ems_guide_id",ems_guide_id);
        }
        if (!StringUtils.isEmpty(ems_guide_name)){
            map.put("ems_guide_name",ems_guide_name);
        }
        if (ems_guide_instanceid != null) {
            map.put("ems_guide_instanceid",ems_guide_instanceid);
        }
        startPage();
        List<GuideVo> guideVos = guideService.findByMap(map);
        return WrapMapper.ok(getDataTable(guideVos));
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "sortId", value = "需要排序的导览id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "id", value = "被插队的导览id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "导览排序", nickname = "sortGuide")
    @MyLog(title = "导览排序", businessType = BusinessType.OTHER)
    @GetMapping("/sort")
    public Wrapper sort(Integer sortId, Integer id) {
        Boolean flag = guideService.sort(sortId, id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_guide_id", value = "导览id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "删除导览", nickname = "deleteGuide")
    @MyLog(title = "删除导览", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper sort(Integer ems_guide_id) {
        Boolean flag = guideService.delete(ems_guide_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }



    @ApiOperation(value = "上传导览封面文件", nickname = "uploadGuideFile")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "文件对象", dataTypeClass = MultipartFile.class, required = true),
    })
    @MyLog(title = "上传导览封面文件", businessType = BusinessType.OTHER)
    @PostMapping("/upload")
    public Wrapper<Sysfile> upload(@RequestPart("file") MultipartFile file) {
        return super.upload(file, ProjectConfig.getGuideUploadPath(),null);
    }


}

