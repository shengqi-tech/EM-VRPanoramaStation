package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.PanoramaAddPo;
import com.shengqitech.ems.models.po.PanoramaEditPo;
import com.shengqitech.ems.models.vo.PanoramaViewVo;
import com.shengqitech.ems.models.vo.PanoramaVo;
import com.shengqitech.ems.services.IPanoramaService;
import com.shengqitech.ems.services.ISysfileService;
import com.shengqitech.ems.system.config.ProjectConfig;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.DateUtils;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.system.utils.file.FileUploadUtils;
import com.shengqitech.ems.system.utils.file.MimeTypeUtils;
import com.shengqitech.ems.system.utils.uuid.Seq;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import nu.pattern.OpenCV;
import org.apache.commons.io.FilenameUtils;
import org.opencv.core.*;
import org.opencv.imgcodecs.Imgcodecs;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.multipart.MultipartFile;

import java.util.*;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/panorama")
@Api(value = "全景管理", tags = "panoramaController")
public class PanoramaController extends BaseController {

    @Autowired
    private IPanoramaService panoramaService;

    @Autowired
    private ISysfileService sysfileService;

    @ApiImplicitParams({@ApiImplicitParam(name = "panoramaAddPo", value = "添加全景场景PO类", dataTypeClass = PanoramaAddPo.class, required = true),})
    @ApiOperation(value = "新增全景场景", nickname = "insertPanorama")
    @MyLog(title = "新增全景场景", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody PanoramaAddPo panoramaAddPo) {
        Boolean flag = panoramaService.insert(panoramaAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {@ApiImplicitParam(name = "panoramaEditPo", value = "添加全景场景PO类", dataTypeClass = PanoramaEditPo.class, required = true),})
    @ApiOperation(value = "修改全景场景", nickname = "updatePanorama")
    @MyLog(title = "修改全景场景", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody PanoramaEditPo panoramaEditPo) {
        Boolean flag = panoramaService.update(panoramaEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_panorama_id", value = "全景id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_panorama_name", value = "全景名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_panorama_level", value = "楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角)", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_panorama_instanceid", value = "检测站id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_panorama_starttime", value = "创建开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_panorama_endtime", value = "创建结束时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询全景场景", nickname = "findPanoramaByMap")
    @MyLog(title = "查询全景场景", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<PanoramaViewVo>> findByMap(Integer ems_panorama_id, String ems_panorama_name, Integer ems_panorama_level, Integer ems_panorama_instanceid, Date ems_panorama_starttime, Date ems_panorama_endtime) {
        Map<String, Object> map = new HashMap<>();
        if (ems_panorama_id != null) {
            map.put("ems_panorama_id", ems_panorama_id);
        }
        if (!StringUtils.isNull(ems_panorama_name)) {
            map.put("ems_panorama_name", ems_panorama_name);
        }
        if (ems_panorama_level != null) {
            map.put("ems_panorama_level", ems_panorama_level);
        }
        if (ems_panorama_instanceid != null) {
            map.put("ems_panorama_instanceid", ems_panorama_instanceid);
        }
        if (ems_panorama_starttime != null) {
            map.put("ems_panorama_starttime", ems_panorama_starttime);
        }
        if (ems_panorama_endtime != null) {
            map.put("ems_panorama_endtime", ems_panorama_endtime);
        }
        startPage();
        List<PanoramaViewVo> panoramaVos = panoramaService.findByMap(map);
        return WrapMapper.ok(getDataTable(panoramaVos));
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_panorama_id", value = "全景id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "查询全景场景详情", nickname = "getPanoramaView")
    @MyLog(title = "查询全景场景详情", businessType = BusinessType.SELECT)
    @GetMapping("/getView")
    public Wrapper<PanoramaViewVo> getView(Integer ems_panorama_id) {
        PanoramaViewVo panoramaViewVo = panoramaService.getView(ems_panorama_id);
        return WrapMapper.ok(panoramaViewVo);
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_panorama_id", value = "全景id", dataTypeClass = Integer.class, required = true)
    })
    @ApiOperation(value = "删除全景", nickname = "deletePanorama")
    @MyLog(title = "删除全景", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_panorama_id) {
        Boolean flag = panoramaService.delete(ems_panorama_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_panorama_id", value = "全景id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "ems_instance_id", value = "监测站id", dataTypeClass = Integer.class, required = true)
    })
    @ApiOperation(value = "设置起始页", nickname = "setHomePage")
    @MyLog(title = "设置起始页", businessType = BusinessType.OTHER)
    @GetMapping("/setHomePage")
    public Wrapper setHomePage(Integer ems_panorama_id, Integer ems_instance_id) {
        Boolean flag = panoramaService.setHomePage(ems_panorama_id, ems_instance_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "sortId", value = "需要排序的全景id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "id", value = "被插队的全景id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "全景排序", nickname = "sort")
    @MyLog(title = "全景排序", businessType = BusinessType.OTHER)
    @GetMapping("/sort")
    public Wrapper sort(Integer sortId, Integer id) {
        Boolean flag = panoramaService.sort(sortId, id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiOperation(value = "上传全景场景文件", nickname = "uploadPanoramaFile")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "文件对象", dataTypeClass = MultipartFile.class, required = true),
    })
    @MyLog(title = "上传全景场景文件", businessType = BusinessType.OTHER)
    @PostMapping("/upload")
    public Wrapper<Sysfile> upload(@RequestPart("file") MultipartFile file) {
        return super.upload(file, ProjectConfig.getPanoramaUploadPath(), null);
    }

