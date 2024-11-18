package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.DevicecommonMapper;
import com.shengqitech.ems.mappers.CommonMapper;
import com.shengqitech.ems.mappers.InstallconfigurationMapper;
import com.shengqitech.ems.mappers.LookpointMapper;
import com.shengqitech.ems.models.domains.Devicecommon;
import com.shengqitech.ems.models.domains.Common;
import com.shengqitech.ems.models.domains.Installconfiguration;
import com.shengqitech.ems.models.po.CommonAddPo;
import com.shengqitech.ems.models.po.CommonDeviceInstallPo;
import com.shengqitech.ems.models.po.CommonEditPo;
import com.shengqitech.ems.services.ICommonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * <p>
 * 服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class CommonServiceImpl implements ICommonService {

    @Autowired
    private CommonMapper commonMapper;

    @Autowired
    private DevicecommonMapper devicecommonMapper;

    @Autowired
    private InstallconfigurationMapper installconfigurationMapper;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean insert(CommonAddPo commonAddPo) {
        Date now = new Date();
        Integer[] commonPropertyids = commonAddPo.getEms_common_propertyids();
        List<CommonDeviceInstallPo> commonDeviceInstallPos = commonAddPo.getEms_common_deviceinstalls();

        Common common = Common.builder()
                .ems_common_name(commonAddPo.getEms_common_name())
                .ems_common_panoramaid(commonAddPo.getEms_common_panoramaid())
                .ems_common_tagtypeid(commonAddPo.getEms_common_tagtypeid())
                .ems_common_widthratio(commonAddPo.getEms_common_widthratio())
                .ems_common_heightratio(commonAddPo.getEms_common_heightratio())
                .ems_common_rotation(commonAddPo.getEms_common_rotation())
                .ems_common_location(commonAddPo.getEms_common_location())
                .ems_common_isview(commonAddPo.getEms_common_isview())
                .ems_common_isembed(commonAddPo.getEms_common_isembed())
                .ems_common_fovrange(commonAddPo.getEms_common_fovrange())
                .ems_common_jsondata(commonAddPo.getEms_common_jsondata())
                .ems_common_createtime(now)
                .ems_common_updatetime(now).build();
        int count = commonMapper.insert(common);

        // 添加热点标签与产品属性的关系
        if (commonPropertyids != null && commonPropertyids.length != 0) {
            commonMapper.insertCommonProperties(common.getEms_common_id(), commonPropertyids);
        }

        if (commonDeviceInstallPos != null && commonDeviceInstallPos.size() != 0) {

            for (CommonDeviceInstallPo commonDeviceInstallPo : commonDeviceInstallPos) {
                // 添加设备与基础标签标签关系
                Devicecommon devicecommon = Devicecommon.builder()
                        .ems_devicecommon_deviceid(commonDeviceInstallPo.getEms_device_id())
                        .ems_devicecommon_commonid(common.getEms_common_id()).build();

                devicecommonMapper.insert(devicecommon);

                // 添加或更新设备与与产品分类的配置安装信息
                List<Installconfiguration> installconfigurations = commonDeviceInstallPo.getEms_device_Installconfigurations();
                for (Installconfiguration installconfigurationPo : installconfigurations) {
                    if (installconfigurationPo.getEms_installconfiguration_id() == null) {
                        Installconfiguration installconfiguration = Installconfiguration.builder()
                                .ems_installconfiguration_deviceid(installconfigurationPo.getEms_installconfiguration_deviceid())
                                .ems_installconfiguration_configurationid(installconfigurationPo.getEms_installconfiguration_configurationid())
                                .ems_installconfiguration_value(installconfigurationPo.getEms_installconfiguration_value()).build();
                        installconfigurationMapper.insert(installconfiguration);
                    }
                }
            }
        }


        return count > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean update(CommonEditPo commonEditPo) {
        Date now = new Date();

        Integer[] commonPropertyids = commonEditPo.getEms_common_propertyids();
        List<CommonDeviceInstallPo> commonDeviceInstallPos = commonEditPo.getEms_common_deviceinstalls();

        Integer id = commonEditPo.getEms_common_id();
        Common common = Common.builder()
                .ems_common_id(id)
                .ems_common_name(commonEditPo.getEms_common_name())
                .ems_common_panoramaid(commonEditPo.getEms_common_panoramaid())
                .ems_common_tagtypeid(commonEditPo.getEms_common_tagtypeid())
                .ems_common_widthratio(commonEditPo.getEms_common_widthratio())
                .ems_common_heightratio(commonEditPo.getEms_common_heightratio())
                .ems_common_rotation(commonEditPo.getEms_common_rotation())
                .ems_common_location(commonEditPo.getEms_common_location())
                .ems_common_isview(commonEditPo.getEms_common_isview())
                .ems_common_isembed(commonEditPo.getEms_common_isembed())
                .ems_common_fovrange(commonEditPo.getEms_common_fovrange())
                .ems_common_jsondata(commonEditPo.getEms_common_jsondata())
                .ems_common_updatetime(now).build();
        int count = commonMapper.update(common);

        // 删除热点标签与产品属性的关系
        commonMapper.deleteCommonProperties(common.getEms_common_id());
        // 添加热点标签与产品属性的关系
        if (commonPropertyids != null && commonPropertyids.length != 0) {
            commonMapper.insertCommonProperties(common.getEms_common_id(), commonPropertyids);
        }


        // 删除设备与基础标签标签关系
        devicecommonMapper.deleteByCommonid(id);

        if (commonDeviceInstallPos != null && commonDeviceInstallPos.size() != 0) {

            for (CommonDeviceInstallPo commonDeviceInstallPo : commonDeviceInstallPos) {
                // 添加设备与基础标签标签关系
                Devicecommon devicecommon = Devicecommon.builder()
                        .ems_devicecommon_deviceid(commonDeviceInstallPo.getEms_device_id())
                        .ems_devicecommon_commonid(common.getEms_common_id()).build();
                devicecommonMapper.insert(devicecommon);

                // 添加或更新设备与与产品分类的配置安装信息
                List<Installconfiguration> installconfigurations = commonDeviceInstallPo.getEms_device_Installconfigurations();
                for (Installconfiguration installconfigurationPo : installconfigurations) {
                    if (installconfigurationPo.getEms_installconfiguration_id() == null) {
                        Installconfiguration installconfiguration = Installconfiguration.builder()
                                .ems_installconfiguration_deviceid(installconfigurationPo.getEms_installconfiguration_deviceid())
                                .ems_installconfiguration_configurationid(installconfigurationPo.getEms_installconfiguration_configurationid())
                                .ems_installconfiguration_value(installconfigurationPo.getEms_installconfiguration_value()).build();
                        installconfigurationMapper.insert(installconfiguration);
                    } else {
                        Installconfiguration installconfiguration = Installconfiguration.builder()
                                .ems_installconfiguration_id(installconfigurationPo.getEms_installconfiguration_id())
                                .ems_installconfiguration_deviceid(installconfigurationPo.getEms_installconfiguration_deviceid())
                                .ems_installconfiguration_configurationid(installconfigurationPo.getEms_installconfiguration_configurationid())
                                .ems_installconfiguration_value(installconfigurationPo.getEms_installconfiguration_value()).build();
                        installconfigurationMapper.update(installconfiguration);
                    }
                }
            }
        }

        return count > 0;
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public Boolean delete(Integer ems_common_id) {

        // 删除热点标签与产品属性的关系
        commonMapper.deleteCommonProperties(ems_common_id);

        // 删除设备与基础标签标签关系
        devicecommonMapper.deleteByCommonid(ems_common_id);
        // 删除基础标签标签
        int count = commonMapper.delete(ems_common_id);
        return count > 0;
    }

    @Override
    public Boolean deleteByPanorama(Integer ems_panorama_id) {
        return commonMapper.deleteByPanorama(ems_panorama_id) > 0;
    }
}
