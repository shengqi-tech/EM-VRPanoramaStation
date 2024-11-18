package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/6/8
 * @Description:
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "InstanceVo", description = "监测站点视图对象")
public class InstanceVo extends Instance {

    @ApiModelProperty("现场图片文件对象")
    private Sysfile ems_instance_picfile;


    @ApiModelProperty("是否存在报警")
    private boolean ems_instance_isalarm;

}
