package com.shengqitech.ems.system.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * 读取项目相关配置
 * 
 * @author wsh
 */
@Component
@ConfigurationProperties(prefix = "ems")
public class ProjectConfig
{
    /** 项目名称 */
    private String name;

    /** 版本 */
    private String version;

    /** 实例演示开关 */

    /** 上传路径 */
    private static String profile;

    /** 获取地址开关 */
    private static boolean addressEnabled;

    public String getName()
    {
        return name;
    }

    public void setName(String name)
    {
        this.name = name;
    }

    public String getVersion()
    {
        return version;
    }

    public void setVersion(String version)
    {
        this.version = version;
    }

    public static String getProfile()
    {
        return profile;
    }

    public void setProfile(String profile)
    {
        ProjectConfig.profile = profile;
    }

    public static boolean isAddressEnabled(){
        return addressEnabled;
    }

    public void setAddressEnabled(boolean addressEnabled){
        ProjectConfig.addressEnabled = addressEnabled;
    }

    /**
     * 获取导入上传路径
     */
    public static String getImportPath()
    {
        return getProfile() + "/import";
    }

    /**
     * 获取用户相关上传路径
     */
    public static String getUserPath()
    {
        return getProfile() + "/user";
    }

    /**
     * 获取上传路径
     */
    public static String getUploadPath()
    {
        return getProfile() + "/upload";
    }
    /**
     * 获取产品相关上传路径
     */
    public static String getProductUploadPath()
    {
        return getProfile() + "/product";
    }
    /**
     * 获取场景相关上传路径
     */
    public static String getSceneUploadPath()
    {
        return getProfile() + "/scene";
    }
    /**
     * 获取监测站点相关上传路径
     */
    public static String getInstanceUploadPath()
    {
        return getProfile() + "/instance";
    }
    /**
     * 获取全景设计相关上传路径
     */
    public static String getPanoramadesignPath()
    {
        return getProfile() + "/panoramadesign";
    }
    /**
     * 获取全景导航点相关上传路径
     */
    public static String getNavigation()
    {
        return getProfile() + "/navigation";
    }
    /**
     * 获取报警信息上传路径
     */
    public static String getAlarm()
    {
        return getProfile() + "/alarm";
    }
    /**
     * 获取全景场景相关上传路径
     */
    public static String getPanoramaUploadPath()
    {
        return getProfile() + "/panorama";
    }
    public static String getGuideUploadPath()
    {
        return getProfile() + "/guide";
    }
    /**
     * 获取客户相关上传路径
     */
    public static String getCustomerUploadPath()
    {
        return getProfile() + "/customer";
    }
    /**
     * 获取管控区域相关上传路径
     */
    public static String getSpacecontrolUploadPath()
    {
        return getProfile() + "/spacecontrol";
    }
    /**
     * 获取建设方案相关上传路径
     */
    public static String getCsolutionUploadPath()
    {
        return getProfile() + "/csolution";
    }
    /**
     * 获取基础标签相关上传路径
     */
    public static String getCommontagUploadPath()
    {
        return getProfile() + "/commontag";
    }
    /**
     * 获取视频融合相关上传路径
     */
    public static String getVideofusionUploadPath()
    {
        return getProfile() + "/videofusion";
    }
    /**
     * 获取标签类型相关上传路径
     */
    public static String getTagtypeUploadPath()
    {
        return getProfile() + "/tagtype";
    }
}