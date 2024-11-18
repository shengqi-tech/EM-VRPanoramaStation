package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Device;
import com.shengqitech.ems.models.domains.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/2/3
 * @Description: 热点绑定设备VO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "DeviceCommonVo", description = "热点绑定设备VO")
public class DeviceCommonVo extends Device {

    @ApiModelProperty("产品")
    private Product product;


}
