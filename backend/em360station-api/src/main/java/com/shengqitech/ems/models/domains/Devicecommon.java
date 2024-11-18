package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Devicecommon对象", description = "")
public class Devicecommon implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "设备基础标签表")
    private Integer ems_devicecommon_id;

    @ApiModelProperty(value = "设备id")
    private Integer ems_devicecommon_deviceid;

    @ApiModelProperty(value = "基础标签id")
    private Integer ems_devicecommon_commonid;
}
