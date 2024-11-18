package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Getter
@Setter
@ApiModel(value = "Spacecontrol对象", description = "")
public class Spacecontrol implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "管控区域表")
    private Integer ems_spacecontrol_id;

    @ApiModelProperty(value = "管控区域名称")
    private String ems_spacecontrol_name;

    @ApiModelProperty(value = "管控区域")
    private String ems_spacecontrol_region;

    @ApiModelProperty(value = "设备id(指摄像头)")
    private Integer ems_spacecontrol_camdeviceid;

    @ApiModelProperty(value = "规则id")
    private Integer ems_spacecontrol_ruleid;

    @ApiModelProperty(value = "关联的管控设备id")
    private Integer ems_spacecontrol_controldeviceid;

    @ApiModelProperty(value = "创建时间")
    private Date ems_spacecontrol_createtime;

    @ApiModelProperty(value = "修改时间")
    private Date ems_spacecontrol_updatetime;

    @ApiModelProperty(value = "管控区域文件id")
    private Integer ems_spacecontrol_fileid;
}