    @ApiOperation(value = "上传全景封面", nickname = "uploadCover")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "file", value = "文件对象", dataTypeClass = MultipartFile.class, required = true),
    })
    @MyLog(title = "上传全景封面", businessType = BusinessType.OTHER)
    @PostMapping("/uploadCover")
    public Wrapper<Sysfile> uploadCover(@RequestPart("file") MultipartFile file) {
        Sysfile sysfile = new Sysfile();
        try {
            String filePath = ProjectConfig.getPanoramaUploadPath();
            // 不带后缀的名称
            String fileNameWithoutExtension = FileUploadUtils.getFileNameWithoutExtension(file);
            // 切割的图
            Mat mat = convert(file);
            // 设置 JPEG 压缩参数
            MatOfInt params = new MatOfInt(Imgcodecs.IMWRITE_JPEG_QUALITY, 80); // 设置压缩质量为 80

            String absPath = StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                    FilenameUtils.getBaseName(fileNameWithoutExtension), Seq.getId(Seq.uploadSeqType), "jpg");
            String path = FileUploadUtils.getAbsoluteFile(filePath, absPath).getAbsolutePath();

            boolean flag = Imgcodecs.imwrite(path, mat, params);
            if (flag) {
                sysfile.setEms_sysfile_path("/panorama/" + absPath);
                sysfile.setEms_sysfile_name(fileNameWithoutExtension);
                sysfile.setEms_sysfile_size(file.getSize());
                sysfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                sysfile.setEms_sysfile_suffix(file.getOriginalFilename());
                sysfileService.insert(sysfile);
            }
        } catch (Exception e) {
            return WrapMapper.error(e.getMessage());
        }
        return WrapMapper.ok(sysfile);
    }

    @ApiOperation(value = "批量上传全景场景文件", nickname = "batchUploadPanoramaFile")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "files", value = "文件", dataTypeClass = MultipartFile.class, allowMultiple = true, required = true),
    })
    @MyLog(title = "批量上传全景场景文件", businessType = BusinessType.OTHER)
    @PostMapping("/batchUpload")
    public Wrapper<List<Sysfile>> batchUpload(@RequestPart("file") List<MultipartFile> files) {
        try {
            List<Sysfile> result = new ArrayList<>();
            String filePath = ProjectConfig.getPanoramaUploadPath();
            if (files.size() != 0) {

                for (int i = 0; i < files.size(); i++) {
                    MultipartFile file = files.get(i);
                    // 不带后缀的名称
                    String fileNameWithoutExtension = FileUploadUtils.getFileNameWithoutExtension(file);
                    if (i == 0) {
                        // 原图
                        String modelfilePath = FileUploadUtils.upload(filePath, file, MimeTypeUtils.DEFAULT_ALLOWED_EXTENSION);
                        Sysfile pfile = new Sysfile();
                        pfile.setEms_sysfile_path(modelfilePath);
                        pfile.setEms_sysfile_name(fileNameWithoutExtension);
                        pfile.setEms_sysfile_size(file.getSize());
                        pfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                        pfile.setEms_sysfile_suffix(file.getOriginalFilename());
                        sysfileService.insert(pfile);
                        result.add(pfile);
                        continue;
                    }


                    // 切割的图
                    Mat mat = convert(file);
                    // 设置 JPEG 压缩参数
                    MatOfInt params = new MatOfInt(Imgcodecs.IMWRITE_JPEG_QUALITY, 80); // 设置压缩质量为 80

                    String absPath = StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                            FilenameUtils.getBaseName(fileNameWithoutExtension), Seq.getId(Seq.uploadSeqType), "jpg");
                    String path = FileUploadUtils.getAbsoluteFile(filePath, absPath).getAbsolutePath();

                    boolean flag = Imgcodecs.imwrite(path, mat, params);
                    if (flag) {
                        Sysfile sysfile = new Sysfile();
                        sysfile.setEms_sysfile_path("/panorama/" + absPath);
                        sysfile.setEms_sysfile_name(fileNameWithoutExtension);
                        sysfile.setEms_sysfile_size(file.getSize());
                        sysfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                        sysfile.setEms_sysfile_suffix(file.getOriginalFilename());
                        sysfileService.insert(sysfile);
                        result.add(sysfile);

                        // 获取图像尺寸
                        int imageWidth = mat.width();
                        int imageHeight = mat.height();

                        // 计算切割后的子图像尺寸
                        int subImageWidth = imageWidth / 2;
                        int subImageHeight = imageHeight / 2;

                        // 切割并保存子图像
                        Mat subImage1 = new Mat(mat, new Rect(0, 0, subImageWidth, subImageHeight));
                        path = StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                                FilenameUtils.getBaseName(fileNameWithoutExtension + "1"), Seq.getId(Seq.uploadSeqType), "jpg");
                        absPath = FileUploadUtils.getAbsoluteFile(filePath, path).getAbsolutePath();
                        boolean f = Imgcodecs.imwrite(absPath, subImage1);
                        if (f) {
                            Sysfile sfile = new Sysfile();
                            sfile.setEms_sysfile_path("/panorama/" + path);
                            sfile.setEms_sysfile_name(fileNameWithoutExtension + "-1");
                            sfile.setEms_sysfile_size(file.getSize());
                            sfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                            sfile.setEms_sysfile_suffix(file.getOriginalFilename());
                            sysfileService.insert(sfile);
                            result.add(sfile);
                        }

                        Mat subImage2 = new Mat(mat, new Rect(subImageWidth, 0, subImageWidth, subImageHeight));
                        path = StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                                FilenameUtils.getBaseName(fileNameWithoutExtension + "2"), Seq.getId(Seq.uploadSeqType), "jpg");
                        absPath = FileUploadUtils.getAbsoluteFile(filePath, path).getAbsolutePath();
                        f = Imgcodecs.imwrite(absPath, subImage2);
                        if (f) {
                            Sysfile sfile = new Sysfile();
                            sfile.setEms_sysfile_path("/panorama/" + path);
                            sfile.setEms_sysfile_name(fileNameWithoutExtension + "-2");
                            sfile.setEms_sysfile_size(file.getSize());
                            sfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                            sfile.setEms_sysfile_suffix(file.getOriginalFilename());
                            sysfileService.insert(sfile);
                            result.add(sfile);
                        }

                        Mat subImage3 = new Mat(mat, new Rect(0, subImageHeight, subImageWidth, subImageHeight));
                        path = StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                                FilenameUtils.getBaseName(fileNameWithoutExtension + "3"), Seq.getId(Seq.uploadSeqType), "jpg");
                        absPath = FileUploadUtils.getAbsoluteFile(filePath, path).getAbsolutePath();
                        f = Imgcodecs.imwrite(absPath, subImage3);
                        if (f) {
                            Sysfile sfile = new Sysfile();
                            sfile.setEms_sysfile_path("/panorama/" + path);
                            sfile.setEms_sysfile_name(fileNameWithoutExtension + "-3");
                            sfile.setEms_sysfile_size(file.getSize());
                            sfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                            sfile.setEms_sysfile_suffix(file.getOriginalFilename());
                            sysfileService.insert(sfile);
                            result.add(sfile);
                        }

                        Mat subImage4 = new Mat(mat, new Rect(subImageWidth, subImageHeight, subImageWidth, subImageHeight));
                        path = StringUtils.format("{}/{}_{}.{}", DateUtils.datePath(),
                                FilenameUtils.getBaseName(fileNameWithoutExtension + "4"), Seq.getId(Seq.uploadSeqType), "jpg");
                        absPath = FileUploadUtils.getAbsoluteFile(filePath, path).getAbsolutePath();
                        f = Imgcodecs.imwrite(absPath, subImage4);
                        if (f) {
                            Sysfile sfile = new Sysfile();
                            sfile.setEms_sysfile_path("/panorama/" + path);
                            sfile.setEms_sysfile_name(fileNameWithoutExtension + "-4");
                            sfile.setEms_sysfile_size(file.getSize());
                            sfile.setEms_sysfile_type(FileUploadUtils.getExtension(file));
                            sfile.setEms_sysfile_suffix(file.getOriginalFilename());
                            sysfileService.insert(sfile);
                            result.add(sfile);
                        }
                    }
                }

            }
            return WrapMapper.ok(result);
        } catch (Exception e) {
            return WrapMapper.error(e.getMessage());
        }
    }

    /**
     * MultipartFile 转 Mat
     *
     * @param file
     * @return
     */

    private Mat convert(MultipartFile file) {
        // 加载 OpenCV 库
        OpenCV.loadShared();
        try {
            // 将MultipartFile转换为字节数组
            byte[] data = file.getBytes();

            // 创建MatOfByte对象并将字节数组赋值给它
            MatOfByte matOfByte = new MatOfByte(data);

            // 使用imdecode函数将字节数组转换为Mat对象
            Mat mat = Imgcodecs.imdecode(matOfByte, Imgcodecs.IMREAD_UNCHANGED);

            // 确保Mat对象已成功创建
            if (mat.empty()) {
                throw new Exception("Failed to convert MultipartFile to Mat.");
            }

            // 如果图像是彩色图像，则将其转换为BGR颜色空间
//            if (mat.channels() > 1) {
//                Mat convertedMat = new Mat();
//                Imgproc.cvtColor(mat, convertedMat, Imgproc.COLOR_BGR2BGRA);
//                mat = convertedMat;
//            }

            return mat;
        } catch (Exception e) {
            // 处理转换过程中的异常
            e.printStackTrace();
            return null;
        }
    }

}
