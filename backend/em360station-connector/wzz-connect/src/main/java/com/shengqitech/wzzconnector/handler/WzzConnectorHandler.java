package com.shengqitech.wzzconnector.handler;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.WriteApiBlocking;
import com.influxdb.client.domain.WritePrecision;
import com.influxdb.client.write.Point;
import com.shengqitech.common.domains.*;
import com.shengqitech.common.http.RestClient;
import com.shengqitech.wzzconnector.utils.InfluxdbUtil;
import com.shengqitech.wzzconnector.utils.RedisCache;
import com.xxl.job.core.context.XxlJobHelper;
import com.xxl.job.core.handler.annotation.XxlJob;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.concurrent.TimeUnit;

/**
 * @author : wsh
 * @Date : 2024/1/10
 * @Description: 执行器
 */
@Component
public class WzzConnectorHandler {

    private final String accessTokenKey = "ems:wzzconnect";

    @Autowired
    private RestClient restClient;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private InfluxdbUtil influxdbUtil;
    @Value("${api.url}")
    private String apiUrl;
    @Value("${api.findInstance}")
    private String findInstance;
    @Value("${api.findDevice}")
    private String findDevice;
    @Value("${api.syncInstance}")
    private String syncInstance;
    @Value("${api.syncDevice}")
    private String syncDevice;
    @Value("${api.syncDeviceAlarm}")
    private String syncDeviceAlarm;

    @Value("${api.login}")
    private String login;
    @Value("${api.rtdValue}")
    private String rtdValue;
    @Value("${api.workRtdValue}")
    private String workRtdValue;
    @Value("${api.username}")
    private String username;
    @Value("${api.password}")
    private String password;

    // 令牌有效期（默认170分钟）
    @Value("${token.expireTime}")
    private int expireTime;

    /**
     * 检测站点同步
     */
    @XxlJob("syncInstance")
    public void syncInstance() {
        XxlJobHelper.log("监测站点同步");
        String token = createToken();

        String url = "http://121.40.69.68:8080/api/Open/digitaltwin/Station";
        ResponseEntity<JSONObject> responseEntity = restClient.get(url, null, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        List<Instance> instances = new ArrayList<>();
        if (body.getInteger("code") == 200) {
            JSONArray airstations = body.getJSONArray("data");
            if (airstations == null || airstations.size() == 0) {
                XxlJobHelper.log("暂无检测站点可同步");
            }

            for (int i = 0; i < airstations.size(); i++) {
                JSONObject airstation = airstations.getJSONObject(i);
                // 经度
                String siteLng = airstation.getString("SiteLng");
                // 纬度
                String siteLat = airstation.getString("SiteLat");
                // 站点名称
                String siteMnCodeName = airstation.getString("SiteMnCodeName");
                String emc_instance_coordinate = "POINT(" + siteLng + " " + siteLat + ")";
                // 创建时间
//                Long createTime = airstation.getLong("CreateTime");
                // 站点编号
                String siteMnCode = airstation.getString("SiteMnCode");

                // 查询检测站点是否存在
//                ResponseEntity<JSONObject> response = restClient.get(apiUrl + findInstanceByMap, params, JSONObject.class);
//                JSONObject jsonObject = response.getBody();
                // 检测站点
                Instance instance = Instance.builder().ems_instance_coordinate(emc_instance_coordinate).ems_instance_name(siteMnCodeName).ems_instance_no(siteMnCode).ems_instance_sectionid(null).ems_instance_address(airstation.getString("Addr")).build();
                instances.add(instance);

                // 查询检测站点是否重复
//                Instance instanceByNo = instanceMapper.getByNo(siteMnCode);
            }
        }
        String instanceStr = JSONObject.toJSONString(instances);
        ResponseEntity<JSONObject> response = restClient.postJsonWithAuthorization(apiUrl + syncInstance, instanceStr, token, JSONObject.class);
        JSONObject syncBody = response.getBody();
        if (syncBody.getInteger("code") == 200) {
            XxlJobHelper.log("同步成功！");
        }
    }

    /**
     * 设备同步
     */
    @XxlJob("syncDevice")
    public void syncDevice() {
        XxlJobHelper.log("设备同步");
        String token = createToken();
        List<DeviceSyncDto> deviceSyncDtos = new ArrayList<>();

        // 查询检测站点
        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") == 200) {
            JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
            for (int i = 0; i < instances.size(); i++) {
                JSONObject instance = instances.getJSONObject(i);
                String no = instance.getString("ems_instance_no");
                String goodsUrl = "http://121.40.69.68:8080/api/Open/digitaltwin/Goods/{SiteMnCode}";
                Map<String, String> pathParams = new HashMap<>();
                pathParams.put("SiteMnCode", no);
                String url = restClient.buildUrlWithParams(goodsUrl, null, pathParams);
                ResponseEntity<JSONObject> responseEntity = restClient.get(url, null, JSONObject.class);
                JSONObject body = responseEntity.getBody();
                if (body.getInteger("code") == 200) {

                    JSONArray jsonArray = body.getJSONArray("data");
                    if (jsonArray.size() != 0) {
                        for (int j = 0; j < jsonArray.size(); j++) {
                            JSONObject jsonObject = jsonArray.getJSONObject(j);
                            String monitorFactor = jsonObject.getString("MonitorFactor");
                            DeviceSyncDto deviceSyncDto = DeviceSyncDto.builder().ems_composition_name(jsonObject.getString("GoodsTypeName")).ems_composition_pid(monitorFactor == null ? 6 : 3).ems_product_type(jsonObject.getString("GoodsModelName")).ems_product_brand(jsonObject.getString("GoodsBrandName")).ems_device_name(jsonObject.getString("FullName")).ems_device_no(jsonObject.getString("EnCode")).ems_instance_no(no).build();
                            deviceSyncDtos.add(deviceSyncDto);
                        }
                    }
                }
            }
        }
        ResponseEntity<JSONObject> response = restClient.postJsonWithAuthorization(apiUrl + syncDevice, deviceSyncDtos, token, JSONObject.class);
        JSONObject body = response.getBody();
        if (body.getInteger("code") == 200) {
            XxlJobHelper.log("设备同步成功！");
        }
    }

