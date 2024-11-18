package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/11/27
 * @Description: 全景详情VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "PanoramaViewVo", description = "全景详情VO类")
public class PanoramaViewVo extends PanoramaVo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 基础标签
     */
    @ApiModelProperty("基础标签")
    private List<CommonVo> ems_panorama_commonvos;
    /**
     * 导航标签
     */
    @ApiModelProperty("导航标签")
    private List<NavigationVo> ems_panorama_navigationvos;
    /**
     * 网页标签
     */
    @ApiModelProperty("网页标签")
    private List<HtmlVo> ems_panorama_htmlvos;
    /**
     * 视频融合标签
     */
    @ApiModelProperty("视频融合标签")
    private List<VideofusionVo> ems_panorama_videofusionvos;

    /**
     * 全景切片文件列表(1张原图+6张一级切片图+24张二级切片图)
     */
    @ApiModelProperty("全景切片文件列表(1张原图+6张一级切片图+24张二级切片图)")
    private List<Sysfile> ems_panorama_slicefiles;

    /**
     * 所属站房对象
     */
    @ApiModelProperty("所属站房对象")
    private Instance ems_panorama_instance;

}
