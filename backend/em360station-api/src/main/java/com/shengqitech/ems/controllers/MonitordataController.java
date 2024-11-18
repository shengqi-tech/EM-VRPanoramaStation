package com.shengqitech.ems.controllers;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;
import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.system.redis.RedisCache;
import com.shengqitech.ems.system.utils.InfluxdbUtil;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.websocket.PollutantRtdValueWebSocket;
import com.shengqitech.ems.websocket.WorkRtdValueWebSocket;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.TextMessage;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author : wsh
 * @Date : 2024/2/3
 * @Description: 监测数据
 */
@RestController
@RequestMapping("/monitordata")
@Api(value = "监测数据管理", tags = "MonitordataController")
public class MonitordataController {

    @Value("${spring.influx.bucket}")
    private String bucket;

    @Autowired
    private InfluxdbUtil influxdbUtil;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private PollutantRtdValueWebSocket pollutantRtdValueWebSocket;

    @Autowired
    private WorkRtdValueWebSocket workRtdValueWebSocket;

    public static final String FORMAT_UTC = "yyyy-MM-dd'T'HH:mm:ss'Z'";


    @GetMapping("/rtdValue")
    public Wrapper rtdValue() {
        Map<String, JSONArray> map = new HashMap<>();
        Set<String> keys = (Set<String>) redisCache.keys(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + "*");
        List<String> multiCacheValue = redisCache.getMultiCacheValue(keys);
        List<String> collect = multiCacheValue.stream().distinct().collect(Collectors.toList());

        for (String s : collect) {
            StringBuilder sb = new StringBuilder();
            sb.append("from(bucket:\"" + bucket + "\")");
            List<String> times = formatTime();
            sb.append("|> range(start: ").append(localToUTC(times.get(1))).append(", ");
            sb.append("stop: ").append(localToUTC(times.get(0))).append(")");
            sb.append("|> filter(fn: (r) => r[\"_measurement\"] == \"").append(s).append("\"").append(")");
            sb.append("|> filter(fn: (r) => r[\"dataType\"] == ").append("\"pollutantRtdValue\"").append(")");
            sb.append("|> last()");
            sb.append("|> yield(name: \"last\")");
            List<FluxTable> tables = influxdbUtil.query(sb.toString());

            JSONArray jsonArray = new JSONArray();
            for (FluxTable fluxTable : tables) {
                List<FluxRecord> records = fluxTable.getRecords();
                for (FluxRecord fluxRecord : records) {
                    // 站房编号
                    String measurement = fluxRecord.getMeasurement();
                    // 设备编号
                    String deviceNo = (String) fluxRecord.getValueByKey("deviceNo");
                    // 因子
                    String polltant = fluxRecord.getField();
                    // 值
                    Double rtdValue = (Double) fluxRecord.getValue();
                    Instant time = fluxRecord.getTime();
                    ZoneId zoneId = ZoneId.systemDefault();
                    ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    String formattedTime = formatter.format(zonedDateTime);

                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("ems_instance_no", measurement);
                    jsonObject.put("ems_device_no", deviceNo);
                    jsonObject.put("polltant", polltant);
                    jsonObject.put("rtdValue", rtdValue);
                    jsonObject.put("time", formattedTime);
                    jsonArray.add(jsonObject);
                }
            }

            map.put(s, jsonArray);
        }
        pollutantRtdValueWebSocket.sendMessageToUSERS(new TextMessage(JSON.toJSONString(map)));
        return WrapMapper.ok();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_instance_no", value = "站房编号", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "ems_device_no", value = "设备编号", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "startTime", value = "开始时间", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "endTime", value = "结束时间", dataTypeClass = String.class, required = false),
    })
    @ApiOperation(value = "查询污染物历史数据", nickname = "hisValue")
    @MyLog(title = "查询污染物历史数据", businessType = BusinessType.SELECT)
    @GetMapping("/hisValue")
    public Wrapper hisValue(String ems_instance_no, String ems_device_no, String startTime, String endTime) {

        if (StringUtils.isEmpty(startTime) || StringUtils.isEmpty(endTime)){
            // 获取当前时间
            LocalDateTime currentDateTime = LocalDateTime.now();
            // 获取之前一天的时间
            LocalDateTime localDateTime = currentDateTime.minusDays(1);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            endTime = currentDateTime.format(formatter);
            startTime = localDateTime.format(formatter);
            System.out.println();
        }

        StringBuilder sb = new StringBuilder();
        sb.append("from(bucket:\"" + bucket + "\")");
        sb.append("|> range(start: ").append(localToUTC(startTime)).append(", ");
        sb.append("stop: ").append(localToUTC(endTime)).append(")");
        sb.append("|> filter(fn: (r) => r[\"_measurement\"] == \"").append(ems_instance_no).append("\"").append(")");
        sb.append("|> filter(fn: (r) => r[\"deviceNo\"] == \"").append(ems_device_no).append("\"").append(")");
        sb.append("|> filter(fn: (r) => r[\"dataType\"] == ").append("\"pollutantHisValue\"").append(")");
        sb.append("|> yield(name: \"mean\")");
        List<FluxTable> tables = influxdbUtil.query(sb.toString());
        JSONArray groupedRecordsArray = new JSONArray();
        for (FluxTable fluxTable : tables) {
            List<FluxRecord> records = fluxTable.getRecords();
            JSONArray groupArray = new JSONArray();

            for (FluxRecord fluxRecord : records) {
                // 站房编号
                String measurement = fluxRecord.getMeasurement();
                // 设备编号
                String deviceNo = (String) fluxRecord.getValueByKey("deviceNo");
                // 因子
                String polltant = fluxRecord.getField();
                // 值
                Double rtdValue = (Double) fluxRecord.getValue();
                Instant time = fluxRecord.getTime();
                ZoneId zoneId = ZoneId.systemDefault();
                ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedTime = formatter.format(zonedDateTime);

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("ems_instance_no", measurement);
                jsonObject.put("ems_device_no", deviceNo);
                jsonObject.put("polltant", polltant);
                jsonObject.put("hisValue", rtdValue);
                jsonObject.put("time", formattedTime);

                groupArray.add(jsonObject);
            }

            groupedRecordsArray.add(groupArray);
        }
        return WrapMapper.ok(groupedRecordsArray);
    }

    @GetMapping("/workRtdValue")
    public Wrapper workRtdValue() {
        Map<String, JSONArray> map = new HashMap<>();
        Set<String> keys = (Set<String>) redisCache.keys(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + "*");
        List<String> multiCacheValue = redisCache.getMultiCacheValue(keys);
        List<String> collect = multiCacheValue.stream().distinct().collect(Collectors.toList());

        for (String s : collect) {
            StringBuilder sb = new StringBuilder();
            sb.append("from(bucket:\"" + bucket + "\")");
            List<String> times = formatTime();
            sb.append("|> range(start: ").append(localToUTC(times.get(1))).append(", ");
            sb.append("stop: ").append(localToUTC(times.get(0))).append(")");
            sb.append("|> filter(fn: (r) => r[\"_measurement\"] == \"").append(s).append("\"").append(")");
            sb.append("|> filter(fn: (r) => r[\"dataType\"] == ").append("\"workRtdValue\"").append(")");
            sb.append("|> last()");
            sb.append("|> yield(name: \"last\")");
            List<FluxTable> tables = influxdbUtil.query(sb.toString());

            JSONArray jsonArray = new JSONArray();
            for (FluxTable fluxTable : tables) {
                List<FluxRecord> records = fluxTable.getRecords();
                for (FluxRecord fluxRecord : records) {
                    // 站房编号
                    String measurement = fluxRecord.getMeasurement();
                    // 因子
                    String polltant = fluxRecord.getField();
                    // 值
                    Object rtdValue = fluxRecord.getValue();
                    Instant time = fluxRecord.getTime();
                    ZoneId zoneId = ZoneId.systemDefault();
                    ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                    String formattedTime = formatter.format(zonedDateTime);

                    JSONObject jsonObject = new JSONObject();
                    jsonObject.put("ems_instance_no", measurement);
                    jsonObject.put("polltant", polltant);
                    jsonObject.put("workRtdValue", rtdValue);
                    jsonObject.put("time", formattedTime);
                    jsonArray.add(jsonObject);
                }
            }

            map.put(s, jsonArray);
        }
        workRtdValueWebSocket.sendMessageToUSERS(new TextMessage(JSON.toJSONString(map)));
        return WrapMapper.ok();
    }


    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_instance_no", value = "站房编号", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "polltants", value = "因子名称数组", dataTypeClass = String.class, required = true,allowMultiple = true),
            @ApiImplicitParam(name = "startTime", value = "开始时间", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "endTime", value = "结束时间", dataTypeClass = String.class, required = false),
    })
    @ApiOperation(value = "查询历史工况数据", nickname = "workHisValue")
    @MyLog(title = "查询历史工况数据", businessType = BusinessType.SELECT)
    @GetMapping("/workHisValue")
    public Wrapper workHisValue(String ems_instance_no, String[] polltants, String startTime, String endTime) {
        if (StringUtils.isEmpty(startTime) || StringUtils.isEmpty(endTime)){
            // 获取当前时间
            LocalDateTime currentDateTime = LocalDateTime.now();
            // 获取之前一天的时间
            LocalDateTime localDateTime = currentDateTime.minusDays(1);
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
            endTime = currentDateTime.format(formatter);
            startTime = localDateTime.format(formatter);
        }

        StringBuilder sb = new StringBuilder();
        sb.append("from(bucket:\"" + bucket + "\")");
        sb.append("|> range(start: ").append(localToUTC(startTime)).append(", ");
        sb.append("stop: ").append(localToUTC(endTime)).append(")");
        sb.append("|> filter(fn: (r) => r[\"_measurement\"] == \"").append(ems_instance_no).append("\"").append(")");
        sb.append("|> filter(fn: (r) => r[\"dataType\"] == ").append("\"workHisValue\"").append(")");
        sb.append("|> filter(fn: (r) => ");

        // 构建过滤条件部分的字符串
        for (int i = 0; i < polltants.length; i++) {
            String polltant = polltants[i];

            // 将当前元素添加到过滤条件中
            sb.append("r[\"_field\"] == \"").append(polltant).append("\"");

            // 添加逻辑运算符 "or"，除非是最后一个元素
            if (i < polltants.length - 1) {
                sb.append(" or ");
            }
            if (i == polltants.length - 1){
                sb.append(")");
            }
        }

        sb.append("|> yield(name: \"mean\")");

        List<FluxTable> tables = influxdbUtil.query(sb.toString());
        JSONArray groupedRecordsArray = new JSONArray();

        // 使用 Map 来进行分组
        Map<String, JSONArray> groupMap = new HashMap<>();

        for (FluxTable fluxTable : tables) {
            JSONArray valueArray = new JSONArray();
            List<FluxRecord> records = fluxTable.getRecords();

            for (FluxRecord fluxRecord : records) {
                String measurement = fluxRecord.getMeasurement();
                String polltant = fluxRecord.getField();
                String workHisValue = "" + fluxRecord.getValue();

                if (workHisValue.contains(",")) {
                    String[] split = workHisValue.split(",");
                    for (int i = 0; i < split.length; i++) {
                        Instant time = fluxRecord.getTime();
                        ZoneId zoneId = ZoneId.systemDefault();
                        ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                        String formattedTime = formatter.format(zonedDateTime);

                        JSONObject jsonObject = new JSONObject();
                        jsonObject.put("ems_instance_no", measurement);
                        jsonObject.put("polltant", polltant + "_" + i);
                        jsonObject.put("workHisValue", split[i]);
                        jsonObject.put("time", formattedTime);

                        // 根据 polltant 进行分组
                        String key = polltant + "_" + i;
                        JSONArray groupArray = groupMap.getOrDefault(key, new JSONArray());
                        groupArray.add(jsonObject);
                        groupMap.put(key, groupArray);
                    }
                    continue;
                }
                Instant time = fluxRecord.getTime();
                ZoneId zoneId = ZoneId.systemDefault();
                ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
                String formattedTime = formatter.format(zonedDateTime);

                JSONObject jsonObject = new JSONObject();
                jsonObject.put("ems_instance_no", measurement);
                jsonObject.put("polltant", polltant);
                jsonObject.put("workHisValue", workHisValue);
                jsonObject.put("time", formattedTime);

                valueArray.add(jsonObject);
            }
            if (valueArray.size() != 0){
                groupedRecordsArray.add(valueArray);
            }
        }

        // 将分组后的数据添加到 groupedRecordsArray
        for (JSONArray groupArray : groupMap.values()) {
            groupedRecordsArray.add(groupArray);
        }


//        for (FluxTable fluxTable : tables) {
//            List<FluxRecord> records = fluxTable.getRecords();
//            JSONArray groupArray = new JSONArray();
//
//            for (FluxRecord fluxRecord : records) {
//                // 站房编号
//                String measurement = fluxRecord.getMeasurement();
//                // 因子
//                String polltant = fluxRecord.getField();
//                // 值
//                String workHisValue = "" + fluxRecord.getValue();
//                if (workHisValue.contains(",")){
//                    String[] split = workHisValue.split(",");
//                    for (int i = 0; i < split.length; i++) {
//                        Instant time = fluxRecord.getTime();
//                        ZoneId zoneId = ZoneId.systemDefault();
//                        ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
//                        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//                        String formattedTime = formatter.format(zonedDateTime);
//
//                        JSONObject jsonObject = new JSONObject();
//                        jsonObject.put("ems_instance_no", measurement);
//                        jsonObject.put("polltant", polltant + "_" + i);
//                        jsonObject.put("workHisValue", split[i]);
//                        jsonObject.put("time", formattedTime);
//                        groupArray.add(jsonObject);
//                    }
////                    continue;
//                }
//
//
//                Instant time = fluxRecord.getTime();
//                ZoneId zoneId = ZoneId.systemDefault();
//                ZonedDateTime zonedDateTime = ZonedDateTime.ofInstant(time, zoneId);
//                DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
//                String formattedTime = formatter.format(zonedDateTime);
//
//                JSONObject jsonObject = new JSONObject();
//                jsonObject.put("ems_instance_no", measurement);
//                jsonObject.put("polltant", polltant);
//                jsonObject.put("workHisValue", workHisValue);
//                jsonObject.put("time", formattedTime);
//
//                groupArray.add(jsonObject);
//            }
//
//            groupedRecordsArray.add(groupArray);
//        }
        return WrapMapper.ok(groupedRecordsArray);
    }


    //普通时间转为UTC
    private String localToUTC(String localTimeStr) {
        try {
            Date localDate = getLocalSDF().parse(localTimeStr);
            return getUTCSDF().format(localDate);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        return null;
    }

    private SimpleDateFormat getLocalSDF() {
        return new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
    }

    private SimpleDateFormat getUTCSDF() {
        SimpleDateFormat utcSDF = new SimpleDateFormat(FORMAT_UTC);
        utcSDF.setTimeZone(TimeZone.getTimeZone("UTC"));
        return utcSDF;
    }

    private List<String> formatTime() {
        List<String> times = new ArrayList<>();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        times.add(sdf.format(calendar.getTime()));
        calendar.add(Calendar.MINUTE, -5);
        Date time = calendar.getTime();
        String format = sdf.format(time);
        times.add(format);
        return times;
    }

    public static void main(String[] args) {
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Calendar calendar = Calendar.getInstance();
        System.out.println(sdf.format(calendar.getTime()));
        calendar.add(Calendar.MINUTE, -5);
        Date time = calendar.getTime();
        String format = sdf.format(time);
        System.out.println(format);
    }

}
