package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.domains.Lookpoint;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/1/2
 * @Description: 新增导览PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "GuideAddPo", description = "新增导览PO类")
public class GuideAddPo implements Serializable {
    private static final long serialVersionUID = 1L;


    @ApiModelProperty(value = "导览点名称",required = false)
    private String ems_guide_name;

    @ApiModelProperty(value = "导览点简介",required = false)
    private String ems_guide_intr;

    @ApiModelProperty(value = "监测站站点id",required = true)
    private Integer ems_guide_instanceid;

    @ApiModelProperty(value = "全景图id",required = true)
    private Integer ems_guide_panoramaid;

    @ApiModelProperty(value = "排序",required = false)
    private Double ems_guide_sort;
    @ApiModelProperty(value = "封面文件对象",required = false)
    private Sysfile ems_guide_coverfile;

    @ApiModelProperty(value = "json数据")
    private String ems_guide_jsondata;

    @ApiModelProperty(value = "看点list",required = true)
    private List<Lookpoint> lookpointList;


}