    /**
     * 摄像头同步
     */
    @XxlJob("syncCamera")
    public void syncCamera() {
        XxlJobHelper.log("摄像头同步");
        String token = createToken();
        List<DeviceSyncDto> deviceSyncDtos = new ArrayList<>();
        // 查询检测站点
        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") == 200) {
            JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
            for (int i = 0; i < instances.size(); i++) {
                JSONObject instance = instances.getJSONObject(i);
                String no = instance.getString("ems_instance_no");
                String goodsUrl = "http://121.40.69.68:8080/api/Open/digitaltwin/StationMonitor/{SiteMnCode}";
                Map<String, String> pathParams = new HashMap<>();
                pathParams.put("SiteMnCode", no);
                String url = restClient.buildUrlWithParams(goodsUrl, null, pathParams);
                ResponseEntity<JSONObject> responseEntity = restClient.get(url, null, JSONObject.class);
                JSONObject body = responseEntity.getBody();
                if (body.getInteger("code") == 200) {
                    JSONArray jsonArray = body.getJSONArray("data");
                    if (jsonArray.size() != 0) {
                        for (int j = 0; j < jsonArray.size(); j++) {
                            JSONObject jsonObject = jsonArray.getJSONObject(j);
                            List<Configuration> configurations = new ArrayList<>();
                            // 摄像头位置
                            String devicePosName = jsonObject.getString("DevicePosName");
                            // 摄像头通道
                            String channelNo = jsonObject.getString("ChannelNo");
                            // 摄像头编号
                            String deviceSerial = jsonObject.getString("DeviceSerial");

                            // 预览地址
                            String previewUrl = previewUrl(deviceSerial, channelNo);

                            configurations.add(Configuration.builder().ems_configuration_name("安装位置").ems_configuration_value(devicePosName).build());
                            configurations.add(Configuration.builder().ems_configuration_name("通道").ems_configuration_value(channelNo).build());
                            configurations.add(Configuration.builder().ems_configuration_name("预览地址").ems_configuration_value(previewUrl).build());


                            DeviceSyncDto deviceSyncDto = DeviceSyncDto.builder().ems_composition_name("摄像头").ems_composition_pid(6).ems_product_type("camera").ems_product_brand("海康威视").ems_device_name(jsonObject.getString("DeviceName")).ems_device_no(deviceSerial + "@" + channelNo).configurations(configurations).ems_instance_no(no).build();
                            deviceSyncDtos.add(deviceSyncDto);
                        }
                    }
                }
            }
        }
        ResponseEntity<JSONObject> response = restClient.postJsonWithAuthorization(apiUrl + syncDevice, deviceSyncDtos, token, JSONObject.class);
        JSONObject body = response.getBody();
        if (body.getInteger("code") == 200) {
            XxlJobHelper.log("摄像头同步成功！");
        }
    }

    /**
     * 污染物实时数据同步
     */
    @XxlJob("syncRtdValue")
    public void syncRtdValue() {
        XxlJobHelper.log("实时数据同步");
        String token = createToken();

        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") != 200) {
            XxlJobHelper.log(findInstancesUrl + "查询检测站点失败");
            return;
        }

        JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
        for (int i = 0; i < instances.size(); i++) {
            JSONObject instance = instances.getJSONObject(i);
            String instanceNo = instance.getString("ems_instance_no");
            syncRtdValueForInstance(instanceNo, token);
        }
        String rtdValueUrl = apiUrl + rtdValue;
        ResponseEntity<JSONObject> responseEntity = restClient.getWithAuthorization(rtdValueUrl, null, token, JSONObject.class);
        XxlJobHelper.log("实时数据同步成功");
    }

    /**
     * 设备报警同步
     */
    @XxlJob("syncdeviceAlarm")
    public void syncStationAlarm() {
        XxlJobHelper.log("站房报警同步");
        String token = createToken();
        List<DeviceAlarm> deviceAlarms = new ArrayList<>();
        // 查询检测站点
        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") == 200) {
            JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
            for (int i = 0; i < instances.size(); i++) {
                JSONObject instance = instances.getJSONObject(i);
                String no = instance.getString("ems_instance_no");
                String alarmUrl = "http://121.40.69.68:8080/api/Open/digitaltwin/{SiteMnCode}";
                Map<String, String> pathParams = new HashMap<>();
                pathParams.put("SiteMnCode", no);
                String url = restClient.buildUrlWithParams(alarmUrl, null, pathParams);

                ResponseEntity<JSONObject> responseEntity = restClient.get(url, null, JSONObject.class);
                JSONObject body = responseEntity.getBody();
                if (body.getInteger("code") == 200) {
//                    JSONArray jsonArray = body.getJSONArray("data");
                    Map<String, Object> data = (Map<String, Object>) body.get("data");
                    List<Map<String, Object>> list = (List) data.get("list");
                    if (list != null && list.size() != 0) {
                        for (int j = 0; j < list.size(); j++) {
                            Map<String, Object> map = list.get(i);
//                            JSONObject jsonObject = list.getJSONObject(j);
                            Integer WarnSource = (Integer) map.get("WarnSource");
//                            if(WarnSource==1){
                            String deviceno = (String) map.get("device_id");
                            String happentime = (String) map.get("dtDataTime");
                            String alarmlog = map.get("warning_typeName") + "-" + map.get("warning_secTypeName") + "-" + map.get("warning_log");
                            Integer alarmleveid = (Integer) map.get("warning_level") + 1;
                            DeviceAlarm deviceAlarm = DeviceAlarm.builder()
                                    .ems_devicealarm_deviceno(deviceno)
                                    .ems_devicealarm_happentime(happentime)
                                    .ems_devicealarm_log(alarmlog)
                                    .ems_devicealarm_levelid(alarmleveid <= 0 ? 1 : alarmleveid).build();
                            deviceAlarms.add(deviceAlarm);
//                            }
                        }
                    }
                }
            }
        }

        ResponseEntity<JSONObject> response = restClient.postJsonWithAuthorization(apiUrl + syncDeviceAlarm, deviceAlarms, token, JSONObject.class);
        JSONObject body = response.getBody();
        if (body.getInteger("code") == 200) {
            XxlJobHelper.log("设备报警同步成功！");
        }
    }

    /**
     * 污染物历史数据同步
     */
    @XxlJob("syncHistoryValue")
    public void syncHistoryValue() {
        System.out.println("历史数据同步！");
        XxlJobHelper.log("历史数据同步！");
        String token = createToken();

        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") != 200) {
            XxlJobHelper.log(findInstancesUrl + "查询检测站点失败");
            return;
        }

        JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
        for (int i = 0; i < instances.size(); i++) {
            JSONObject instance = instances.getJSONObject(i);
            String instanceNo = instance.getString("ems_instance_no");
            String findDeviceUrl = apiUrl + findDevice;
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("ems_instance_no", instanceNo);
            ResponseEntity<JSONObject> responseEntity = restClient.getWithAuthorization(findDeviceUrl, params, token, JSONObject.class);
            JSONObject body = responseEntity.getBody();
            if (body.getInteger("code") != 200) {
                XxlJobHelper.log(findDeviceUrl + "查询检测设备失败");
                return;
            }
            StringBuilder deviceNoStr = new StringBuilder();
            JSONArray devices = body.getJSONArray("result");
            for (int j = 0; j < devices.size(); j++) {
                JSONObject device = devices.getJSONObject(j);
                String deviceNo = device.getString("ems_device_no");
                deviceNoStr.append(deviceNo);
                if (j < devices.size() - 1) {
                    deviceNoStr.append(",");
                }
            }
            String deviceNoStrValue = deviceNoStr.toString();
            if (!deviceNoStrValue.isEmpty()) {
                String url = "http://121.40.69.68:8080/api/Open/digitaltwin/DeviceRtdHis/{SiteMnCode}/{DeviceIds}";
                Map<String, String> pathParams = new HashMap<>();
                pathParams.put("SiteMnCode", instanceNo);
                pathParams.put("DeviceIds", deviceNoStrValue);
                Map<String, List<String>> queryParams = new HashMap<>();
                List<String> queryParamsList = new ArrayList<>();
                queryParamsList.add(getOneMinuteAgoTime());
                queryParams.put("dtBegin", queryParamsList);
                String accessUrl = restClient.buildUrlWithParams(url, queryParams, pathParams);
                ResponseEntity<JSONObject> response = restClient.get(accessUrl, null, JSONObject.class);
                JSONObject responseBody = response.getBody();
                if (responseBody.getInteger("code") != 200) {
                    System.out.println(accessUrl + "获取子站设备历史数据失败！");
                    XxlJobHelper.log(accessUrl + "获取子站设备历史数据失败");
                    continue;
                }

                List<Point> points = new ArrayList<>();
                JSONArray jsonArray = responseBody.getJSONArray("data");
                for (int j = 0; j < jsonArray.size(); j++) {
                    JSONObject jsonObject = jsonArray.getJSONObject(j);
                    String deviceId = jsonObject.getString("DeviceId");
                    JSONArray data = jsonObject.getJSONArray("Data");
                    for (int k = 0; k < data.size(); k++) {
                        LinkedHashMap linkedHashMap = (LinkedHashMap) data.get(k);
                        String dataTime = (String) linkedHashMap.get("DataTime");
                        LinkedHashMap<String, Double> rtdValue = (LinkedHashMap) linkedHashMap.get("RtdValue");
                        for (Map.Entry<String, Double> entry : rtdValue.entrySet()) {
                            String key = entry.getKey();
                            Double value = entry.getValue();
                            if (value != null) {
                                Map<String, String> tags = new HashMap<>();
                                tags.put("dataType", "pollutantHisValue");
                                tags.put("deviceNo", deviceId);
                                Map<String, Object> fields = new HashMap<>();
                                fields.put(key, value);
                                long time = TimestampConversion(dataTime);
                                Point point = Point.measurement(instanceNo)
                                        .addTags(tags)
                                        .addFields(fields)
                                        .time(time, WritePrecision.MS);
                                points.add(point);
                            }
                        }
                    }
                }
                System.out.println("points" + points);
                influxdbUtil.batchInsert(points);
            }

        }
        XxlJobHelper.log("历史数据同步完成！");
        System.out.println("历史数据同步完成！");
    }

    /**
     * 实时工况数据同步
     */
    @XxlJob("syncWorkRtdValue")
    public void syncWorkRtdValue() {
        System.out.println("实时工况数据同步！");
        XxlJobHelper.log("实时工况数据同步！");
        String token = createToken();
        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") != 200) {
            XxlJobHelper.log(findInstancesUrl + "查询检测站点失败");
            return;
        }
        JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
