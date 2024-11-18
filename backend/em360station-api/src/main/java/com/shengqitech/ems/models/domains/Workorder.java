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
@ApiModel(value = "Workorder对象", description = "")
public class Workorder implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "运维工单表")
    private Integer ems_workorder_id;

    @ApiModelProperty(value = "工单号")
    private String ems_workorder_no;

    @ApiModelProperty(value = "监测站id")
    private Integer ems_workorder_instanceid;

    @ApiModelProperty(value = "要求开始时间")
    private Date ems_workorder_starttime;

    @ApiModelProperty(value = "要求结束时间")
    private Date ems_workorder_endtime;
}
