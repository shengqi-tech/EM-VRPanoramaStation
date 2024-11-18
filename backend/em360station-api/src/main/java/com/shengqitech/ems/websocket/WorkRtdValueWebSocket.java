package com.shengqitech.ems.websocket;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.influxdb.query.FluxRecord;
import com.influxdb.query.FluxTable;
import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.system.redis.RedisCache;
import com.shengqitech.ems.system.utils.InfluxdbUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

/**
 * @author : wsh
 * @Date : 2022/11/2
 * @Description: 实时工况数据
 */
@Component
@Slf4j
public class WorkRtdValueWebSocket extends BaseWebSocket {

    @Value("${spring.influx.bucket}")
    private String bucket;
    @Autowired
    private RedisCache redisCache;

    @Autowired
    private InfluxdbUtil influxdbUtil;

    public static final String FORMAT_UTC = "yyyy-MM-dd'T'HH:mm:ss'Z'";

    public WorkRtdValueWebSocket() {
    }

    @Override
    public void sendMessageToUSERS(TextMessage message) {
        for (String userId : USERS.keySet()) {
            try {
                if (USERS.get(userId).isOpen() && userId.contains("/monitordata/workRtdValueList")) {
                    String instanceNo = redisCache.getCacheObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + userId);
                    String payload = message.getPayload();
                    JSONObject json = JSON.parseObject(payload);
                    JSONArray jsonArray = json.getJSONArray(instanceNo);
                    if (jsonArray != null && !jsonArray.isEmpty()) {
                        USERS.get(userId).sendMessage(new TextMessage(JSON.toJSONString(jsonArray)));
                    } else {
                        USERS.get(userId).sendMessage(new TextMessage(JSON.toJSONString(null)));
                    }
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
        /**
         * 收到消息，自定义处理机制，实现业务
         */
        log.info("服务器收到消息：" + message);
        JSONObject json = JSON.parseObject(message.getPayload());
        String instanceNo = json.getString("ems_instance_no");
        String path = session.getUri().getPath();
        String userId = session.getId();
        redisCache.setCacheObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + path + CacheConstants.SEGMENT_KEY + userId, instanceNo);

        sendMessage(path);
    }

    private void sendMessage(String path) {
        Map<String, JSONArray> map = new HashMap<>();
        Set<String> keys = (Set<String>) redisCache.keys(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + path + "*");
        List<String> multiCacheValue = redisCache.getMultiCacheValue(keys);
        List<String> collect = multiCacheValue.stream().distinct().collect(Collectors.toList());

        for (String s : collect) {
            StringBuilder sb = new StringBuilder();
            sb.append("from(bucket:\"" + bucket + "\")");
            List<String> times = formatTime();
            sb.append("|> range(start: ").append(localToUTC(times.get(1))).append(", ");
            sb.append("stop: ").append(localToUTC(times.get(0))).append(")");
            sb.append("|> filter(fn: (r) => r[\"_measurement\"] == \"").append(s).append("\")");
            sb.append("|> filter(fn: (r) => r[\"dataType\"] == \"workRtdValue\")");
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
//                    String deviceNo = (String) fluxRecord.getValueByKey("deviceNo");
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
//                    jsonObject.put("ems_device_no", deviceNo);
                    jsonObject.put("polltant", polltant);
                    jsonObject.put("workRtdValue", rtdValue);
                    jsonObject.put("time", formattedTime);
                    jsonArray.add(jsonObject);
                }
            }

            map.put(s, jsonArray);
        }
        this.sendMessageToUSERS(new TextMessage(JSON.toJSONString(map)));
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
}
