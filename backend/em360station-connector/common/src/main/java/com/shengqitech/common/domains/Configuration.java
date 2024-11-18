package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2024/1/26
 * @Description: 设备配置
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Configuration {

    // 配置名称
    private String ems_configuration_name;

    // 配置value
    private String ems_configuration_value;

}