//        List<Point> points = new ArrayList<>();
        for (int i = 0; i < instances.size(); i++) {
            JSONObject instance = instances.getJSONObject(i);
            String instanceNo = instance.getString("ems_instance_no");
            String url = "http://121.40.69.68:8080/api/Open/digitaltwin/Station/{SiteMnCode}";
            Map<String, String> pathParams = new HashMap<>();
            pathParams.put("SiteMnCode", instanceNo);
            String accessUrl = restClient.buildUrlWithParams(url, null, pathParams);
            ResponseEntity<JSONObject> response = restClient.get(accessUrl, null, JSONObject.class);
            JSONObject responseBody = response.getBody();
            if (responseBody.getInteger("code") != 200) {
                System.out.println(accessUrl + "获取站房实时工况数据失败！");
                XxlJobHelper.log(accessUrl + "获取站房实时工况数据失败");
                continue;
            }
//            Map data = (Map) responseBody.get("data");
            String isExist = responseBody.getString("data");
            if (isExist.contains("不存在")){
                continue;
            }
            JSONObject data = responseBody.getJSONObject("data");
            // 数据标识时间：包含完整时分秒
            String data_str_sec = data.getString("data_str_sec");
            if (data_str_sec != null) {
                // 子站温度，多个温度值使用,分割
                String realtime_temp = data.getString("realtime_temp");
                // 子站湿度，多个湿度值使用,分割
                String realtime_humid = data.getString("realtime_humid");
                // 子站外部温度
                Double realtime_temp_outside = data.getDouble("realtime_temp_outside");
                // 子站外部湿度
                Double realtime_humid_outside = data.getDouble("realtime_humid_outside");
                // 子站外部压力
                Double realtime_pressure_outside = data.getDouble("realtime_pressure_outside");
                // 子站外风速
                Double realtime_wind = data.getDouble("realtime_wind");
                // 子站外风向
                Integer realtime_wind_direction = data.getInteger("realtime_wind_direction");
                // 标气CO压力
                Double std_co_pressure = data.getDouble("std_co_pressure");
                // 标气SO₂压力
                Double std_so2_pressure = data.getDouble("std_so2_pressure");
                // 标气NOx压力
                Double std_nox_pressure = data.getDouble("std_nox_pressure");
                // 进气压力
                Double in_pressure = data.getDouble("in_pressure");
                // 进气温度
                Double in_temp = data.getDouble("in_temp");
                // 进气湿度
                Double in_humid = data.getDouble("in_humid");
                // PM₂.₅出气标况流量
                Double liquid_pm25_std = data.getDouble("liquid_pm25_std");
                // PM₂.₅出气工况流量
                Double liquid_pm25 = data.getDouble("liquid_pm25");
                // PM₁₀出气标况流量
                Double liquid_pm10_std = data.getDouble("liquid_pm10_std");
                // PM₁₀出气工况流量
                Double liquid_pm10 = data.getDouble("liquid_pm10");
                // 废气标况流量
                Double liquid_out_std = data.getDouble("liquid_out_std");
                // 废气工况流量
                Double liquid_out = data.getDouble("liquid_out");
                // CO进气标况流量
                Double liquid_co_std = data.getDouble("liquid_co_std");
                // CO进气工况流量
                Double liquid_co = data.getDouble("liquid_co");
                Double liquid_so2_std = data.getDouble("liquid_so2_std");
                // SO₂进气标况流量
                Double liquid_so2 = data.getDouble("liquid_so2");
                // SO₂进气工况流量
                Double liquid_o3_std = data.getDouble("liquid_o3_std");
                // O₃进气标况流量
                Double liquid_o3 = data.getDouble("liquid_o3");
                // O₃进气工况流量
                Double liquid_nox_std = data.getDouble("liquid_nox_std");
                // NOx进气标况流量
                Double liquid_nox = data.getDouble("liquid_nox");
                // NOx进气工况流量
                String voltage = data.getString("voltage");
                // 1,2,3电压，多个电压值使用,分割
                String current = data.getString("current");
                // 1,2,3电流，多个电流值使用,分割
                String total_energy = data.getString("total_energy");
                // 总用电量，多个总用电量值使用,分割
                String total_power = data.getString("total_power");
                // 总功率，多个总功率值使用,分割
                String power_hz = data.getString("power_hz");
                // 频率：单位HZ赫兹，多个频率值使用,分割
                Double condensing_temperature = data.getDouble("condensing_temperature");
                // 冷凝温度
                Integer membrane_change_count = data.getInteger("membrane_change_count");
                // 自动换膜装置剩余滤膜数量
                Integer membrane_change_countall = data.getInteger("membrane_change_countall");
                // 换膜装置温度
                Double membrane_change_temp = data.getDouble("membrane_change_temp");
                // 换膜装置温度
                Double membrane_change_humid = data.getDouble("membrane_change_humid");
                // 换膜装置标况流量
                Double membrane_change_liquid = data.getDouble("membrane_change_liquid");
                // 换膜装置工况流量
                Double membrane_change_liquid_std = data.getDouble("membrane_change_liquid_std");
                // 换膜装置压力
                Double membrane_change_pressure = data.getDouble("membrane_change_pressure");
                // 门状态：0关着，1开着
                Integer door_state = data.getInteger("door_state");
                // 顶层门状态：0关着，1开着
                Integer up_door_state = data.getInteger("up_door_state");
                // 风机状态：0正常，1关闭
                Integer blower_state = data.getInteger("blower_state");
                // UPS状态：0正常，1断电
                Integer ups_state = data.getInteger("ups_state");
                // 火情状态：0正常，1有火情
                Integer fire_state = data.getInteger("fire_state");
                // 水情状态：0正常，1有水情
                Integer water_state = data.getInteger("water_state");
                // 分析仪PM₂.₅加热温度
                Double pm25_temp = data.getDouble("pm25_temp");
                // 分析仪PM₁₀加热温度
                Double pm10_temp = data.getDouble("pm10_temp");
                // 空调设置温度
                Integer air_condition_settemp = data.getInteger("air_condition_settemp");
                // 空调模式：0制冷，1制热
                Integer air_condition_setstate = data.getInteger("air_condition_setstate");
                // PM₂.₅浓度值均值
                Boolean HasAlarm = data.getBoolean("HasAlarm");
                // PM₁₀浓度值均值
                Double pm25_data = data.getDouble("pm25_data");
                // PM₁.₀浓度值均值
                Double pm10_data = data.getDouble("pm10_data");
                // PM₁.₀出气工况流量
                Double liquid_pm1 = data.getDouble("liquid_pm1");
                // NOy出气工况流量1
                Double liquid_noy = data.getDouble("liquid_noy");
                // NOy出气工况流量2
                Double liquid_noy_1 = data.getDouble("liquid_noy_1");
                // NH₃出气工况流量
                Double liquid_nh3 = data.getDouble("liquid_nh3");
                // PM₁.₀出气标况流量
                Double liquid_pm1_std = data.getDouble("liquid_pm1_std");
                // NOy出气标况流量1
                Double liquid_noy_std = data.getDouble("liquid_noy_std");
                // NOy出气标况流量2
                Double liquid_noy_1_std = data.getDouble("liquid_noy_1_std");
                // NH₃出气标况流量
                Double liquid_nh3_std = data.getDouble("liquid_nh3_std");
                // 分析仪PM₁.₀加热温度
                Double pm1_temp = data.getDouble("pm1_temp");
                // 数采仪软件版本号
                String wzzStaionVersion = data.getString("wzzStaionVersion");
                Map<String, String> tags = new HashMap<>();
                tags.put("dataType", "workRtdValue");
                Map<String, Object> fields = new HashMap<>();
                fields.put("realtime_temp", realtime_temp);
                fields.put("realtime_humid", realtime_humid);
                fields.put("realtime_temp_outside", realtime_temp_outside);
                fields.put("realtime_humid_outside", realtime_humid_outside);
                fields.put("realtime_pressure_outside", realtime_pressure_outside);
                fields.put("realtime_wind_direction", realtime_wind_direction);
                fields.put("std_co_pressure", std_co_pressure);
                fields.put("std_so2_pressure", std_so2_pressure);
                fields.put("std_nox_pressure", std_nox_pressure);
                fields.put("in_pressure", in_pressure);
                fields.put("in_temp", in_temp);
                fields.put("in_humid", in_humid);
                fields.put("liquid_pm25_std", liquid_pm25_std);
                fields.put("liquid_pm25", liquid_pm25);
                fields.put("liquid_pm10_std", liquid_pm10_std);
                fields.put("liquid_pm10", liquid_pm10);
                fields.put("liquid_out_std", liquid_out_std);
                fields.put("liquid_out", liquid_out);
                fields.put("liquid_co_std", liquid_co_std);
                fields.put("liquid_co", liquid_co);
                fields.put("liquid_so2_std", liquid_so2_std);
                fields.put("liquid_so2", liquid_so2);
                fields.put("liquid_o3_std", liquid_o3_std);
                fields.put("liquid_o3", liquid_o3);
                fields.put("liquid_nox_std", liquid_nox_std);
                fields.put("liquid_nox", liquid_nox);
                fields.put("voltage", voltage);
                fields.put("current", current);
                fields.put("total_energy", total_energy);
                fields.put("total_power", total_power);
                fields.put("power_hz", power_hz);
                fields.put("condensing_temperature", condensing_temperature);
                fields.put("membrane_change_count", membrane_change_count);
                fields.put("membrane_change_countall", membrane_change_countall);
                fields.put("membrane_change_temp", membrane_change_temp);
                fields.put("membrane_change_humid", membrane_change_humid);
                fields.put("membrane_change_liquid", membrane_change_liquid);
                fields.put("membrane_change_liquid_std", membrane_change_liquid_std);
                fields.put("membrane_change_pressure", membrane_change_pressure);
                fields.put("door_state", door_state);
                fields.put("up_door_state", up_door_state);
                fields.put("ups_state", ups_state);
                fields.put("fire_state", fire_state);
                fields.put("water_state", water_state);
                fields.put("pm25_temp", pm25_temp);
                fields.put("pm10_temp", pm10_temp);
                fields.put("air_condition_settemp", air_condition_settemp);
                fields.put("air_condition_setstate", air_condition_setstate);
                fields.put("HasAlarm", HasAlarm ? 1 : 0);
                fields.put("pm25_data", pm25_data);
                fields.put("pm10_data", pm10_data);
                fields.put("liquid_pm1", liquid_pm1);
                fields.put("liquid_noy", liquid_noy);
                fields.put("liquid_noy_1", liquid_noy_1);
                fields.put("liquid_nh3", liquid_nh3);
                fields.put("liquid_pm1_std", liquid_pm1_std);
                fields.put("liquid_noy_std", liquid_noy_std);
                fields.put("liquid_noy_1_std", liquid_noy_1_std);
                fields.put("liquid_nh3_std", liquid_nh3_std);
                fields.put("pm1_temp", pm1_temp);
                fields.put("wzzStaionVersion", wzzStaionVersion);

                influxdbUtil.insert(instanceNo, tags, fields, TimestampConversion(data_str_sec));
            }
        }
        String workRtdValueUlr = apiUrl + workRtdValue;
        ResponseEntity<JSONObject> responseEntity = restClient.getWithAuthorization(workRtdValueUlr, null, token, JSONObject.class);
        XxlJobHelper.log("实时工况数据同步完成！");
        System.out.println("实时工况数据同步完成！");
    }

    /**
     * 历史工况数据同步
     */
    @XxlJob("syncWorkHisValue")
    public void syncWorkHisValue() {
        System.out.println("历史工况数据同步！");
        XxlJobHelper.log("历史工况数据同步！");
        String token = createToken();
        String findInstancesUrl = apiUrl + findInstance;
        ResponseEntity<JSONObject> findInstancesUrlResponse = restClient.getWithAuthorization(findInstancesUrl, null, token, JSONObject.class);
        JSONObject findInstancesUrlResponseBody = findInstancesUrlResponse.getBody();
        if (findInstancesUrlResponseBody.getInteger("code") != 200) {
            XxlJobHelper.log(findInstancesUrl + "查询检测站点失败");
            return;
        }
        JSONArray instances = findInstancesUrlResponseBody.getJSONObject("result").getJSONArray("list");
        for (int i = 0; i < instances.size(); i++) {
            JSONObject instance = instances.getJSONObject(i);
            String instanceNo = instance.getString("ems_instance_no");
            String url = "http://121.40.69.68:8080/api/Open/digitaltwin/WorkModeDeviceRtdHis/{SiteMnCode}";
            Map<String, String> pathParams = new HashMap<>();
            pathParams.put("SiteMnCode", instanceNo);

            Map<String, List<String>> queryParams = new HashMap<>();
            List<String> queryParamsList = new ArrayList<>();
            queryParamsList.add(getOneMinuteAgoTime());
            queryParams.put("dtBegin", queryParamsList);

            String accessUrl = restClient.buildUrlWithParams(url, queryParams, pathParams);
            ResponseEntity<JSONObject> response = restClient.get(accessUrl, null, JSONObject.class);
            JSONObject responseBody = response.getBody();
            if (responseBody.getInteger("code") != 200) {
                System.out.println(accessUrl + "获取站房历史工况数据失败！");
                XxlJobHelper.log(accessUrl + "获取站房历史工况数据失败");
                continue;
            }
            String isExist = responseBody.getString("data");
            if (!isExist.contains("不存在") && responseBody.getInteger("code") == 200) {
                JSONArray data = responseBody.getJSONArray("data");
                for (int j = 0; j < data.size(); j++) {
                    JSONObject jsonObject = data.getJSONObject(j);
                    String data_str_sec = jsonObject.getString("data_str_sec");
                    if (data_str_sec != null) {
                        // 子站温度，多个温度值使用,分割
                        String realtime_temp = jsonObject.getString("realtime_temp");
                        // 子站湿度，多个湿度值使用,分割
                        String realtime_humid = jsonObject.getString("realtime_humid");
                        // 子站外部温度
                        Double realtime_temp_outside = jsonObject.getDouble("realtime_temp_outside");
                        // 子站外部湿度
                        Double realtime_humid_outside = jsonObject.getDouble("realtime_humid_outside");
                        // 子站外部压力
                        Double realtime_pressure_outside = jsonObject.getDouble("realtime_pressure_outside");
                        // 子站外风速
                        Double realtime_wind = jsonObject.getDouble("realtime_wind");
                        // 子站外风向
                        Integer realtime_wind_direction = jsonObject.getInteger("realtime_wind_direction");
                        // 标气CO压力
                        Double std_co_pressure = jsonObject.getDouble("std_co_pressure");
                        // 标气SO₂压力
                        Double std_so2_pressure = jsonObject.getDouble("std_so2_pressure");
                        // 标气NOx压力
                        Double std_nox_pressure = jsonObject.getDouble("std_nox_pressure");
                        // 进气压力
                        Double in_pressure = jsonObject.getDouble("in_pressure");
                        // 进气温度
                        Double in_temp = jsonObject.getDouble("in_temp");
                        // 进气湿度
                        Double in_humid = jsonObject.getDouble("in_humid");
                        // PM₂.₅出气标况流量
                        Double liquid_pm25_std = jsonObject.getDouble("liquid_pm25_std");
                        // PM₂.₅出气工况流量
                        Double liquid_pm25 = jsonObject.getDouble("liquid_pm25");
                        // PM₁₀出气标况流量
                        Double liquid_pm10_std = jsonObject.getDouble("liquid_pm10_std");
                        // PM₁₀出气工况流量
                        Double liquid_pm10 = jsonObject.getDouble("liquid_pm10");
                        // 废气标况流量
                        Double liquid_out_std = jsonObject.getDouble("liquid_out_std");
                        // 废气工况流量
                        Double liquid_out = jsonObject.getDouble("liquid_out");
                        // CO进气标况流量
                        Double liquid_co_std = jsonObject.getDouble("liquid_co_std");
                        // CO进气工况流量
                        Double liquid_co = jsonObject.getDouble("liquid_co");
                        Double liquid_so2_std = jsonObject.getDouble("liquid_so2_std");
                        // SO₂进气标况流量
                        Double liquid_so2 = jsonObject.getDouble("liquid_so2");
                        // SO₂进气工况流量
                        Double liquid_o3_std = jsonObject.getDouble("liquid_o3_std");
                        // O₃进气标况流量
                        Double liquid_o3 = jsonObject.getDouble("liquid_o3");
                        // O₃进气工况流量
                        Double liquid_nox_std = jsonObject.getDouble("liquid_nox_std");
                        // NOx进气标况流量
                        Double liquid_nox = jsonObject.getDouble("liquid_nox");
                        // NOx进气工况流量
                        String voltage = jsonObject.getString("voltage");
                        // 1,2,3电压，多个电压值使用,分割
                        String current = jsonObject.getString("current");
                        // 1,2,3电流，多个电流值使用,分割
                        String total_energy = jsonObject.getString("total_energy");
                        // 总用电量，多个总用电量值使用,分割
                        String total_power = jsonObject.getString("total_power");
                        // 总功率，多个总功率值使用,分割
                        String power_hz = jsonObject.getString("power_hz");
                        // 频率：单位HZ赫兹，多个频率值使用,分割
                        Double condensing_temperature = jsonObject.getDouble("condensing_temperature");
                        // 冷凝温度
                        Integer membrane_change_count = jsonObject.getInteger("membrane_change_count");
                        // 自动换膜装置剩余滤膜数量
                        Integer membrane_change_countall = jsonObject.getInteger("membrane_change_countall");
                        // 换膜装置温度
                        Double membrane_change_temp = jsonObject.getDouble("membrane_change_temp");
                        // 换膜装置温度
                        Double membrane_change_humid = jsonObject.getDouble("membrane_change_humid");
                        // 换膜装置标况流量
                        Double membrane_change_liquid = jsonObject.getDouble("membrane_change_liquid");
                        // 换膜装置工况流量
                        Double membrane_change_liquid_std = jsonObject.getDouble("membrane_change_liquid_std");
                        // 换膜装置压力
                        Double membrane_change_pressure = jsonObject.getDouble("membrane_change_pressure");
                        // 门状态：0关着，1开着
                        Integer door_state = jsonObject.getInteger("door_state");
                        // 顶层门状态：0关着，1开着
                        Integer up_door_state = jsonObject.getInteger("up_door_state");
                        // 风机状态：0正常，1关闭
                        Integer blower_state = jsonObject.getInteger("blower_state");
                        // UPS状态：0正常，1断电
                        Integer ups_state = jsonObject.getInteger("ups_state");
                        // 火情状态：0正常，1有火情
                        Integer fire_state = jsonObject.getInteger("fire_state");
                        // 水情状态：0正常，1有水情
                        Integer water_state = jsonObject.getInteger("water_state");
                        // 分析仪PM₂.₅加热温度
                        Double pm25_temp = jsonObject.getDouble("pm25_temp");
                        // 分析仪PM₁₀加热温度
                        Double pm10_temp = jsonObject.getDouble("pm10_temp");
                        // 空调设置温度
                        Integer air_condition_settemp = jsonObject.getInteger("air_condition_settemp");
                        // 空调模式：0制冷，1制热
                        Integer air_condition_setstate = jsonObject.getInteger("air_condition_setstate");
                        // PM₂.₅浓度值均值
                        Boolean HasAlarm = jsonObject.getBoolean("HasAlarm");
                        // PM₁₀浓度值均值
                        Double pm25_data = jsonObject.getDouble("pm25_data");
                        // PM₁.₀浓度值均值
                        Double pm10_data = jsonObject.getDouble("pm10_data");
                        // PM₁.₀出气工况流量
                        Double liquid_pm1 = jsonObject.getDouble("liquid_pm1");
                        // NOy出气工况流量1
                        Double liquid_noy = jsonObject.getDouble("liquid_noy");
                        // NOy出气工况流量2
                        Double liquid_noy_1 = jsonObject.getDouble("liquid_noy_1");
                        // NH₃出气工况流量
                        Double liquid_nh3 = jsonObject.getDouble("liquid_nh3");
                        // PM₁.₀出气标况流量
                        Double liquid_pm1_std = jsonObject.getDouble("liquid_pm1_std");
                        // NOy出气标况流量1
                        Double liquid_noy_std = jsonObject.getDouble("liquid_noy_std");
                        // NOy出气标况流量2
                        Double liquid_noy_1_std = jsonObject.getDouble("liquid_noy_1_std");
                        // NH₃出气标况流量
                        Double liquid_nh3_std = jsonObject.getDouble("liquid_nh3_std");
                        // 分析仪PM₁.₀加热温度
                        Double pm1_temp = jsonObject.getDouble("pm1_temp");
                        // 数采仪软件版本号
                        String wzzStaionVersion = jsonObject.getString("wzzStaionVersion");


                        Map<String, String> tags = new HashMap<>();
                        tags.put("dataType", "workHisValue");
                        Map<String, Object> fields = new HashMap<>();
                        fields.put("realtime_temp", realtime_temp);
                        fields.put("realtime_humid", realtime_humid);
                        fields.put("realtime_temp_outside", realtime_temp_outside);
                        fields.put("realtime_humid_outside", realtime_humid_outside);
                        fields.put("realtime_pressure_outside", realtime_pressure_outside);
                        fields.put("realtime_wind_direction", realtime_wind_direction);
                        fields.put("std_co_pressure", std_co_pressure);
                        fields.put("std_so2_pressure", std_so2_pressure);
                        fields.put("std_nox_pressure", std_nox_pressure);
                        fields.put("in_pressure", in_pressure);
                        fields.put("in_temp", in_temp);
                        fields.put("in_humid", in_humid);
                        fields.put("liquid_pm25_std", liquid_pm25_std);
                        fields.put("liquid_pm25", liquid_pm25);
                        fields.put("liquid_pm10_std", liquid_pm10_std);
                        fields.put("liquid_pm10", liquid_pm10);
                        fields.put("liquid_out_std", liquid_out_std);
                        fields.put("liquid_out", liquid_out);
                        fields.put("liquid_co_std", liquid_co_std);
                        fields.put("liquid_co", liquid_co);
                        fields.put("liquid_so2_std", liquid_so2_std);
                        fields.put("liquid_so2", liquid_so2);
                        fields.put("liquid_o3_std", liquid_o3_std);
                        fields.put("liquid_o3", liquid_o3);
                        fields.put("liquid_nox_std", liquid_nox_std);
                        fields.put("liquid_nox", liquid_nox);
                        fields.put("voltage", voltage);
                        fields.put("current", current);
                        fields.put("total_energy", total_energy);
                        fields.put("total_power", total_power);
                        fields.put("power_hz", power_hz);
                        fields.put("condensing_temperature", condensing_temperature);
                        fields.put("membrane_change_count", membrane_change_count);
                        fields.put("membrane_change_countall", membrane_change_countall);
                        fields.put("membrane_change_temp", membrane_change_temp);
                        fields.put("membrane_change_humid", membrane_change_humid);
                        fields.put("membrane_change_liquid", membrane_change_liquid);
                        fields.put("membrane_change_liquid_std", membrane_change_liquid_std);
                        fields.put("membrane_change_pressure", membrane_change_pressure);
                        fields.put("door_state", door_state);
                        fields.put("up_door_state", up_door_state);
                        fields.put("ups_state", ups_state);
                        fields.put("fire_state", fire_state);
                        fields.put("water_state", water_state);
                        fields.put("pm25_temp", pm25_temp);
                        fields.put("pm10_temp", pm10_temp);
                        fields.put("air_condition_settemp", air_condition_settemp);
                        fields.put("air_condition_setstate", air_condition_setstate);
                        fields.put("HasAlarm", HasAlarm ? 1 : 0);
                        fields.put("pm25_data", pm25_data);
                        fields.put("pm10_data", pm10_data);
                        fields.put("liquid_pm1", liquid_pm1);
                        fields.put("liquid_noy", liquid_noy);
                        fields.put("liquid_noy_1", liquid_noy_1);
                        fields.put("liquid_nh3", liquid_nh3);
                        fields.put("liquid_pm1_std", liquid_pm1_std);
                        fields.put("liquid_noy_std", liquid_noy_std);
                        fields.put("liquid_noy_1_std", liquid_noy_1_std);
                        fields.put("liquid_nh3_std", liquid_nh3_std);
                        fields.put("pm1_temp", pm1_temp);
                        fields.put("wzzStaionVersion", wzzStaionVersion);
                        influxdbUtil.insert(instanceNo, tags, fields, TimestampConversion(data_str_sec));
                    }
                }
                XxlJobHelper.log("历史工况数据同步完成！");
                System.out.println("历史工况数据同步完成！");
            }

        }
    }


    private void syncRtdValueForInstance(String instanceNo, String token) {
        String findDeviceUrl = apiUrl + findDevice;
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("ems_instance_no", instanceNo);
        ResponseEntity<JSONObject> responseEntity = restClient.getWithAuthorization(findDeviceUrl, params, token, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        if (body.getInteger("code") != 200 || body.getJSONArray("result").size() == 0) {
            XxlJobHelper.log(findDeviceUrl + "查询检测设备失败");
            return;
        }

        StringBuilder deviceNoStr = new StringBuilder();
        JSONArray devices = body.getJSONArray("result");
        for (int j = 0; j < devices.size(); j++) {
            JSONObject device = devices.getJSONObject(j);
            String deviceNo = device.getString("ems_device_no");
            deviceNoStr.append(deviceNo);
            if (j < devices.size() - 1) {
                deviceNoStr.append(",");
            }
        }

        String deviceNoStrValue = deviceNoStr.toString();
        if (!deviceNoStrValue.isEmpty()) {
            String url = "http://121.40.69.68:8080/api/Open/digitaltwin/DeviceRtd/{SiteMnCode}/{DeviceIds}";
            Map<String, String> pathParams = new HashMap<>();
            pathParams.put("SiteMnCode", instanceNo);
            pathParams.put("DeviceIds", deviceNoStrValue);
            String accessUrl = restClient.buildUrlWithParams(url, null, pathParams);
            ResponseEntity<JSONObject> response = restClient.get(accessUrl, null, JSONObject.class);
            JSONObject responseBody = response.getBody();
            String isExist = responseBody.getString("data");
            if (!isExist.contains("不存在") && responseBody.getInteger("code") == 200) {
                JSONArray data = responseBody.getJSONArray("data");
                List<Point> points = new ArrayList<>();
                for (int k = 0; k < data.size(); k++) {
                    JSONObject json = data.getJSONObject(k);
                    if (json.get("RtdValue") != null) {
                        String dataTime = json.getString("DataTime");
                        String deviceId = json.getString("DeviceId");
                        JSONObject rtdValue = json.getJSONObject("RtdValue");
                        addRtdValueToPoint(instanceNo, points, deviceId, dataTime, rtdValue);
                    }
                }
                influxdbUtil.batchInsert(points);
            }
        }
    }

    private void addRtdValueToPoint(String instanceNo, List<Point> points, String deviceId, String dataTime, JSONObject rtdValue) {
        Map<String, String> tags = new HashMap<>();
        Map<String, Object> fields = new HashMap<>();
        long time = TimestampConversion(dataTime);

        for (String key : rtdValue.keySet()) {
            Object value = rtdValue.get(key);
            Double doubleValue = null;
            if (value instanceof Integer) {
                doubleValue = ((Integer) value).doubleValue();
            } else if (value instanceof Double) {
                doubleValue = (Double) value;
            }
            fields.put(key, doubleValue);
        }
        tags.put("deviceNo", deviceId);
        tags.put("dataType", "pollutantRtdValue");
        Point point = Point.measurement(instanceNo)
                .addTags(tags)
                .addFields(fields)
                .time(time, WritePrecision.MS);
//                    .time(Instant.now().toEpochMilli(), WritePrecision.MS);
        points.add(point);
    }


    private String previewUrl(String no, String channelNo) {
        String previewUrl = "";
        String url = "http://121.40.69.68:8080/api/Open/digitaltwin/MonitorVideo/{deviceSerial}";
        Map<String, String> pathParams = new HashMap<>();
        pathParams.put("deviceSerial", no + "@" + channelNo);
        String apiUrl = restClient.buildUrlWithParams(url, null, pathParams);
        ResponseEntity<JSONObject> responseEntity = restClient.get(apiUrl, null, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        if (body.getInteger("code") == 200) {
            Map map = (Map) body.get("data");
            previewUrl = (String) map.get("previewUrl");
        }
        return previewUrl;
    }

    private String createToken() {
        String token = redisCache.getCacheObject(accessTokenKey);
        if (token == null || token.isEmpty()) {
            login();
        }
        token = redisCache.getCacheObject(accessTokenKey);
        return token;
    }


    /**
     * 字符串转时间戳
     *
     * @param date
     * @return
     */
    private long TimestampConversion(String date) {
        // 定义日期时间格式
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

        // 解析字符串为 LocalDateTime 对象
        LocalDateTime localDateTime = LocalDateTime.parse(date, formatter);

        // 将 LocalDateTime 转换为带时区的 ZonedDateTime 对象
        ZoneId zoneId = ZoneId.of("Asia/Shanghai");
        ZonedDateTime zonedDateTime = ZonedDateTime.of(localDateTime, zoneId);

        // 将 LocalDateTime 转换为时间戳（Epoch 时间）
        long timestamp = zonedDateTime.toInstant().toEpochMilli();
        return timestamp;
    }

    private void login() {
        String url = apiUrl + login;
        JSONObject json = new JSONObject();
        json.put("username", username);
        json.put("password", password);
        ResponseEntity<JSONObject> responseEntity = restClient.postJson(url, json, JSONObject.class);
        JSONObject body = responseEntity.getBody();
        if (body.getInteger("code") == 200) {
            redisCache.setCacheObject(accessTokenKey, body.getString("result"), expireTime, TimeUnit.MINUTES);
        }
    }

    private String getOneMinuteAgoTime() {
        // 获取当前时间并格式化为 ISO 8601 格式
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime oneMinuteAgo = now.minusHours(1);
        LocalDateTime truncatedDateTime = oneMinuteAgo.withSecond(0);
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm:ss");
        String dtBeginValue = truncatedDateTime.format(formatter);
        return dtBeginValue;
    }
}
