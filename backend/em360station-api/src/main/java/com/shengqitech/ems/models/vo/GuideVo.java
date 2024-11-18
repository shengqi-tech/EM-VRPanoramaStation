package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Guide;
import com.shengqitech.ems.models.domains.Lookpoint;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/1/3
 * @Description: 导览VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "GuideVo", description = "导览VO类")
public class GuideVo extends Guide {

    @ApiModelProperty(value = "导览封面文件对象")
    private Sysfile ems_guide_coverfile;
    @ApiModelProperty(value = "看点list")
    private List<Lookpoint> ems_guide_lookpoints;
    @ApiModelProperty(value = "全景名称")
    private String ems_guide_panoramaname;


}
