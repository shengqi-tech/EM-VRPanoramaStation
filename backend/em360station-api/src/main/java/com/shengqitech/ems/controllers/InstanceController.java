package com.shengqitech.ems.controllers;

import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.common.constant.Constants;
import com.shengqitech.ems.common.security.service.PermissionService;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.mappers.SysfileMapper;
import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.InstanceAddPo;
import com.shengqitech.ems.models.vo.InstanceVo;
import com.shengqitech.ems.services.IDeviceAlarmService;
import com.shengqitech.ems.services.IInstanceService;
import com.shengqitech.ems.system.config.ProjectConfig;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.system.utils.file.FileUploadUtils;
import com.shengqitech.ems.system.utils.file.MimeTypeUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.ArrayUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author : wsh
 * @Date : 2023/6/8
 * @Description: 检测站点信息管理
 */
@RestController
@RequestMapping("/instance")
@Api(value = "检测站点信息管理", tags = "instanceController")
public class InstanceController extends BaseController {

    @Autowired
    private IInstanceService instanceService;
    @Autowired
    private IDeviceAlarmService deviceAlarmService;
    @Autowired
    private SysfileMapper sysfileMapper;

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_instance_id", value = "检测站点id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "nameOrNo", value = "检测站点名称或编号", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_instance_csolutionid", value = "解决方案id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_instance_starttime", value = "安装开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_instance_endtime", value = "安装结束时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_instance_sceneid", value = "场景id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_instance_sectionid", value = " 断面/点位编号", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_instance_ishobby", value = "是否个人爱好", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_instance_isshare", value = "是否开放共享", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_instance_activities", value = "检测活动数组", dataTypeClass = Integer.class, required = false, allowMultiple = true),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "根据条件查询检测站点，没有就查询全部", nickname = "findInstanceByMap")
    @MyLog(title = "根据条件查询检测站点，没有就查询全部", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<List<InstanceVo>>> findByMap(Integer ems_instance_id, String nameOrNo, Integer ems_instance_csolutionid, Date ems_instance_starttime,
                                                              Date ems_instance_endtime, Integer ems_instance_sceneid, Integer ems_instance_sectionid, Integer ems_instance_ishobby, Integer ems_instance_isshare, Integer[] ems_instance_activities) {
        HashMap<String, Object> map = new HashMap<>();
        if (ems_instance_id != null) {
            map.put("ems_instance_id", ems_instance_id);
        }
        if (!StringUtils.isEmpty(nameOrNo)) {
            map.put("nameOrNo", nameOrNo);
        }
        if (ems_instance_csolutionid != null) {
            map.put("ems_instance_csolutionid", ems_instance_csolutionid);
        }
        if (ems_instance_starttime != null) {
            map.put("ems_instance_starttime", ems_instance_starttime);
        }
        if (ems_instance_endtime != null) {
            map.put("ems_instance_endtime", ems_instance_endtime);
        }
        if (ems_instance_sceneid != null) {
            map.put("ems_instance_sceneid", ems_instance_sceneid);
        }
        if (ems_instance_sectionid != null) {
            map.put("ems_instance_sectionid", ems_instance_sectionid);
        }
        if (ems_instance_ishobby != null) {
            map.put("ems_instance_ishobby", ems_instance_ishobby);
        }
        if (ems_instance_isshare != null) {
            map.put("ems_instance_isshare", ems_instance_isshare);
        }
        if (ArrayUtils.isNotEmpty(ems_instance_activities)) {
            map.put("ems_instance_activities", ems_instance_activities);
        }
        startPage();
        List<InstanceVo> instanceVos = instanceService.findByMap(map);
        TableDataInfo<InstanceVo> dataTable = getDataTable(instanceVos);
        List<InstanceVo> list = dataTable.getList();
        list = list.stream().map(instanceVo -> {
            boolean isExsit = deviceAlarmService.isExsitDeviceAlarmByInstanceId(instanceVo.getEms_instance_id());
            instanceVo.setEms_instance_isalarm(isExsit);
            Sysfile sysfile = sysfileMapper.selectByFileId(instanceVo.getEms_instance_picfileid());
            instanceVo.setEms_instance_picfile(sysfile);
            return instanceVo;
        }).collect(Collectors.toList());
        dataTable.setList(list);
        return WrapMapper.ok(getDataTable(instanceVos));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "instanceAddPo", value = "添加监测站点PO类", dataTypeClass = InstanceAddPo.class, required = true),
    })
    @ApiOperation(value = "添加监测站点", nickname = "insertInstance")
    @MyLog(title = "添加监测站点", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody InstanceAddPo instanceAddPo) {
        Boolean flag = instanceService.insert(instanceAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "模板封面", dataTypeClass = MultipartFile.class, required = true),
            @ApiImplicitParam(name = "ems_instance_id", value = "站点id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "ems_instance_globeconf", value = "全景全局设置", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "isHobby", value = "是否保存个人喜欢(0:否,1:是)", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "保存自定义模板", nickname = "setHobby")
    @MyLog(title = "保存自定义模板", businessType = BusinessType.OTHER)
    @PostMapping("/saveTemplate")
    public Wrapper saveTemplate(@RequestPart("file") MultipartFile file, Integer ems_instance_id, String ems_instance_globeconf, Integer isHobby) {
        String coverPath = "";
        try {
            coverPath = FileUploadUtils.upload(ProjectConfig.getInstanceUploadPath(), file, MimeTypeUtils.DEFAULT_ALLOWED_EXTENSION);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        JSONObject jsonObject = JSONObject.parseObject(ems_instance_globeconf);
        jsonObject.put("cover", coverPath);
        String globeconf = jsonObject.toJSONString();

        Boolean flag = instanceService.saveTemplate(ems_instance_id, globeconf, isHobby);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @PostMapping("/sync")
    public Wrapper sync(@RequestBody List<Instance> instances) {
        Boolean flag = instanceService.sync(instances);
        return WrapMapper.ok();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_instance_id", value = "站房id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "ems_instance_isshare", value = "开发状态(0:不开饭,1:开放)", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "设置是否开放", nickname = "setHare")
    @MyLog(title = "设置是否开放", businessType = BusinessType.OTHER)
    @PostMapping("/setHare")
    public Wrapper setHare(Integer ems_instance_id, Integer ems_instance_isshare) {
        Boolean flag = instanceService.setHare(ems_instance_id, ems_instance_isshare);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiOperation(value = "上传监测站点文件", nickname = "uploadInstanceFile")
    @MyLog(title = "上传监测站点文件", businessType = BusinessType.OTHER)
    @PostMapping("/upload")
    public Wrapper<Sysfile> upload(@RequestPart("file") MultipartFile file) {
        return super.upload(file, ProjectConfig.getInstanceUploadPath(), null);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_sysuser_id", value = "用户id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询已分配用户的监测站点", nickname = "findAssignInstance")
    @MyLog(title = "查询已分配用户的监测站点", businessType = BusinessType.SELECT)
    @GetMapping("findAssignInstance")
    public Wrapper<TableDataInfo<InstanceVo>> findAssignInstance(Integer ems_sysuser_id){
        startPage();
        List<InstanceVo> instanceVos = instanceService.findAssignInstance(ems_sysuser_id);
        if (instanceVos.size() == 0){
            return WrapMapper.ok(getDataTable(instanceVos));
        }
        TableDataInfo<InstanceVo> dataTable = getDataTable(instanceVos);
        List<InstanceVo> list = dataTable.getList();
        list = list.stream().map(instanceVo -> {
            boolean isExsit = deviceAlarmService.isExsitDeviceAlarmByInstanceId(instanceVo.getEms_instance_id());
            instanceVo.setEms_instance_isalarm(isExsit);
            Sysfile sysfile = sysfileMapper.selectByFileId(instanceVo.getEms_instance_picfileid());
            instanceVo.setEms_instance_picfile(sysfile);
            return instanceVo;
        }).collect(Collectors.toList());
        dataTable.setList(list);
        return WrapMapper.ok(getDataTable(instanceVos));
    }
}
