package com.shengqitech.ems.controllers;

import com.github.pagehelper.PageInfo;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.services.ISysfileService;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.PageUtils;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.system.utils.file.FileUploadUtils;
import com.shengqitech.ems.system.utils.file.MimeTypeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/5/14
 * @Description: 控制层基类
 */
@Component
public class BaseController<T> {

    @Autowired
    private ISysfileService sysfileService;

    /**
     * 设置请求分页数据
     */
    protected void startPage() {
        PageUtils.startPage();
    }

    /**
     * 响应请求分页数据
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    protected TableDataInfo<T> getDataTable(List<T> list) {
        TableDataInfo rspData = new TableDataInfo(list);
//        rspData.setList(list);
        rspData.setTotal(new PageInfo(list).getTotal());
        return rspData;
    }

    /**
     * 响应请求分页数据(用于分页查询后还需要对list调整的方法)
     */
    @SuppressWarnings({"rawtypes", "unchecked"})
    protected TableDataInfo<T> getDataTable(PageInfo<T> pageInfo) {
        TableDataInfo rspData = new TableDataInfo(pageInfo.getList());
//        rspData.setList(list);
        rspData.setTotal(pageInfo.getTotal());
        return rspData;
    }

    /**
     * 文件上传
     *
     * @param file 文件
     * @return
     * @throws Exception
     */
    protected Wrapper upload(@RequestPart("file") MultipartFile file, String filePath, String type) {
        try {
            if (!file.isEmpty()) {
                System.out.println("filePath" + filePath);
                String modelfilePath = FileUploadUtils.upload(filePath, file, MimeTypeUtils.DEFAULT_ALLOWED_EXTENSION);
                Sysfile sysfile = new Sysfile();
                if (!StringUtils.isEmpty(type)){// 如果为空
                    sysfile.setEms_sysfile_type(type);
                }else {// 取文件后缀
                    sysfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                }
                sysfile.setEms_sysfile_path(modelfilePath);
                sysfile.setEms_sysfile_name(file.getOriginalFilename());
                sysfile.setEms_sysfile_size(file.getSize());
                sysfile.setEms_sysfile_suffix(FileUploadUtils.getExtension(file));
                Boolean flag = sysfileService.insert(sysfile);
                if (flag) {
                    return WrapMapper.ok(sysfile);
                }
            }
            return WrapMapper.error();
        } catch (Exception e) {
            return WrapMapper.error(e.getMessage());
        }
    }


}
