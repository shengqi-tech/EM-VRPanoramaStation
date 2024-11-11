declare namespace API {
  type Activity = {
    /** 监测要素id */
    ems_activity_elementid?: number;
    /** 监测活动表 */
    ems_activity_id?: number;
    /** 监测活动名称 */
    ems_activity_name?: string;
    /** 行业id */
    ems_activity_sectorid?: number;
  };

  type AlarmLevelduixiang = {
    /** 报警等级枚举 数 */
    ems_alarmlevel_code?: number;
    /** 报警等级表 */
    ems_alarmlevel_id?: number;
    /** 报警等级名称 */
    ems_alarmlevel_name?: string;
  };

  type ApiAddPo = {
    /** 请求头JSON(包含token等) */
    ems_api_header?: string;
    /** api名称 */
    ems_api_name?: string;
    /** 请求参数JSON(字段名、字段值、字段类型、字段描述) */
    ems_api_parameters?: string;
    /** 对接人id */
    ems_api_receptorid?: number;
    /** 请求类型(GET POST) */
    ems_api_requesttype?: string;
    /** 分组id */
    ems_api_restapigroupid?: number;
    /** 用户id */
    ems_api_sysuserid?: number;
    /** 地址 */
    ems_api_url?: string;
  };

  type ApiEditPo = {
    /** 请求头JSON(包含token等) */
    ems_api_header?: string;
    /** 平台对接表id */
    ems_api_id?: number;
    /** api名称 */
    ems_api_name?: string;
    /** 请求参数JSON(字段名、字段值、字段类型、字段描述) */
    ems_api_parameters?: string;
    /** 对接人id */
    ems_api_receptorid?: number;
    /** 请求类型(GET POST) */
    ems_api_requesttype?: string;
    /** 分组id */
    ems_api_restapigroupid?: number;
    /** 用户id */
    ems_api_sysuserid?: number;
    /** 地址 */
    ems_api_url?: string;
  };

  type ApiResponse = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: Record<string, any>;
  };

  type ApiResponseint = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: number;
  };

  type ApiResponseListComposition = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: Composition[];
  };

  type ApiResponseListConfiguration = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: Configuration[];
  };

  type ApiResponseListDeviceAlarmVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: DeviceAlarmVo[];
  };

  type ApiResponseListDeviceVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: DeviceVo[];
  };

  type ApiResponseListItem = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: Item[];
  };

  type ApiResponseListProductVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: ProductVo[];
  };

  type ApiResponseListRestapigroupVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: RestapigroupVo[];
  };

  type ApiResponseListSituationVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: SituationVo[];
  };

  type ApiResponseListstring = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: string[];
  };

  type ApiResponseListSysfile = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: Sysfile[];
  };

  type ApiResponseListTagtypeVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TagtypeVo[];
  };

  type ApiResponsePanoramaViewVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: PanoramaViewVo;
  };

  type ApiResponseReportVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: ReportVo;
  };

  type ApiResponseRoleViewVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: RoleViewVo;
  };

  type ApiResponsestring = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: string;
  };

  type ApiResponseSysfile = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: Sysfile;
  };

  type ApiResponseSysuserViewVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: SysuserViewVo;
  };

  type ApiResponseSysuserVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: SysuserVo;
  };

  type ApiResponseTableDataInfoApiVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoApiVo;
  };

  type ApiResponseTableDataInfoCustomerVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoCustomerVo;
  };

  type ApiResponseTableDataInfoGuideVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoGuideVo;
  };

  type ApiResponseTableDataInfoInstanceVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoInstanceVo;
  };

  type ApiResponseTableDataInfoListInstanceVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoListInstanceVo;
  };

  type ApiResponseTableDataInfoPanoramaViewVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoPanoramaViewVo;
  };

  type ApiResponseTableDataInfoRole = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoRole;
  };

  type ApiResponseTableDataInfoSyslog = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoSyslog;
  };

  type ApiResponseTableDataInfoSysuserVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoSysuserVo;
  };

  type ApiResponseTableDataInfoXxlJobGroupVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoXxlJobGroupVo;
  };

  type ApiResponseTableDataInfoXxlJobInfoVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoXxlJobInfoVo;
  };

  type ApiResponseTableDataInfoXxlJobLogVo = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: TableDataInfoXxlJobLogVo;
  };

  type ApiResponseXxlJobGroup = {
    /** 状态码 */
    code?: number;
    /** 信息 */
    message?: string;
    /** 对象 */
    result?: XxlJobGroup;
  };

  type ApiVo = {
    /** 创建时间 */
    ems_api_createtime?: string;
    /** 请求头JSON(包含token等) */
    ems_api_header?: string;
    /** 平台对接表 */
    ems_api_id?: number;
    /** api名称 */
    ems_api_name?: string;
    /** 请求参数JSON(字段名、字段值、字段类型、字段描述) */
    ems_api_parameters?: string;
    /** 对接人id */
    ems_api_receptorid?: number;
    /** 请求类型(GET POST) */
    ems_api_requesttype?: string;
    /** 分组id */
    ems_api_restapigroupid?: number;
    /** 用户id */
    ems_api_sysuserid?: number;
    /** 修改时间 */
    ems_api_updatetime?: string;
    /** 地址 */
    ems_api_url?: string;
    /** 结果映射列表 */
    resultmapList?: Resultmap[];
  };

  type assignInstanceParams = {
    /** 过期时间(开始时间~结束时间) */
    ems_assign_expirationdate: string;
    /** 监测站点id数组 */
    ems_instance_ids: number[];
    /** 用户id */
    ems_sysuser_id: number;
  };

  type assignRolesParams = {
    /** 用户id */
    ems_sysuser_id: number;
    /** 用户id数组 */
    ids: number[];
  };

  type batchUploadPanoramaFileParams = {
    /** 文件 */
    files: string[];
  };

  type chartInfoParams = {
    /** 结束时间 */
    endDate?: string;
    /** 开始时间 */
    startDate?: string;
  };

  type checkCodeParams = {
    /** 验证码 */
    code: string;
    /** 手机号码 */
    mobile: string;
  };

  type CommonAddPo = {
    /** 设备安装信息数组 */
    ems_common_deviceinstalls?: CommonDeviceInstallPo[];
    /** fov范围(标签显示的范围) */
    ems_common_fovrange?: string;
    /** 高度比例 */
    ems_common_heightratio?: number;
    /** 是否嵌入(0:否 DIV,1:是 threejs对象) */
    ems_common_isembed?: number;
    /** 是否显示(0:不显示,1:显示) */
    ems_common_isview?: number;
    /** json数据 */
    ems_common_jsondata?: string;
    /** 基础标签位置("-0.49,-7.71,-48.49") */
    ems_common_location?: string;
    /** 基础标签名称 */
    ems_common_name?: string;
    /** 全景图id */
    ems_common_panoramaid?: number;
    /** 产品属性id数组，包含多个产品属性 */
    ems_common_propertyids?: number[];
    /** 基础标签旋转角度("0,-7,0") */
    ems_common_rotation?: string;
    /** 标签动画id */
    ems_common_taganimationid?: number;
    /** 标签类型id */
    ems_common_tagtypeid?: number;
    /** 宽度比例 */
    ems_common_widthratio?: number;
  };

  type CommonDeviceInstallPo = {
    /** 配置列表 */
    ems_device_Installconfigurations?: Installconfiguration[];
    /** 设备表 */
    ems_device_id?: number;
  };

  type CommonEditPo = {
    /** 设备安装信息数组 */
    ems_common_deviceinstalls?: CommonDeviceInstallPo[];
    /** fov范围(标签显示的范围) */
    ems_common_fovrange?: string;
    /** 高度比例 */
    ems_common_heightratio?: number;
    /** 基础标签表 */
    ems_common_id?: number;
    /** 是否嵌入(0:否 DIV,1:是 threejs对象) */
    ems_common_isembed?: number;
    /** 是否显示(0:不显示,1:显示) */
    ems_common_isview?: number;
    /** json数据 */
    ems_common_jsondata?: string;
    /** 基础标签位置("-0.49,-7.71,-48.49") */
    ems_common_location?: string;
    /** 基础标签名称 */
    ems_common_name?: string;
    /** 全景图id */
    ems_common_panoramaid?: number;
    /** 产品属性id数组，包含多个产品属性 */
    ems_common_propertyids?: number[];
    /** 基础标签旋转角度("0,-7,0") */
    ems_common_rotation?: string;
    /** 标签动画id */
    ems_common_taganimationid?: number;
    /** 标签类型id */
    ems_common_tagtypeid?: number;
    /** 宽度比例 */
    ems_common_widthratio?: number;
  };

  type CommontagVo = {
    /** 创建时间 */
    ems_common_createtime?: string;
    /** 绑定设备列表 */
    ems_common_devices?: DeviceCommonVo[];
    /** fov范围(标签显示的范围) */
    ems_common_fovrange?: string;
    /** 高度比例 */
    ems_common_heightratio?: number;
    /** 基础标签表 */
    ems_common_id?: number;
    /** 是否嵌入(0:否 DIV,1:是 threejs对象) */
    ems_common_isembed?: number;
    /** 是否显示(0:不显示,1:显示) */
    ems_common_isview?: number;
    /** json数据 */
    ems_common_jsondata?: string;
    /** 基础标签位置("-0.49,-7.71,-48.49") */
    ems_common_location?: string;
    /** 基础标签名称 */
    ems_common_name?: string;
    /** 全景图id */
    ems_common_panoramaid?: number;
    /** 绑定的属性列表 */
    ems_common_properties?: Propertyduixiang[];
    /** 基础标签旋转角度("0,-7,0") */
    ems_common_rotation?: string;
    /** 标签动画id */
    ems_common_taganimationid?: number;
    /** 标签图标文件类型 */
    ems_common_tagtype?: string;
    /** 标签图标文件对象 */
    ems_common_tagtypeiconfile?: Sysfile;
    /** 标签类型id */
    ems_common_tagtypeid?: number;
    /** 标签图标文件pid */
    ems_common_tagtypepid?: string;
    /** 更新时间 */
    ems_common_updatetime?: string;
    /** 宽度比例 */
    ems_common_widthratio?: number;
  };

  type Composition = {
    /** 子类 */
    ems_composition_compositions?: Composition[];
    /** 模块描述 */
    ems_composition_des?: string;
    /** 图标文件id */
    ems_composition_iconfileid?: number;
    /** 组成结构表 */
    ems_composition_id?: number;
    /** 是否是叶子 0 不是 1是 */
    ems_composition_isleaf?: boolean;
    /** 默认模型文件id */
    ems_composition_modelfileid?: number;
    /** 组成名称 */
    ems_composition_name?: string;
    /** 父节点id */
    ems_composition_pid?: number;
    /** 标准id */
    ems_composition_standardid?: number;
  };

  type Configuration = {
    /** 组成id */
    ems_configuration_compositionid?: number;
    /** 数据类型id */
    ems_configuration_datatypeid?: number;
    /** 配置表 */
    ems_configuration_id?: number;
    /** 配置key */
    ems_configuration_key?: string;
    /** 配置项描述 */
    ems_configuration_name?: string;
    /** 配置项类型 */
    ems_configuration_type?: string;
  };

  type Customer = {
    /** 租户地址 */
    ems_customer_address?: string;
    /** 城市 */
    ems_customer_city?: string;
    /** 创建时间 */
    ems_customer_createtime?: string;
    /** 客户描述 */
    ems_customer_des?: string;
    /** 邮箱 */
    ems_customer_email: string;
    /** 客户表 */
    ems_customer_id?: number;
    /** 是否实名  0 待实名  1 已实名 */
    ems_customer_isrealname?: number;
    /** 法人姓名 */
    ems_customer_legalperson?: string;
    /** 客户logo path */
    ems_customer_logofileid?: number;
    /** 客户名称 */
    ems_customer_name: string;
    /** 组织机构代码 */
    ems_customer_organizationcode: string;
    /** 认证时间 */
    ems_customer_realnametime?: string;
    /** 区 */
    ems_customer_region?: string;
    /** 州或者省 */
    ems_customer_state?: string;
    /** 修改时间 */
    ems_customer_updatetime?: string;
  };

  type CustomerAddPo = {
    /** 租户地址 */
    ems_customer_address?: string;
    /** 城市 */
    ems_customer_city?: string;
    /** 客户描述 */
    ems_customer_des?: string;
    /** 邮箱 */
    ems_customer_email: string;
    /** 法人姓名 */
    ems_customer_legalperson?: string;
    /** 客户logo文件对象 */
    ems_customer_logofile?: Sysfile;
    /** 客户名称 */
    ems_customer_name?: string;
    /** 组织机构代码 */
    ems_customer_organizationcode: string;
    /** 区 */
    ems_customer_region?: string;
    /** 州或者省 */
    ems_customer_state?: string;
  };

  type CustomerEditPo = {
    /** 租户地址 */
    ems_customer_address?: string;
    /** 城市 */
    ems_customer_city?: string;
    /** 客户描述 */
    ems_customer_des?: string;
    /** 邮箱 */
    ems_customer_email: string;
    /** 客户id */
    ems_customer_id?: number;
    /** 法人姓名 */
    ems_customer_legalperson?: string;
    /** 客户logo文件对象 */
    ems_customer_logofile?: Sysfile;
    /** 客户名称 */
    ems_customer_name?: string;
    /** 组织机构代码 */
    ems_customer_organizationcode: string;
    /** 区 */
    ems_customer_region?: string;
    /** 州或者省 */
    ems_customer_state?: string;
  };

  type CustomerVo = {
    /** 租户地址 */
    ems_customer_address?: string;
    /** 城市 */
    ems_customer_city?: string;
    /** 创建时间 */
    ems_customer_createtime?: string;
    /** 客户描述 */
    ems_customer_des?: string;
    /** 邮箱 */
    ems_customer_email: string;
    /** 客户表 */
    ems_customer_id?: number;
    /** 是否实名  0 待实名  1 已实名 */
    ems_customer_isrealname?: number;
    /** 法人姓名 */
    ems_customer_legalperson?: string;
    /** 客户logo文件对象 */
    ems_customer_logofile?: Sysfile;
    /** 客户logo path */
    ems_customer_logofileid?: number;
    /** 客户名称 */
    ems_customer_name: string;
    /** 组织机构代码 */
    ems_customer_organizationcode: string;
    /** 认证时间 */
    ems_customer_realnametime?: string;
    /** 区 */
    ems_customer_region?: string;
    /** 州或者省 */
    ems_customer_state?: string;
    /** 修改时间 */
    ems_customer_updatetime?: string;
  };

  type deleteApiParams = {
    /** 平台对接表id */
    ems_api_id: number;
  };

  type deleteCommonParams = {
    /** 基础标签标签id */
    ems_common_id: number;
  };

  type deleteCustomerParams = {
    /** 客户id */
    ems_customer_id: number;
  };

  type deleteGuideParams = {
    /** 导览id */
    ems_guide_id: number;
  };

  type deleteHtmlParams = {
    /** 网页标签id */
    ems_html_id: number;
  };

  type deleteItemParams = {
    /** 菜单id数组 */
    ids: number[];
  };

  type deleteNavigationParams = {
    /** 导航标签id */
    ems_navigation_id: number;
  };

  type deletePanoramaParams = {
    /** 全景id */
    ems_panorama_id: number;
  };

  type deleteParamsParams = {
    /** 结果映射表id */
    ems_resultmap_id: number;
  };

  type deleteProperyParams = {
    /** 产品属性id */
    ems_propery_id: number;
  };

  type deleteRoleParams = {
    /** 角色id数组 */
    ids: number[];
  };

  type deleteSysuserParams = {
    /** 用户id数组 */
    ids: number[];
  };

  type deleteTagtypeParams = {
    /** 标签类型id */
    ems_tagtype_id: number;
  };

  type Device = {
    /** 创建时间 */
    ems_device_createtime?: string;
    /** 设备表 */
    ems_device_id?: number;
    /** 站点id */
    ems_device_instanceid?: number;
    /** 设备编号 */
    ems_device_no?: string;
    /** 设备实物照片文件id */
    ems_device_picfileid?: number;
    /** 设备状态 0、库存 、1、出库  2、在线 、3、离线 */
    ems_device_state?: number;
    /** 产品版本id */
    ems_device_versionid?: number;
  };

  type DeviceAlarmVo = {
    /** 报警等级 */
    ems_devicealarm_alarmlevel?: AlarmLevelduixiang;
    /** 数据入库时间 */
    ems_devicealarm_createtime?: string;
    /** 设备 */
    ems_devicealarm_device?: Device;
    /** 设备报警类型id */
    ems_devicealarm_devicealarmtypeid?: number;
    /** 设备id */
    ems_devicealarm_deviceid?: number;
    /** 报警时间 */
    ems_devicealarm_happentime?: string;
    /** 设备报警表 */
    ems_devicealarm_id?: number;
    /** 报警等级id */
    ems_devicealarm_levelid?: number;
    /** 报警日志 */
    ems_devicealarm_log?: string;
    /** 报警记录值 */
    ems_devicealarm_value?: string;
  };

  type DeviceCommonVo = {
    /** 创建时间 */
    ems_device_createtime?: string;
    /** 设备表 */
    ems_device_id?: number;
    /** 站点id */
    ems_device_instanceid?: number;
    /** 设备编号 */
    ems_device_no?: string;
    /** 设备实物照片文件id */
    ems_device_picfileid?: number;
    /** 设备状态 0、库存 、1、出库  2、在线 、3、离线 */
    ems_device_state?: number;
    /** 产品版本id */
    ems_device_versionid?: number;
    /** 产品 */
    product?: Product;
  };

  type DeviceVo = {
    /** 配置列表 */
    ems_device_InstallconfigurationVos?: InstallconfigurationVo[];
    /** 创建时间 */
    ems_device_createtime?: string;
    /** 设备表 */
    ems_device_id?: number;
    /** 站点id */
    ems_device_instanceid?: number;
    /** 设备编号 */
    ems_device_no?: string;
    /** 设备实物照片文件id */
    ems_device_picfileid?: number;
    /** 设备状态 0、库存 、1、出库  2、在线 、3、离线 */
    ems_device_state?: number;
    /** 产品版本id */
    ems_device_versionid?: number;
  };

  type ElementVo = {
    /** 监测活动 */
    ems_element_activities?: Activity[];
    /** 描述 */
    ems_element_des?: string;
    /** 图标名，可以在前端通过iconfont呈现 */
    ems_element_icon?: string;
    /** 要素表 */
    ems_element_id?: number;
    /** 序号 */
    ems_element_index?: number;
    /** 要素名称 */
    ems_element_name?: string;
  };

  type findApiByMapParams = {
    /** 结束时间 */
    ems_api_endtime?: string;
    /** 请求类型(GET POST) */
    ems_api_requesttype?: string;
    /** 开始时间 */
    ems_api_starttime?: string;
    /** 请求地址 */
    ems_api_url?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findAssignInstanceParams = {
    /** 用户id */
    ems_sysuser_id: number;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findByStationIdParams = {
    /** 站房id */
    ems_instance_id?: number;
  };

  type findCompositionByMapParams = {
    /** 组成id */
    ems_composition_id?: number;
    /** 组成pid */
    ems_composition_pid?: number;
  };

  type findConfigurationByMapParams = {
    /** 产品分类(站房组成)id */
    ems_composition_id?: number;
  };

  type findCustomerByMapParams = {
    /** 客户id */
    ems_customer_id?: number;
    /** 客户名称 */
    ems_customer_name?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findDeviceByMapParams = {
    /** 设备id */
    ems_device_id?: number;
    /** 设备编号 */
    ems_device_no?: string;
    /** 站房id */
    ems_instance_id?: number;
    /** 站房编号 */
    ems_instance_no?: string;
    /** 产品id */
    ems_product_id?: number;
  };

  type findGuideByMapParams = {
    /** 导览id */
    ems_guide_id?: number;
    /** 检测站点id */
    ems_guide_instanceid?: number;
    /** 导览名称 */
    ems_guide_name?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findInstanceByMapParams = {
    /** 检测活动数组 */
    ems_instance_activities?: number[];
    /** 解决方案id */
    ems_instance_csolutionid?: number;
    /** 安装结束时间 */
    ems_instance_endtime?: string;
    /** 检测站点id */
    ems_instance_id?: number;
    /** 是否个人爱好 */
    ems_instance_ishobby?: number;
    /** 是否开放共享 */
    ems_instance_isshare?: number;
    /** 场景id */
    ems_instance_sceneid?: number;
    /**  断面/点位编号 */
    ems_instance_sectionid?: number;
    /** 安装开始时间 */
    ems_instance_starttime?: string;
    /** 检测站点名称或编号 */
    nameOrNo?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findItemByMapParams = {
    /** 菜单标识 */
    ems_item_code?: string;
    /** 结束时间 */
    ems_item_endtime?: string;
    /** 菜单id */
    ems_item_id?: number;
    /** 菜单名称 */
    ems_item_name?: string;
    /** 父节点id */
    ems_item_parentid?: number;
    /** 开始时间 */
    ems_item_starttime?: string;
  };

  type findJobGroupByMapParams = {
    /** 执行器AppName */
    appname?: string;
    /** 客户id */
    customerId?: number;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
    /** 执行器名称 */
    title?: string;
  };

  type findJobInfoByMapParams = {
    /** 作者 */
    author?: string;
    /** 执行器任务handler */
    executorHandler?: string;
    /** 调调度任务名称 */
    jobDesc?: string;
    /** 执行器id */
    jobGroup?: number;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
    /** 调度状态：0-停止，1-运行 */
    triggerStatus?: number;
  };

  type findLogByMapParams = {
    /** 客户名称 */
    ems_customer_name?: string;
    /** 调度时间 */
    filterTime?: string;
    /** 执行器id */
    jobGroup?: number;
    /** 任务id */
    jobId?: number;
    /** 状态 */
    logStatus?: number;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findMenusByUserIdParams = {
    /** 用户id */
    mpi_sysuser_id: number;
  };

  type findPanoramaByMapParams = {
    /** 创建结束时间 */
    ems_panorama_endtime?: string;
    /** 全景id */
    ems_panorama_id?: number;
    /** 检测站id */
    ems_panorama_instanceid?: number;
    /** 楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角) */
    ems_panorama_level?: number;
    /** 全景名称 */
    ems_panorama_name?: string;
    /** 创建开始时间 */
    ems_panorama_starttime?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findProductByMapParams = {
    /** 组成id */
    ems_composition_id?: number;
    /** 产品id */
    ems_product_id?: number;
    /** 产品名称 */
    ems_product_name?: string;
    /** 产品型号 */
    ems_product_type?: number;
  };

  type findRestapigroupByMapParams = {
    /** 分组id */
    ems_restapigroup_id?: number;
  };

  type findRoleByMapParams = {
    /** 结束时间 */
    ems_role_endtime?: string;
    /** 角色id */
    ems_role_id?: number;
    /** 角色名称 */
    ems_role_name?: string;
    /** 开始时间 */
    ems_role_starttime?: string;
    /** 角色标识 */
    ems_role_tag?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findSyslogByMapParams = {
    /** 操作结束时间 */
    ems_syslog_endtime?: string;
    /** 日志id */
    ems_syslog_id?: number;
    /** 操作人员id */
    ems_syslog_operid?: number;
    /** 请求URL */
    ems_syslog_operurl?: string;
    /** 操作状态（0正常 1异常） */
    ems_syslog_status?: number;
    /** 操作开始时间 */
    ems_syslog_strattime?: string;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    ems_syslog_type?: number;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findSysuserByMapParams = {
    /** 客户id */
    ems_sysuser_customerid?: number;
    /** 结束时间 */
    ems_sysuser_endtime?: string;
    /** 用户id */
    ems_sysuser_id?: number;
    /** 用户姓名 */
    ems_sysuser_name?: string;
    /** 开始时间 */
    ems_sysuser_starttime?: string;
    /** 当前页 */
    pageNum?: number;
    /** 每页显示的数量 */
    pageSize?: number;
  };

  type findTagtypeByMapParams = {
    /** 标签类型id */
    ems_tagtype_id?: number;
    /** 标签类型名称 */
    ems_tagtype_name?: string;
    /** 标签类型pid */
    ems_tagtype_pid?: number;
  };

  type getPanoramaViewParams = {
    /** 全景id */
    ems_panorama_id: number;
  };

  type getRoleViewParams = {
    /** 角色id */
    ems_role_id: number;
  };

  type getSysuserViewParams = {
    /** 用户id */
    ems_sysuser_id: number;
  };

  type GuideAddPo = {
    /** 封面文件对象 */
    ems_guide_coverfile?: Sysfile;
    /** 监测站站点id */
    ems_guide_instanceid: number;
    /** 导览点简介 */
    ems_guide_intr?: string;
    /** json数据 */
    ems_guide_jsondata?: string;
    /** 导览点名称 */
    ems_guide_name?: string;
    /** 全景图id */
    ems_guide_panoramaid: number;
    /** 排序 */
    ems_guide_sort?: number;
    /** 看点list */
    lookpointList: Lookpoint[];
  };

  type GuideEditPo = {
    /** 封面文件对象 */
    ems_guide_coverfile?: Sysfile;
    /** 导览id */
    ems_guide_id?: number;
    /** 监测站站点id */
    ems_guide_instanceid: number;
    /** 导览点简介 */
    ems_guide_intr?: string;
    /** json数据 */
    ems_guide_jsondata?: string;
    /** 导览点名称 */
    ems_guide_name?: string;
    /** 全景图id */
    ems_guide_panoramaid: number;
    /** 排序 */
    ems_guide_sort?: number;
    /** 看点id */
    ems_lookpoint_id?: number;
    /** 看点list */
    lookpointList: Lookpoint[];
  };

  type GuideVo = {
    /** 导览封面文件对象 */
    ems_guide_coverfile?: Sysfile;
    /** 导览点封面文件id */
    ems_guide_coverid?: number;
    /** 导览点表 */
    ems_guide_id?: number;
    /** 监测站站点id */
    ems_guide_instanceid?: number;
    /** 导览点简介 */
    ems_guide_intr?: string;
    /** json数据 */
    ems_guide_jsondata?: string;
    /** 看点list */
    ems_guide_lookpoints?: Lookpoint[];
    /** 导览点名称 */
    ems_guide_name?: string;
    /** 全景图id */
    ems_guide_panoramaid?: number;
    /** 全景名称 */
    ems_guide_panoramaname?: string;
    /** 排序 */
    ems_guide_sort?: number;
  };

  type hisValueParams = {
    /** 设备编号 */
    ems_device_no: string;
    /** 站房编号 */
    ems_instance_no: string;
    /** 结束时间 */
    endTime?: string;
    /** 开始时间 */
    startTime?: string;
  };

  type HtmlAddPo = {
    /** 高度比例 */
    ems_html_heightratio?: number;
    /** JSON数据 */
    ems_html_jsondata?: string;
    /** 基础标签位置(-0.49,-7.71,-48.49) */
    ems_html_location?: string;
    /** 网页标签名称 */
    ems_html_name?: string;
    /** 全景图id */
    ems_html_panoramaid?: number;
    /** 基础标签旋转角度(0,-7,0) */
    ems_html_rotation?: string;
    /** 标签动画id */
    ems_html_taganimationid?: number;
    /** 标签类型id */
    ems_html_tagtypeid?: number;
    /** 资源链接地址(系统资源地址) */
    ems_html_url?: string;
    /** 宽度比例 */
    ems_html_widthratio?: number;
  };

  type HtmlEditPo = {
    /** 高度比例 */
    ems_html_heightratio?: number;
    ems_html_id?: number;
    /** JSON数据 */
    ems_html_jsondata?: string;
    /** 基础标签位置(-0.49,-7.71,-48.49) */
    ems_html_location?: string;
    /** 网页标签名称 */
    ems_html_name?: string;
    /** 全景图id */
    ems_html_panoramaid?: number;
    /** 基础标签旋转角度(0,-7,0) */
    ems_html_rotation?: string;
    /** 标签动画id */
    ems_html_taganimationid?: number;
    /** 标签类型id */
    ems_html_tagtypeid?: number;
    /** 资源链接地址(系统资源地址) */
    ems_html_url?: string;
    /** 宽度比例 */
    ems_html_widthratio?: number;
  };

  type HtmlVo = {
    /** 创建时间 */
    ems_html_createtime?: string;
    /** 高度比例 */
    ems_html_heightratio?: number;
    /** 网页标签表 */
    ems_html_id?: number;
    /** JSON数据 */
    ems_html_jsondata?: string;
    /** 基础标签位置("-0.49,-7.71,-48.49") */
    ems_html_location?: string;
    /** 网页标签名称 */
    ems_html_name?: string;
    /** 全景图id */
    ems_html_panoramaid?: number;
    /** 基础标签旋转角度("0,-7,0") */
    ems_html_rotation?: string;
    /** 标签动画id */
    ems_html_taganimationid?: number;
    /** 标签图标文件类型 */
    ems_html_tagtype?: string;
    /** 图标文件对象 */
    ems_html_tagtypeiconfile?: Sysfile;
    /** 标签类型id */
    ems_html_tagtypeid?: number;
    /** 标签图标文件pid */
    ems_html_tagtypepid?: string;
    /** 更新时间 */
    ems_html_updatetime?: string;
    /** 资源链接地址(系统资源地址) */
    ems_html_url?: string;
    /** 宽度比例 */
    ems_html_widthratio?: number;
  };

  type Installconfiguration = {
    /** 配置表id */
    ems_installconfiguration_configurationid?: number;
    /** 设备id */
    ems_installconfiguration_deviceid?: number;
    /** 安装配置数据表 */
    ems_installconfiguration_id?: number;
    /** 配置信息值 */
    ems_installconfiguration_value?: string;
  };

  type InstallconfigurationVo = {
    /** 配置key */
    ems_configuration_key?: string;
    /** 配置表id */
    ems_installconfiguration_configurationid?: number;
    /** 设备id */
    ems_installconfiguration_deviceid?: number;
    /** 安装配置数据表 */
    ems_installconfiguration_id?: number;
    /** 配置信息值 */
    ems_installconfiguration_value?: string;
  };

  type Instance = {
    /** 详细地址 */
    ems_instance_address?: string;
    /** 建设结束时间 */
    ems_instance_constructionendtime?: string;
    /** 建设开始时间 */
    ems_instance_constructionstarttime?: string;
    /** 承建者id(哪家公司建设，customerid) */
    ems_instance_contractorid?: number;
    /** 站点坐标 */
    ems_instance_coordinate?: string;
    /** 创建时间 */
    ems_instance_createtime?: string;
    /** 创建者id */
    ems_instance_creatorid?: number;
    /** 解决方案id */
    ems_instance_csolutionid?: number;
    /** 监测站的简介 */
    ems_instance_des?: string;
    /** 全景全局设置 */
    ems_instance_globeconf?: string;
    /** 监测站id */
    ems_instance_id?: number;
    /** 是否个人爱好(0:否、1:是) */
    ems_instance_ishobby?: number;
    /** 是否开放共享 (0、不开放，1、开放) */
    ems_instance_isshare?: number;
    /** 站点名称 */
    ems_instance_name?: string;
    /** 站点编号 */
    ems_instance_no?: string;
    /** 现场图片文件id */
    ems_instance_picfileid?: number;
    /** 场景id */
    ems_instance_sceneid?: number;
    /**  断面/点位编号 */
    ems_instance_sectionid?: number;
    /** 更新时间 */
    ems_instance_updatetime?: string;
  };

  type InstanceAddPo = {
    /** 详细地址 */
    ems_instance_address?: string;
    /** 站点坐标 */
    ems_instance_coordinate?: string;
    /** 解决方案id */
    ems_instance_csolutionid?: number;
    /** 监测站的简介 */
    ems_instance_des?: string;
    /** 站点名称 */
    ems_instance_name?: string;
    /** 站点编号 */
    ems_instance_no?: string;
    /** 现场图片文件对象 */
    ems_instance_picfile?: Sysfile;
    /** 场景id */
    ems_instance_sceneid?: number;
    /** 断面/点位编号 */
    ems_instance_sectionid?: number;
  };

  type InstanceVo = {
    /** 详细地址 */
    ems_instance_address?: string;
    /** 建设结束时间 */
    ems_instance_constructionendtime?: string;
    /** 建设开始时间 */
    ems_instance_constructionstarttime?: string;
    /** 承建者id(哪家公司建设，customerid) */
    ems_instance_contractorid?: number;
    /** 站点坐标 */
    ems_instance_coordinate?: string;
    /** 创建时间 */
    ems_instance_createtime?: string;
    /** 创建者id */
    ems_instance_creatorid?: number;
    /** 解决方案id */
    ems_instance_csolutionid?: number;
    /** 监测站的简介 */
    ems_instance_des?: string;
    /** 全景全局设置 */
    ems_instance_globeconf?: string;
    /** 监测站id */
    ems_instance_id?: number;
    /** 是否存在报警 */
    ems_instance_isalarm?: boolean;
    /** 是否个人爱好(0:否、1:是) */
    ems_instance_ishobby?: number;
    /** 是否开放共享 (0、不开放，1、开放) */
    ems_instance_isshare?: number;
    /** 站点名称 */
    ems_instance_name?: string;
    /** 站点编号 */
    ems_instance_no?: string;
    /** 现场图片文件对象 */
    ems_instance_picfile?: Sysfile;
    /** 现场图片文件id */
    ems_instance_picfileid?: number;
    /** 场景id */
    ems_instance_sceneid?: number;
    /**  断面/点位编号 */
    ems_instance_sectionid?: number;
    /** 更新时间 */
    ems_instance_updatetime?: string;
  };

  type Item = {
    /** 菜单标识 */
    ems_item_code?: string;
    /** 创建时间 */
    ems_item_createtime?: string;
    /** 菜单图标 iconfont name */
    ems_item_icon?: string;
    /** ui界面元素表 */
    ems_item_id?: number;
    ems_item_items?: Item[];
    /** 菜单名称 */
    ems_item_name?: string;
    /** 次序 */
    ems_item_order?: number;
    /** 父节点id */
    ems_item_parentid?: number;
    /** 菜单或按钮事件请求路径 */
    ems_item_path?: string;
    /** 菜单类型 （类型   0：目录   1：菜单   2：按钮,3:其他) */
    ems_item_type?: number;
    /** 修改时间 */
    ems_item_updatetime?: string;
  };

  type ItemAddPo = {
    /** 菜单标识 */
    ems_item_code?: string;
    /** 菜单图标 iconfont name */
    ems_item_icon?: string;
    /** 菜单名称 */
    ems_item_name?: string;
    /** 次序 */
    ems_item_order?: number;
    /** 父节点id */
    ems_item_parentid?: number;
    /** 菜单或按钮事件请求路径 */
    ems_item_path?: string;
    /** 菜单类型 （类型   0：目录   1：菜单   2：按钮,3:其他) */
    ems_item_type?: number;
  };

  type ItemEditPo = {
    /** 菜单标识 */
    ems_item_code?: string;
    /** 菜单图标 iconfont name */
    ems_item_icon?: string;
    /** 菜单id */
    ems_item_id?: number;
    /** 菜单名称 */
    ems_item_name?: string;
    /** 次序 */
    ems_item_order?: number;
    /** 父节点id */
    ems_item_parentid?: number;
    /** 菜单或按钮事件请求路径 */
    ems_item_path?: string;
    /** 菜单类型 （类型   0：目录   1：菜单   2：按钮,3:其他) */
    ems_item_type?: number;
  };

  type loadByIdParams = {
    /** 执行器id */
    id: number;
  };

  type logDetailCatParams = {
    /** 行号 */
    fromLineNum: number;
    /** 日志id */
    id: number;
  };

  type logDetailParams = {
    /** 日志id */
    id: number;
  };

  type LoginBody = {
    /** 验证码 */
    code?: string;
    /** 用户密码 */
    password?: string;
    /** 用户名 */
    username?: string;
    /** 唯一标识 */
    uuid?: string;
  };

  type loginParams = {
    /** 验证码 */
    code?: string;
    /** 密码 */
    password: string;
    /** 用户名 */
    username: string;
    /** uuid */
    uuid?: string;
  };

  type LogResult = {
    end?: boolean;
    fromLineNum?: number;
    logContent?: string;
    toLineNum?: number;
  };

  type Lookpoint = {
    /** FOV */
    ems_lookpoint_fov?: number;
    /** 导览id */
    ems_lookpoint_guideid: number;
    /** 热点id */
    ems_lookpoint_hotspotid: number;
    /** 热点类型 */
    ems_lookpoint_hotspottype: string;
    /** 看点id */
    ems_lookpoint_id?: number;
    /** 起点坐标 */
    ems_lookpoint_startcoordinate?: number;
    /** 宽度 */
    ems_lookpoint_weight?: number;
  };

  type LookpointAddPo = {
    /** FOV */
    ems_lookpoint_fov?: number;
    /** 导览id */
    ems_lookpoint_guideid?: number;
    /** 热点id */
    ems_lookpoint_hotspotid?: number;
    /** 热点类型 */
    ems_lookpoint_hotspottype: string;
    /** 起点坐标 */
    ems_lookpoint_startcoordinate?: number;
    /** 宽度 */
    ems_lookpoint_weight?: number;
  };

  type LookpointEditPo = {
    /** FOV */
    ems_lookpoint_fov?: number;
    /** 导览id */
    ems_lookpoint_guideid?: number;
    /** 热点id */
    ems_lookpoint_hotspotid?: number;
    /** 热点类型 */
    ems_lookpoint_hotspottype: string;
    /** 看点id */
    ems_lookpoint_id?: number;
    /** 起点坐标 */
    ems_lookpoint_startcoordinate?: number;
    /** 宽度 */
    ems_lookpoint_weight?: number;
  };

  type ModuleVo = {
    /** 模块描述 */
    ems_module_des?: string;
    /** 模型图标 */
    ems_module_icon?: string;
    /** 产品模块表 */
    ems_module_id?: number;
    /** 模型路径 */
    ems_module_mode?: string;
    /** 模块名称 */
    ems_module_name?: string;
    /** 规格 */
    ems_module_specifications?: string;
    /** 型号 */
    ems_module_type?: string;
    /** 版本id */
    ems_module_versionid?: number;
    /** 属性列表 */
    properties?: Propertyduixiang[];
  };

  type Navigation = {
    /** 创建时间 */
    ems_navigation_createtime?: string;
    /** 高度比例 */
    ems_navigation_heightratio?: number;
    /** 全景导航表 */
    ems_navigation_id?: number;
    /** json数据 */
    ems_navigation_jsondata?: string;
    /** 导航位置("-0.49,-7.71,-48.49") */
    ems_navigation_location?: string;
    /** 导航名字 */
    ems_navigation_name?: string;
    /** 属于哪个全景图id */
    ems_navigation_panoramaid?: number;
    /** 导航旋转角度("0,-7,0") */
    ems_navigation_rotation?: string;
    /** 标签动画id */
    ems_navigation_taganimationid?: number;
    /** 标签图标文件类型 */
    ems_navigation_tagtype?: string;
    /** 图标文件对象 */
    ems_navigation_tagtypeiconfile?: Sysfile;
    /** 标签类型id */
    ems_navigation_tagtypeid?: number;
    /** 标签图标文件pid */
    ems_navigation_tagtypepid?: string;
    /** 导航去 全景图id */
    ems_navigation_topanoramaid?: number;
    /** 更新时间 */
    ems_navigation_updatetime?: string;
    /** 宽度比例 */
    ems_navigation_widthratio?: number;
  };

  type NavigationAddPo = {
    /** 高度比例 */
    ems_navigation_heightratio?: number;
    /** json数据 */
    ems_navigation_jsondata?: string;
    /** 导航位置("-0.49,-7.71,-48.49") */
    ems_navigation_location?: string;
    /** 导航名字 */
    ems_navigation_name?: string;
    /** 属于哪个全景图id */
    ems_navigation_panoramaid?: number;
    /** 导航旋转角度("0,-7,0") */
    ems_navigation_rotation?: string;
    /** 标签动画id */
    ems_navigation_taganimationid?: number;
    /** 标签类型id */
    ems_navigation_tagtypeid?: number;
    /** 导航去 全景图id */
    ems_navigation_topanoramaid?: number;
    /** 宽度比例 */
    ems_navigation_widthratio?: number;
  };

  type NavigationEditPo = {
    /** 高度比例 */
    ems_navigation_heightratio?: number;
    /** 导航标签id */
    ems_navigation_id?: number;
    /** json数据 */
    ems_navigation_jsondata?: string;
    /** 导航位置("-0.49,-7.71,-48.49") */
    ems_navigation_location?: string;
    /** 导航名字 */
    ems_navigation_name?: string;
    /** 属于哪个全景图id */
    ems_navigation_panoramaid?: number;
    /** 导航旋转角度("0,-7,0") */
    ems_navigation_rotation?: string;
    /** 标签动画id */
    ems_navigation_taganimationid?: number;
    /** 标签类型id */
    ems_navigation_tagtypeid?: number;
    /** 导航去 全景图id */
    ems_navigation_topanoramaid?: number;
    /** 宽度比例 */
    ems_navigation_widthratio?: number;
  };

  type nextTriggerTimeParams = {
    /** 调度配置，值含义取决于调度类型 */
    scheduleConf: string;
    /** 调度类型 */
    scheduleType: string;
  };

  type PanoramaAddPo = {
    /** 全景封面文件 */
    ems_panorama_coverfile?: Sysfile;
    /** 是否是起始页 0 否 1 是 */
    ems_panorama_default?: number;
    /** 描述 */
    ems_panorama_des?: string;
    /** 全景视场角(水平角:-180~180、垂直角:0~180) */
    ems_panorama_fov?: string;
    /** 排列顺序 */
    ems_panorama_index?: number;
    /** 全景初始状态(位置、视角) */
    ems_panorama_initview?: string;
    /** 监测站 id */
    ems_panorama_instanceid?: number;
    /** 楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角) */
    ems_panorama_level?: number;
    /** 场景名字 */
    ems_panorama_name?: string;
    /** 全景切片文件数组(1张原图+6张一级切片图+24张二级切片图) */
    ems_panorama_slicefiles?: Sysfile[];
    /** 创建人id */
    ems_panorama_userid?: number;
  };

  type PanoramaEditPo = {
    /** 全景封面文件 */
    ems_panorama_coverfile?: Sysfile;
    /** 是否是起始页 0 否 1 是 */
    ems_panorama_default?: number;
    /** 描述 */
    ems_panorama_des?: string;
    /** 全景视场角(水平角:-180~180、垂直角:0~180) */
    ems_panorama_fov?: string;
    /** 场景id */
    ems_panorama_id?: number;
    /** 排列顺序 */
    ems_panorama_index?: number;
    /** 全景初始状态(位置、视角) */
    ems_panorama_initview?: string;
    /** 监测站 id */
    ems_panorama_instanceid?: number;
    /** 楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角) */
    ems_panorama_level?: number;
    /** 场景名字 */
    ems_panorama_name?: string;
    /** 全景切片文件数组(1张原图+6张一级切片图+24张二级切片图) */
    ems_panorama_slicefiles?: Sysfile[];
    /** 创建人id */
    ems_panorama_userid?: number;
  };

  type PanoramaViewVo = {
    /** 基础标签 */
    ems_panorama_commonvos?: CommontagVo[];
    /** 全景封面文件 */
    ems_panorama_cover?: Sysfile;
    /** 创建时间 */
    ems_panorama_createtime?: string;
    /** 是否是起始页 0 否 1 是 */
    ems_panorama_default?: number;
    /** 描述 */
    ems_panorama_des?: string;
    /** 全景视场角(水平角:-180~180、垂直角:0~180) */
    ems_panorama_fov?: string;
    /** 网页标签 */
    ems_panorama_htmlvos?: HtmlVo[];
    /** 全景场景表 */
    ems_panorama_id?: number;
    /** 排列顺序 */
    ems_panorama_index?: number;
    /** 全景初始状态(位置、视角) */
    ems_panorama_initview?: string;
    /** 所属站房对象 */
    ems_panorama_instance?: Instance;
    /** 监测站 id */
    ems_panorama_instanceid?: number;
    /** 是否删除(0:否,1:是) */
    ems_panorama_isdelete?: number;
    /** 楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角) */
    ems_panorama_level?: number;
    /** 场景名字 */
    ems_panorama_name?: string;
    /** 导航标签 */
    ems_panorama_navigationvos?: Navigation[];
    /** 全景切片文件id数组(1张原图+6张一级切片图+24张二级切片图) */
    ems_panorama_slicefileids?: string;
    /** 全景切片文件列表(1张原图+6张一级切片图+24张二级切片图) */
    ems_panorama_slicefiles?: Sysfile[];
    /** 更新时间 */
    ems_panorama_updatetime?: string;
    /** 创建人id */
    ems_panorama_userid?: number;
    /** 视频融合标签 */
    ems_panorama_videofusionvos?: VideofusionVo[];
  };

  type Product = {
    /** 品牌 */
    ems_product_brand?: string;
    /** 组成id */
    ems_product_compositionid?: number;
    /** 创建时间 */
    ems_product_createtime?: string;
    /** 产品描述 */
    ems_product_des?: string;
    /** 产品表 */
    ems_product_id?: number;
    /** 产品模型文件id */
    ems_product_modelfileid?: number;
    /** 产品名称 */
    ems_product_name?: string;
    /** 产品图片文件id */
    ems_product_picfileid?: number;
    /** 产品型号 */
    ems_product_type?: string;
    /** 更新时间 */
    ems_product_updatetime?: string;
  };

  type ProductVo = {
    /** 品牌 */
    ems_product_brand?: string;
    /** 组成id */
    ems_product_compositionid?: number;
    /** 创建时间 */
    ems_product_createtime?: string;
    /** 产品描述 */
    ems_product_des?: string;
    /** 产品表 */
    ems_product_id?: number;
    /** 产品模型文件id */
    ems_product_modelfileid?: number;
    /** 产品名称 */
    ems_product_name?: string;
    /** 产品图片文件id */
    ems_product_picfileid?: number;
    /** 产品型号 */
    ems_product_type?: string;
    /** 更新时间 */
    ems_product_updatetime?: string;
    /** 版本Vo列表 */
    versionVos?: VersionVo[];
  };

  type PropertyAddPo = {
    /** 属性表 属性标识 */
    ems_property_code?: string;
    /** 数据类型 */
    ems_property_datatypeid?: number;
    /** 描述 */
    ems_property_des?: string;
    /** 属性标识符 */
    ems_property_identifier?: string;
    /** 序号 */
    ems_property_index?: number;
    /** 所属模块id */
    ems_property_moduleid?: number;
    /** 属性名 */
    ems_property_name?: string;
    /** 0、工况数据  1、业务数据 2、其他属性 */
    ems_property_type?: number;
    /** 属性单位 */
    ems_property_unit?: string;
  };

  type Propertyduixiang = {
    /** 属性表 属性标识 */
    ems_property_code?: string;
    ems_property_datatypeid?: number;
    /** 描述 */
    ems_property_des?: string;
    /** 属性表 */
    ems_property_id?: number;
    /** 属性标识符 */
    ems_property_identifier?: string;
    /** 序号 */
    ems_property_index?: number;
    /** 模块id */
    ems_property_moduleid?: number;
    /** 属性名 */
    ems_property_name?: string;
    /** 0、工况数据  1、业务数据 2、其他属性 */
    ems_property_type?: number;
    /** 属性单位(目前使用字符串，以后会用字典表) */
    ems_property_unit?: string;
  };

  type PropertyEditPo = {
    /** 属性表 属性标识 */
    ems_property_code?: string;
    /** 数据类型 */
    ems_property_datatypeid?: number;
    /** 描述 */
    ems_property_des?: string;
    ems_property_id?: number;
    /** 属性标识符 */
    ems_property_identifier?: string;
    /** 序号 */
    ems_property_index?: number;
    /** 所属模块id */
    ems_property_moduleid?: number;
    /** 属性名 */
    ems_property_name?: string;
    /** 0、工况数据  1、业务数据 2、其他属性 */
    ems_property_type?: number;
    /** 属性单位 */
    ems_property_unit?: string;
  };

  type removeParams = {
    /** 调度任务id */
    id: number;
  };

  type ReportVo = {
    /** 执行器数量 */
    executorCount?: number;
    /** 任务数量 */
    jobInfoCount?: number;
    /** 调度次数 */
    jobLogCount?: number;
    /** 调度成功数 */
    jobLogSuccessCount?: number;
    /** 触发成功数量 */
    triggerCountFailTotal?: number;
    /** 进行中总数 */
    triggerCountRunningTotal?: number;
    /** 触发失败数量 */
    triggerCountSucTotal?: number;
    /** 触发失败list */
    triggerDayCountFailList?: number[];
    /** 进行中list */
    triggerDayCountRunningList?: number[];
    /** 触发成功list */
    triggerDayCountSucList?: number[];
    /** 触发天数list */
    triggerDayList?: string[];
  };

  type resetPwdParams = {
    /** 用户id */
    ems_sysuser_id: number;
    /** 密码 */
    ems_sysuser_password: string;
  };

  type Restapigroup = {
    /** restapi分组 */
    ems_restapigroup_id?: number;
    /** 分组名称 */
    ems_restapigroup_name?: string;
    /** 用户id */
    ems_restapigroup_userid?: number;
  };

  type RestapigroupVo = {
    /** api对象列表 */
    ems_restapigroup_apivos?: ApiVo[];
    /** restapi分组 */
    ems_restapigroup_id?: number;
    /** 分组名称 */
    ems_restapigroup_name?: string;
    /** 用户id */
    ems_restapigroup_userid?: number;
  };

  type Resultmap = {
    /** 平台对接表id */
    ems_resultmap_apiid?: number;
    /** 创建时间 */
    ems_resultmap_createtime?: string;
    /** 目的地 */
    ems_resultmap_destination?: string;
    /** 结果映射表 */
    ems_resultmap_id?: number;
    /** 源 */
    ems_resultmap_source?: string;
    /** 修改时间 */
    ems_resultmap_updatetime?: string;
  };

  type ResultmapAddPo = {
    /** 平台对接表id */
    ems_resultmap_apiid?: number;
    /** 目的地 */
    ems_resultmap_destination?: string;
    /** 结果映射表 */
    ems_resultmap_id?: number;
    /** 源 */
    ems_resultmap_source?: string;
  };

  type ResultmapEditPo = {
    /** 平台对接表id */
    ems_resultmap_apiid?: number;
    /** 目的地 */
    ems_resultmap_destination?: string;
    /** 结果映射表 */
    ems_resultmap_id?: number;
    /** 源 */
    ems_resultmap_source?: string;
  };

  type ReturnTLogResult = {
    code?: number;
    content?: LogResult;
    msg?: string;
  };

  type Role = {
    /** 创建时间 */
    ems_role_createtime?: string;
    /** 角色的描述 */
    ems_role_des?: string;
    /** 角色表 */
    ems_role_id?: number;
    /** 角色名 */
    ems_role_name?: string;
    /** 角色状态 */
    ems_role_status?: number;
    /** 角色标识 */
    ems_role_tag?: string;
    /** 更新时间 */
    ems_role_updatetime?: string;
    /** 角色菜单权限 */
    permissions?: string[];
  };

  type RoleAddPo = {
    /** 角色的描述 */
    ems_role_des?: string;
    /** 菜单id数组 */
    ems_role_itemids: number[];
    /** 角色名 */
    ems_role_name?: string;
    /** 角色状态 */
    ems_role_status?: number;
    /** 角色标识 */
    ems_role_tag: string;
  };

  type RoleEditPo = {
    /** 角色的描述 */
    ems_role_des?: string;
    /** 角色id */
    ems_role_id?: number;
    /** 菜单id数组 */
    ems_role_itemids: number[];
    /** 角色名 */
    ems_role_name?: string;
    /** 角色状态 */
    ems_role_status?: number;
    /** 角色标识 */
    ems_role_tag: string;
  };

  type RoleViewVo = {
    /** 创建时间 */
    ems_role_createtime?: string;
    /** 角色的描述 */
    ems_role_des?: string;
    /** 角色表 */
    ems_role_id?: number;
    /** 菜单列表 */
    ems_role_items?: Item[];
    /** 角色名 */
    ems_role_name?: string;
    /** 角色状态 */
    ems_role_status?: number;
    /** 角色标识 */
    ems_role_tag?: string;
    /** 更新时间 */
    ems_role_updatetime?: string;
    /** 角色菜单权限 */
    permissions?: string[];
  };

  type SectorVo = {
    /** 监测活动 */
    ems_sector_activities?: Activity[];
    /** 描述 */
    ems_sector_des?: string;
    /** 图标名，可以在前端通过iconfont呈现 */
    ems_sector_icon?: string;
    /** 行业表 */
    ems_sector_id?: number;
    /** 序号 */
    ems_sector_index?: number;
    /** 行业名称 */
    ems_sector_name?: string;
    /** 行业父id */
    ems_sector_pid?: number;
    /** 行业子分类 */
    ems_sector_sectors?: SectorVo[];
  };

  type setHareParams = {
    /** 站房id */
    ems_instance_id: number;
    /** 开发状态(0:不开饭,1:开放) */
    ems_instance_isshare: number;
  };

  type setHobbyParams = {
    /** 全景全局设置 */
    ems_instance_globeconf: string;
    /** 站点id */
    ems_instance_id: number;
    /** 模板封面 */
    file: string;
    /** 是否保存个人喜欢(0:否,1:是) */
    isHobby: number;
  };

  type setHomePageParams = {
    /** 监测站id */
    ems_instance_id: number;
    /** 全景id */
    ems_panorama_id: number;
  };

  type SituationVo = {
    /** 描述 */
    ems_situation_des?: string;
    /** 当监测状况为 环境质量时：要素活动 */
    ems_situation_elementVos?: ElementVo[];
    /** 图标名，可以在前端通过iconfont呈现 */
    ems_situation_icon?: string;
    /** 监测状况表 */
    ems_situation_id?: number;
    /** 序号 */
    ems_situation_index?: number;
    /** 监测状况名称 */
    ems_situation_name?: string;
    /** 当监测状况为 污染源时：监测行业 */
    ems_situation_sectorVos?: SectorVo[];
  };

  type smsCodeParams = {
    /** 手机号码 */
    mobile: string;
  };

  type smsLoginParams = {
    /** 手机号码 */
    mobile: string;
    /** 验证码 */
    smsCode: string;
  };

  type sortGuideParams = {
    /** 被插队的导览id */
    id: number;
    /** 需要排序的导览id */
    sortId: number;
  };

  type sortParams = {
    /** 被插队的全景id */
    id: number;
    /** 需要排序的全景id */
    sortId: number;
  };

  type startParams = {
    /** 调度任务id */
    id: number;
  };

  type stopParams = {
    /** 调度任务id */
    id: number;
  };

  type Sysfile = {
    /** id */
    ems_sysfile_id?: number;
    /** 文件名称 */
    ems_sysfile_name?: string;
    /** 文件路径 */
    ems_sysfile_path?: string;
    /** 文件大小 */
    ems_sysfile_size?: number;
    /** 文件后缀 */
    ems_sysfile_suffix?: string;
    /** 文件类型 */
    ems_sysfile_type?: string;
  };

  type Syslog = {
    /** 消耗时间 */
    ems_syslog_costtime?: number;
    /** 客户id */
    ems_syslog_customerid?: number;
    /** 错误消息 */
    ems_syslog_errormsg?: string;
    /** 日志主键 */
    ems_syslog_id?: number;
    /** 返回参数 */
    ems_syslog_jsonresult?: string;
    /** 方法名称 */
    ems_syslog_method?: string;
    /** 操作人员id */
    ems_syslog_operid?: number;
    /** 主机地址 */
    ems_syslog_operip?: string;
    /** 操作人员 */
    ems_syslog_opername?: string;
    /** 请求参数 */
    ems_syslog_operparam?: string;
    /** 操作时间 */
    ems_syslog_opertime?: string;
    /** 操作类别（0其它 1后台用户 2手机端用户） */
    ems_syslog_opertype?: number;
    /** 请求URL */
    ems_syslog_operurl?: string;
    /** 请求方式 */
    ems_syslog_requestmethod?: string;
    /** 操作状态（0正常 1异常） */
    ems_syslog_status?: number;
    /** 模块标题 */
    ems_syslog_title?: string;
    /** 业务类型（0其它 1新增 2修改 3删除） */
    ems_syslog_type?: number;
  };

  type SysuserAddPo = {
    /** 用户角色(用于用户注册的时候选择角色) */
    ems_role_ids: number[];
    /** 用户地址 */
    ems_sysuser_address?: string;
    /** 用户头像文件 */
    ems_sysuser_avatarfile?: Sysfile;
    /** 客户id */
    ems_sysuser_customerid: number;
    /** 邮箱 */
    ems_sysuser_email?: string;
    /** 登录账号 登录名 */
    ems_sysuser_loginname: string;
    /** 移动电话 */
    ems_sysuser_mobilephone?: string;
    /** 用户名 */
    ems_sysuser_name: string;
    /** 登录账号 密码 */
    ems_sysuser_password: string;
    /** 个性签名 描述 简介 */
    ems_sysuser_signature?: string;
    /** 帐号状态（0停用 1正常） */
    ems_sysuser_status: number;
  };

  type SysuserEditPo = {
    /** 用户角色(用于用户注册的时候选择角色) */
    ems_role_ids: number[];
    /** 用户地址 */
    ems_sysuser_address?: string;
    /** 用户头像文件 */
    ems_sysuser_avatarfile?: Sysfile;
    /** 客户id */
    ems_sysuser_customerid: number;
    /** 邮箱 */
    ems_sysuser_email?: string;
    /** 用户id */
    ems_sysuser_id?: number;
    /** 移动电话 */
    ems_sysuser_mobilephone?: string;
    /** 用户名 */
    ems_sysuser_name: string;
    /** 个性签名 描述 简介 */
    ems_sysuser_signature?: string;
    /** 帐号状态（0停用 1正常） */
    ems_sysuser_status: number;
  };

  type SysuserViewVo = {
    admin?: boolean;
    /** 用户角色 */
    ems_role_ids?: Role[];
    /** 地址 */
    ems_sysuser_address?: string;
    /** 用户头像 */
    ems_sysuser_avatarfile?: Sysfile;
    /** 头像文件id */
    ems_sysuser_avatarfileid?: number;
    /** 创建时间 */
    ems_sysuser_creatime?: string;
    /** 客户 */
    ems_sysuser_customer?: Customer;
    /** 客户id */
    ems_sysuser_customerid?: number;
    /** 邮箱 */
    ems_sysuser_email?: string;
    /** 用户表 */
    ems_sysuser_id?: number;
    /** 登录账号 登录名 */
    ems_sysuser_loginname?: string;
    /** 移动电话 */
    ems_sysuser_mobilephone?: string;
    /** 用户名 */
    ems_sysuser_name?: string;
    /** 登录账号 密码 */
    ems_sysuser_password?: string;
    /** 个性签名 */
    ems_sysuser_signature?: string;
    /** 帐号状态（0停用 1正常） */
    ems_sysuser_status?: number;
    /** 更新时间 */
    ems_sysuser_updatetime?: string;
    /** 角色对象 */
    roles?: Role[];
  };

  type SysuserVo = {
    admin?: boolean;
    /** 用户角色(用于用户注册的时候选择角色) */
    ems_role_ids?: number[];
    /** 地址 */
    ems_sysuser_address?: string;
    /** 用户头像文件 */
    ems_sysuser_avatarfile?: Sysfile;
    /** 头像文件id */
    ems_sysuser_avatarfileid?: number;
    /** 创建时间 */
    ems_sysuser_creatime?: string;
    /** 客户 */
    ems_sysuser_customer?: Customer;
    /** 客户id */
    ems_sysuser_customerid?: number;
    /** 邮箱 */
    ems_sysuser_email?: string;
    /** 用户表 */
    ems_sysuser_id?: number;
    /** 登录账号 登录名 */
    ems_sysuser_loginname?: string;
    /** 移动电话 */
    ems_sysuser_mobilephone?: string;
    /** 用户名 */
    ems_sysuser_name?: string;
    /** 登录账号 密码 */
    ems_sysuser_password?: string;
    /** 个性签名 */
    ems_sysuser_signature?: string;
    /** 帐号状态（0停用 1正常） */
    ems_sysuser_status?: number;
    /** 更新时间 */
    ems_sysuser_updatetime?: string;
    /** 权限列表 */
    permissions?: string[];
    /** 角色对象 */
    roles?: Role[];
    /** token */
    token?: string;
  };

  type TableDataInfoApiVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: ApiVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoCustomerVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: CustomerVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoGuideVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: GuideVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoInstanceVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: InstanceVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoListInstanceVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: InstanceVo[][];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoPanoramaViewVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: PanoramaViewVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoRole = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: Role[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoSyslog = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: Syslog[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoSysuserVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: SysuserVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoXxlJobGroupVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: XxlJobGroupVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoXxlJobInfoVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: XxlJobInfoVo[];
    /** 总记录数 */
    total?: number;
  };

  type TableDataInfoXxlJobLogVo = {
    /** 统计类数据(列表统计项) */
    counter?: Record<string, any>;
    /** 列表数据 */
    list?: XxlJobLogVo[];
    /** 总记录数 */
    total?: number;
  };

  type TagtypeAddPo = {
    /** 图标文件 */
    ems_tagtype_iconfile?: Sysfile;
    /** 标签类型名称 */
    ems_tagtype_name?: string;
    /** 父节点id */
    ems_tagtype_pid?: number;
    /** 标签类型(热点:hotspot、导航:navigation、网页:html、视频融合:videofusion) */
    ems_tagtype_type?: string;
  };

  type TagtypeEditPo = {
    /** 图标文件 */
    ems_tagtype_iconfile?: Sysfile;
    /** 标签类型id */
    ems_tagtype_id?: number;
    /** 标签类型名称 */
    ems_tagtype_name?: string;
    /** 父节点id */
    ems_tagtype_pid?: number;
    /** 标签类型(热点:hotspot、导航:navigation、网页:html、视频融合:videofusion) */
    ems_tagtype_type?: string;
  };

  type TagtypeVo = {
    /** 创建时间 */
    ems_tagtype_createtime?: string;
    /** 图标文件 */
    ems_tagtype_iconfile?: Sysfile;
    /** 图标文件id */
    ems_tagtype_iconfileid?: number;
    /** 标签类型表 */
    ems_tagtype_id?: number;
    /** 是否是默认标签类型 */
    ems_tagtype_isdefault?: number;
    /** 是否需要上传图标(对根节点有效,0:否,1:是) */
    ems_tagtype_isupload?: number;
    /** 标签类型名称 */
    ems_tagtype_name?: string;
    /** 父节点id */
    ems_tagtype_pid?: number;
    ems_tagtype_tagtypes?: TagtypeVo[];
    /** 标签类型 */
    ems_tagtype_type?: string;
    /** 修改时间 */
    ems_tagtype_updatetime?: string;
  };

  type triggerJobParams = {
    /** 机器地址 */
    addressList?: string;
    /** 调度任务参数 */
    executorParam?: string;
    /** 调度任务id */
    id: number;
  };

  type updateNavigationParams = {
    /** 编辑导航标签PO类 */
    htmlEditPo: NavigationEditPo;
  };

  type uploadCoverParams = {
    /** 文件对象 */
    file: string;
  };

  type uploadCustomerLogoFileParams = {
    /** 文件对象 */
    file: string;
  };

  type uploadGuideFileParams = {
    /** 文件对象 */
    file: string;
  };

  type uploadPanoramaFileParams = {
    /** 文件对象 */
    file: string;
  };

  type uploadTagtypeParams = {
    /** 文件对象 */
    file: string;
    /** 文件类型 */
    type: string;
  };

  type VersionVo = {
    /** 版本表 */
    ems_version_id?: number;
    /** 是否当使用版本 0 不是 1 是 */
    ems_version_iscurrent?: number;
    /** 版本号 */
    ems_version_no?: number;
    /** 产品id */
    ems_version_productid?: number;
    /** 模块Vo列表 */
    moduleVos?: ModuleVo[];
  };

  type VideofusionAddPo = {
    /** 相机旋转角度("0,-7,0") */
    ems_videofusion_camrotation?: string;
    /** 设备id */
    ems_videofusion_deviceid?: number;
    /** 远平面距离 */
    ems_videofusion_far?: number;
    /** FLV视频流地址 */
    ems_videofusion_flvurl?: string;
    /** 图标高度比例 */
    ems_videofusion_heightratio?: number;
    /** 视频融合标签位置("-0.49,-7.71,-48.49") */
    ems_videofusion_location?: string;
    /** 视频融合标签名称 */
    ems_videofusion_name?: string;
    /** 近平面距离 */
    ems_videofusion_near?: number;
    /** 全景图id */
    ems_videofusion_panoramaid?: number;
    /** 参数信息 */
    ems_videofusion_param?: string;
    /** 视频融合标签旋转角度("0,-7,0") */
    ems_videofusion_rotation?: string;
    /** 标签类型id */
    ems_videofusion_tagtypeid?: number;
    /** 相机投影画面比例("0,0,0") */
    ems_videofusion_viewscale?: string;
    /** 图标宽度比例 */
    ems_videofusion_widthratio?: number;
  };

  type VideofusionEditPo = {
    /** 相机旋转角度("0,-7,0") */
    ems_videofusion_camrotation?: string;
    /** 设备id */
    ems_videofusion_deviceid?: number;
    /** 远平面距离 */
    ems_videofusion_far?: number;
    /** FLV视频流地址 */
    ems_videofusion_flvurl?: string;
    /** 图标高度比例 */
    ems_videofusion_heightratio?: number;
    /** 视频融合标签id */
    ems_videofusion_id?: number;
    /** 视频融合标签位置("-0.49,-7.71,-48.49") */
    ems_videofusion_location?: string;
    /** 视频融合标签名称 */
    ems_videofusion_name?: string;
    /** 近平面距离 */
    ems_videofusion_near?: number;
    /** 全景图id */
    ems_videofusion_panoramaid?: number;
    /** 参数信息 */
    ems_videofusion_param?: string;
    /** 视频融合标签旋转角度("0,-7,0") */
    ems_videofusion_rotation?: string;
    /** 标签类型id */
    ems_videofusion_tagtypeid?: number;
    /** 相机投影画面比例("0,0,0") */
    ems_videofusion_viewscale?: string;
    /** 图标宽度比例 */
    ems_videofusion_widthratio?: number;
  };

  type VideofusionVo = {
    /** 相机旋转角度("0,-7,0") */
    ems_videofusion_camrotation?: string;
    /** 创建时间 */
    ems_videofusion_createtime?: string;
    /** 设备id */
    ems_videofusion_deviceid?: number;
    /** 远平面距离 */
    ems_videofusion_far?: number;
    /** FLV视频流地址 */
    ems_videofusion_flvurl?: string;
    /** 图标高度比例 */
    ems_videofusion_heightratio?: number;
    /** 视频融合标签表 */
    ems_videofusion_id?: number;
    /** 视频融合标签位置("-0.49,-7.71,-48.49") */
    ems_videofusion_location?: string;
    /** 视频融合标签名称 */
    ems_videofusion_name?: string;
    /** 近平面距离 */
    ems_videofusion_near?: number;
    /** 全景图id */
    ems_videofusion_panoramaid?: number;
    /** 参数信息 */
    ems_videofusion_param?: string;
    /** 视频融合标签旋转角度("0,-7,0") */
    ems_videofusion_rotation?: string;
    /** 图标文件对象 */
    ems_videofusion_tagtypeiconfile?: Sysfile;
    /** 标签类型id */
    ems_videofusion_tagtypeid?: number;
    /** 更新时间 */
    ems_videofusion_updatetime?: string;
    /** 相机投影画面比例("0,0,0") */
    ems_videofusion_viewscale?: string;
    /** 图标宽度比例 */
    ems_videofusion_widthratio?: number;
  };

  type workHisValueParams = {
    /** 站房编号 */
    ems_instance_no: string;
    /** 结束时间 */
    endTime?: string;
    /** 因子名称数组 */
    polltants: string[];
    /** 开始时间 */
    startTime?: string;
  };

  type XxlJobGroup = {
    /** 执行器地址列表，多地址逗号分隔 */
    addressList?: string;
    /** 执行器地址类型：0=自动注册、1=手动录入 */
    addressType?: number;
    /** 执行器AppName */
    appname?: string;
    /** 客户id */
    customerId?: number;
    /** 执行器id */
    id?: number;
    /** 调度任务JobHandler与描述JSON数组 */
    jobHandlers?: string;
    registryList?: string[];
    /** 执行器名称 */
    title?: string;
    /** 修改时间 */
    updateTime?: string;
  };

  type XxlJobGroupAddPo = {
    /** 执行器AppName */
    appname?: string;
    /** 客户id */
    customerId?: number;
    /** 调度任务JobHandler与描述JSON数组 */
    jobHandlers?: string;
    /** 执行器名称 */
    title?: string;
  };

  type XxlJobGroupEditPo = {
    /** 执行器AppName */
    appname?: string;
    /** 客户id */
    customerId?: number;
    /** 执行器id */
    id?: number;
    /** 调度任务JobHandler与描述JSON数组 */
    jobHandlers?: string;
    /** 执行器名称 */
    title?: string;
  };

  type XxlJobGroupVo = {
    /** 执行器地址列表，多地址逗号分隔 */
    addressList?: string;
    /** 执行器地址类型：0=自动注册、1=手动录入 */
    addressType?: number;
    /** 执行器AppName */
    appname?: string;
    /** 客户id */
    customerId?: number;
    /** 客户Vo类 */
    customerVo?: CustomerVo;
    /** 执行器id */
    id?: number;
    /** 调度任务JobHandler与描述JSON数组 */
    jobHandlers?: string;
    registryList?: string[];
    /** 执行器名称 */
    title?: string;
    /** 修改时间 */
    updateTime?: string;
  };

  type XxlJobInfoAddPo = {
    /** 报警邮件 */
    alarmEmail?: string;
    /** 负责人 */
    author: string;
    /** 子任务ID，多个逗号分隔 */
    childJobId?: string;
    /** 阻塞处理策略(SERIAL_EXECUTION) */
    executorBlockStrategy: string;
    /** 失败重试次数 */
    executorFailRetryCount: number;
    /** 执行器，任务Handler名称 */
    executorHandler: string;
    /** 执行器，任务参数 */
    executorParam?: string;
    /** 执行器路由策略(FIRST) */
    executorRouteStrategy: string;
    /** 任务执行超时时间，单位秒 */
    executorTimeout: number;
    /** GLUE备注 */
    glueRemark?: string;
    /** GLUE源代码 */
    glueSource?: string;
    /** GLUE类型(BEAN、GLUE(Java)、GLUE(Shell)、GLUE(Python)、GLUE(PHP)、GLUE(Nodejs)、GLUE(PowerShell)) */
    glueType: string;
    /** 任务描述(名称) */
    jobDesc: string;
    /** 执行器主键ID */
    jobGroup: number;
    /** 调度过期策略(DO_NOTHING) */
    misfireStrategy: string;
    /** 调度配置，值含义取决于调度类型 */
    scheduleConf: string;
    /** 调度类型(无:NONE、CRON:CRON、固定速度:FIX_RATE) */
    scheduleType: string;
  };

  type XxlJobInfoEditPo = {
    /** 报警邮件 */
    alarmEmail?: string;
    /** 负责人 */
    author: string;
    /** 子任务ID，多个逗号分隔 */
    childJobId?: string;
    /** 阻塞处理策略(SERIAL_EXECUTION) */
    executorBlockStrategy: string;
    /** 失败重试次数 */
    executorFailRetryCount: number;
    /** 执行器，任务Handler名称 */
    executorHandler: string;
    /** 执行器，任务参数 */
    executorParam?: string;
    /** 执行器路由策略(FIRST) */
    executorRouteStrategy: string;
    /** 任务执行超时时间，单位秒 */
    executorTimeout: number;
    /** GLUE备注 */
    glueRemark?: string;
    /** GLUE源代码 */
    glueSource?: string;
    /** GLUE类型(BEAN、GLUE(Java)、GLUE(Shell)、GLUE(Python)、GLUE(PHP)、GLUE(Nodejs)、GLUE(PowerShell)) */
    glueType: string;
    /** 调度任务id */
    id?: number;
    /** 任务描述(名称) */
    jobDesc: string;
    /** 执行器主键ID */
    jobGroup: number;
    /** 调度过期策略(DO_NOTHING) */
    misfireStrategy: string;
    /** 调度配置，值含义取决于调度类型 */
    scheduleConf: string;
    /** 调度类型(无:NONE、CRON:CRON、固定速度:FIX_RATE) */
    scheduleType: string;
  };

  type XxlJobInfoVo = {
    /** 创建时间 */
    addTime?: string;
    /** 报警邮件 */
    alarmEmail?: string;
    /** 负责人 */
    author: string;
    /** 子任务ID，多个逗号分隔 */
    childJobId?: string;
    /** 阻塞处理策略 */
    executorBlockStrategy: string;
    /** 失败重试次数 */
    executorFailRetryCount: number;
    /** 执行器，任务Handler名称 */
    executorHandler: string;
    /** 执行器，任务参数 */
    executorParam?: string;
    /** 执行器路由策略 */
    executorRouteStrategy: string;
    /** 任务执行超时时间，单位秒 */
    executorTimeout: number;
    /** GLUE备注 */
    glueRemark?: string;
    /** GLUE源代码 */
    glueSource?: string;
    /** GLUE类型	#com.xxl.job.core.glue.GlueTypeEnum */
    glueType: string;
    /** GLUE更新时间 */
    glueUpdatetime?: string;
    /** 主键ID */
    id?: number;
    /** 任务描述(名称) */
    jobDesc: string;
    /** 执行器主键ID */
    jobGroup: number;
    /** 执行器Vo类 */
    jobGroupVo?: XxlJobGroupVo;
    /** 调度过期策略 */
    misfireStrategy: string;
    /** 调度配置，值含义取决于调度类型 */
    scheduleConf: string;
    /** 调度类型 */
    scheduleType: string;
    /** 上次调度时间 */
    triggerLastTime?: number;
    /** 下次调度时间 */
    triggerNextTime?: number;
    /** 调度状态：0-停止，1-运行 */
    triggerStatus?: number;
    /** 修改时间 */
    updateTime?: string;
  };

  type XxlJobLogVo = {
    /** 告警状态：0-默认、1-无需告警、2-告警成功、3-告警失败 */
    alarmStatus?: number;
    /** 客户ID */
    ems_customer_id?: number;
    /** 客户名称 */
    ems_customer_name?: string;
    /** 执行器地址，本次执行的地址 */
    executorAddress?: string;
    /** 失败重试次数 */
    executorFailRetryCount?: number;
    /** 执行器任务handler */
    executorHandler?: string;
    /** 执行器任务参数 */
    executorParam?: string;
    /** 执行器任务分片参数，格式如 1/2 */
    executorShardingParam?: string;
    /** 执行-状态 */
    handleCode?: number;
    /** 执行-日志 */
    handleMsg?: string;
    /** 执行-时间 */
    handleTime?: string;
    /** 主键ID */
    id?: number;
    /** 调度任务名称 */
    jobDesc?: string;
    /** 执行器主键ID */
    jobGroup?: number;
    /** 任务，主键ID */
    jobId?: number;
    /** 调度-结果 */
    triggerCode?: number;
    /** 调度-日志 */
    triggerMsg?: string;
    /** 调度-时间 */
    triggerTime?: string;
  };
}
