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
@ApiModel(value = "Install对象", description = "")
public class Install implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "设备安装表")
    private Integer ems_install_id;

    @ApiModelProperty(value = "安装时间")
    private Date ems_install_time;

    @ApiModelProperty(value = "监测站id")
    private Integer ems_install_instanceid;

    @ApiModelProperty(value = "设备id")
    private Integer ems_install_deviceid;

    @ApiModelProperty(value = "方案产品id")
    private Integer ems_install_csolutionproductid;
}
