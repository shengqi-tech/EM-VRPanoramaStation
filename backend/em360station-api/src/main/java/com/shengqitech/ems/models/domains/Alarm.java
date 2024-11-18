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
@ApiModel(value = "Alarm对象", description = "")
public class Alarm implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "报警表")
    private Integer ems_alarm_id;

    @ApiModelProperty(value = "报警时间")
    private Date ems_alarm_createtime;

    @ApiModelProperty(value = "报警记录值")
    private String ems_alarm_value;

    @ApiModelProperty(value = "报警视频/图片文件附件")
    private Integer ems_alarm_fileid;

    @ApiModelProperty(value = "管控区域id")
    private Integer ems_alarm_spacecontrolid;

    @ApiModelProperty(value = "报警描述")
    private String ems_alarm_desc;

    @ApiModelProperty(value = "封面id")
    private Integer ems_alarm_coverid;
}
