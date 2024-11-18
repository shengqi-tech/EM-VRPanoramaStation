package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/6/12
 * @Description: 添加监测站点PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "InstanceAddPo", description = "添加监测站点PO类")
public class InstanceAddPo implements Serializable {
    private static final long serialVersionUID = 1L;
    @ApiModelProperty("站点坐标")
    private String ems_instance_coordinate;
    @ApiModelProperty("站点名称")
    private String ems_instance_name;
    @ApiModelProperty("站点编号")
    private String ems_instance_no;
    @ApiModelProperty("解决方案id")
    private Integer ems_instance_csolutionid;
    @ApiModelProperty("场景id")
    private Integer ems_instance_sceneid;
    @ApiModelProperty("现场图片文件对象")
    private Sysfile ems_instance_picfile;
    @ApiModelProperty("监测站的简介")
    private String ems_instance_des;
    @ApiModelProperty("断面/点位编号")
    private Integer ems_instance_sectionid;
    @ApiModelProperty("详细地址")
    private String ems_instance_address;
}
