package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/1/24
 * @Description: 设备同步Dto传输对象
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DeviceSyncDto {
    // 组成名称、产品名称
    private String ems_composition_name;
    // 组成名称、产品名称
    private Integer ems_composition_pid;


    // 产品型号
    private String ems_product_type;

    // 品牌名称
    private String ems_product_brand;

    // 设备名称
    private String ems_device_name;

    // 设备编号
    private String ems_device_no;

    // 站点编号
    private String ems_instance_no;

    // 配置列表
    private List<Configuration> configurations;


}
