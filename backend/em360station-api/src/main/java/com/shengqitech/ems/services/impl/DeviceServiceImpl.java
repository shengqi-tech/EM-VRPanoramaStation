package com.shengqitech.ems.services.impl;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.mappers.*;
import com.shengqitech.ems.models.domains.*;
import com.shengqitech.ems.models.vo.DeviceVo;
import com.shengqitech.ems.services.IDeviceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class DeviceServiceImpl implements IDeviceService {

    @Autowired
    private CompositionMapper compositionMapper;
    @Autowired
    private ProductMapper productMapper;

    @Autowired
    private VersionMapper versionMapper;
    @Autowired
    private DeviceMapper deviceMapper;

    @Autowired
    private InstanceMapper instanceMapper;

    @Autowired
    private ConfigurationMapper configurationMapper;

    @Autowired
    private InstallconfigurationMapper installconfigurationMapper;

    @Autowired
    private ModuleMapper moduleMapper;

    @Override
    public Boolean sync(JSONArray jsonArray) {
        Date now = new Date();
        for (int i = 0; i < jsonArray.size(); i++) {
            JSONObject json = jsonArray.getJSONObject(i);
            String emsCompositionName = json.getString("ems_composition_name");
            Integer emsCompositionPid = json.getInteger("ems_composition_pid");
            String emsProductType = json.getString("ems_product_type");
            String emsProductBrand = json.getString("ems_product_brand");
            String emsDeviceNo = json.getString("ems_device_no");
            String emsInstanceNo = json.getString("ems_instance_no");
            JSONArray configurations = json.getJSONArray("configurations");
            if ("WZZ_SXFQZ".equals(emsInstanceNo)){
                System.out.println();
            }

            Composition composition = getOrCreateComposition(emsCompositionName, emsCompositionPid);
            Version version = getOrCreateProduct(composition, emsCompositionName, emsProductType, emsProductBrand, now);
            Instance instance = getInstanceByNo(emsInstanceNo);
            Device device = getOrCreateDevice(emsDeviceNo, instance, version, now);

            addConfigurations(configurations, composition, device);
        }
        return true;
    }

    @Override
    public List<DeviceVo> findByMap(Map<String, Object> map) {
        if (map.containsKey("ems_instance_no")){
            Instance instance = instanceMapper.findByNo((String) map.get("ems_instance_no"));
            map.put("ems_instance_id", instance.getEms_instance_id());
        }
        return deviceMapper.findByMap(map);
    }

    private Composition getOrCreateComposition(String emsCompositionName, Integer emsCompositionPid) {
        Composition duplicateComposition = compositionMapper.findDuplicateComposition(emsCompositionName);
        if (duplicateComposition == null) {
            Composition composition = Composition.builder()
                    .ems_composition_name(emsCompositionName)
                    .ems_composition_pid(emsCompositionPid)
                    .ems_composition_standardid(2)
                    .build();
            compositionMapper.insert(composition);
            return composition;
        } else {
            return duplicateComposition;
        }
    }

    private Version getOrCreateProduct(Composition composition, String emsCompositionName, String emsProductType, String emsProductBrand, Date now) {
        Product duplicateProduct = productMapper.findDuplicateProducts(emsProductType,emsCompositionName);
        if (duplicateProduct == null) {
            Product product = Product.builder()
                    .ems_product_compositionid(composition.getEms_composition_id())
                    .ems_product_name(emsCompositionName)
                    .ems_product_type(emsProductType)
                    .ems_product_createtime(now)
                    .ems_product_updatetime(now)
                    .ems_product_brand(emsProductBrand)
                    .build();
            productMapper.insert(product);

            Version version = Version.builder()
                    .ems_version_no(1)
                    .ems_version_iscurrent(1)
                    .ems_version_productid(product.getEms_product_id())
                    .build();
            versionMapper.insert(version);
            Module module = Module.builder()
                    .ems_module_name("默认模块")
                    .ems_module_versionid(version.getEms_version_id())
                    .build();
            moduleMapper.insert(module);
            return version;
        } else {
            Version version = versionMapper.findByProductId(duplicateProduct.getEms_product_id());
            return version;
        }
    }


    private Instance getInstanceByNo(String emsInstanceNo) {
        return instanceMapper.findByNo(emsInstanceNo);
    }

    private Device getOrCreateDevice(String emsDeviceNo, Instance instance, Version version, Date now) {
        Device duplicateDevice = deviceMapper.findDuplicateDevice(emsDeviceNo);
        if (duplicateDevice == null) {
            Device device = Device.builder()
                    .ems_device_no(emsDeviceNo)
                    .ems_device_instanceid(instance.getEms_instance_id())
                    .ems_device_versionid(version.getEms_version_id())
                    .ems_device_createtime(now)
                    .build();
            deviceMapper.insert(device);
            return device;
        } else {
            return duplicateDevice;
        }
    }

    private void addConfigurations(JSONArray configurations, Composition composition, Device device) {
        if (configurations == null || configurations.size() == 0) {
            return;
        }
        installconfigurationMapper.deleteByDevice(device.getEms_device_id());
        for (int k = 0; k < configurations.size(); k++) {
            JSONObject jsonObject = configurations.getJSONObject(k);
            String emsConfigurationName = jsonObject.getString("ems_configuration_name");
            String emsConfigurationValue = jsonObject.getString("ems_configuration_value");

            Configuration configurationMapperByName = configurationMapper.findByName(emsConfigurationName);

            if (configurationMapperByName == null) {
                Configuration configuration = Configuration.builder()
                        .ems_configuration_name(emsConfigurationName)
                        .ems_configuration_type("varchar")
                        .ems_configuration_compositionid(composition.getEms_composition_id())
                        .build();
                configurationMapper.insert(configuration);

                Installconfiguration installconfiguration = Installconfiguration.builder()
                        .ems_installconfiguration_value(emsConfigurationValue)
                        .ems_installconfiguration_deviceid(device.getEms_device_id())
                        .ems_installconfiguration_configurationid(configuration.getEms_configuration_id())
                        .build();
                installconfigurationMapper.insert(installconfiguration);
            } else {
                Installconfiguration installconfiguration = Installconfiguration.builder()
                        .ems_installconfiguration_value(emsConfigurationValue)
                        .ems_installconfiguration_deviceid(device.getEms_device_id())
                        .ems_installconfiguration_configurationid(configurationMapperByName.getEms_configuration_id())
                        .build();
                installconfigurationMapper.insert(installconfiguration);
            }

        }
    }

//    @Override
//    public Boolean sync(JSONArray jsonArray) {
//        Date now = new Date();
//        for (int i = 0; i < jsonArray.size(); i++) {
//            JSONObject json = jsonArray.getJSONObject(i);
//            String emsCompositionName = json.getString("ems_composition_name");
//            Integer emsCompositionPid = json.getInteger("ems_composition_pid");
//            String emsProductType = json.getString("ems_product_type");
//            String emsProductBrand = json.getString("ems_product_brand");
//            String emsDeviceNo = json.getString("ems_device_no");
//            String emsInstanceNo = json.getString("ems_instance_no");
//            JSONArray configurations = json.getJSONArray("configurations");
//
//            Composition composition = Composition.builder()
//                    .ems_composition_name(emsCompositionName)
//                    .ems_composition_pid(emsCompositionPid)
//                    .ems_composition_standardid(2).build();
//
//            // 查询是否已存在
//            Composition duplicateComposition = compositionMapper.findDuplicateComposition(emsCompositionName);
//            if (duplicateComposition == null) {
//                // 添加组成
//                compositionMapper.insert(composition);
//            }
//
//            Product product = Product.builder()
//                    .ems_product_compositionid(duplicateComposition == null ? composition.getEms_composition_id() : duplicateComposition.getEms_composition_id())
//                    .ems_product_name(emsCompositionName)
//                    .ems_product_type(emsProductType)
//                    .ems_product_createtime(now)
//                    .ems_product_updatetime(now)
//                    .ems_product_brand(emsProductBrand)
//                    .build();
//
//            Instance instance = instanceMapper.fingByNo(emsInstanceNo);
//
//            // 查询是否已存在
//            Product duplicateProduct = productMapper.findDuplicateProducts(emsProductType);
//            if (duplicateProduct == null) {
//                // 添加产品
//                productMapper.insert(product);
//                Version version = Version.builder()
//                        .ems_version_no(1)
//                        .ems_version_iscurrent(1)
//                        .ems_version_productid(product.getEms_product_id())
//                        .build();
//                versionMapper.insert(version);
//
//                Device device = Device.builder()
//                        .ems_device_no(emsDeviceNo)
//                        .ems_device_instanceid(instance.getEms_instance_id())
//                        .ems_device_versionid(version.getEms_version_id())
//                        .ems_device_createtime(now).build();
//                deviceMapper.insert(device);
//
//                // 配置
//                for (int k = 0; k < configurations.size(); k++) {
//                    JSONObject jsonObject = configurations.getJSONObject(i);
//                    Configuration configuration = Configuration.builder()
//                            .ems_configuration_name(jsonObject.getString("ems_configguration_name"))
//                            .ems_configuration_type("varchar")
//                            .ems_configuration_compositionid(duplicateComposition == null ? composition.getEms_composition_id() : duplicateComposition.getEms_composition_id())
//                            .build();
//                    configurationMapper.insert(configuration);
//
//                    Installconfiguration installconfiguration = Installconfiguration.builder()
//                            .ems_installconfiguration_value(jsonObject.getString("ems_configuration_value"))
//                            .ems_installconfiguration_deviceid(device.getEms_device_id())
//                            .ems_installconfiguration_configurationid(configuration.getEms_configuration_id()).build();
//                    installconfigurationMapper.insert(installconfiguration);
//                }
//            } else {
//                Version version = versionMapper.findByProductId(duplicateProduct.getEms_product_id());
//                Device device = Device.builder()
//                        .ems_device_no(emsDeviceNo)
//                        .ems_device_instanceid(instance.getEms_instance_id())
//                        .ems_device_versionid(version.getEms_version_id())
//                        .ems_device_createtime(now).build();
//
//                Device duplicateDevice = deviceMapper.findDuplicateDevice(emsDeviceNo);
//                if (duplicateDevice == null) {
//                    deviceMapper.insert(device);
//
//                    // 配置
//                    for (int k = 0; k < configurations.size(); k++) {
//                        JSONObject jsonObject = configurations.getJSONObject(i);
//                        Configuration configuration = Configuration.builder()
//                                .ems_configuration_name(jsonObject.getString("ems_configguration_name"))
//                                .ems_configuration_type("varchar")
//                                .ems_configuration_compositionid(duplicateComposition == null ? composition.getEms_composition_id() : duplicateComposition.getEms_composition_id())
//                                .build();
//                        configurationMapper.insert(configuration);
//
//                        Installconfiguration installconfiguration = Installconfiguration.builder()
//                                .ems_installconfiguration_value(jsonObject.getString("ems_configuration_value"))
//                                .ems_installconfiguration_deviceid(device.getEms_device_id())
//                                .ems_installconfiguration_configurationid(configuration.getEms_configuration_id()).build();
//                        installconfigurationMapper.insert(installconfiguration);
//                    }
//                }
//            }
//
//        }
//        return true;
//    }
}
