package com.shengqitech.ems.websocket;

import com.alibaba.fastjson2.JSON;
import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.models.vo.DeviceAlarmVo;
import com.shengqitech.ems.services.IDeviceAlarmService;
import com.shengqitech.ems.system.redis.RedisCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * Auth : wsh
 * Date : 2020/11/21
 */
@Component
@Slf4j
public class DeviceAlarmWebSocket extends BaseWebSocket {

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private IDeviceAlarmService deviceAlarmService;

    public DeviceAlarmWebSocket() {
    }

    @Override
    public void sendMessageToUSERS(TextMessage message) {
        for (String userId : USERS.keySet()) {
            try {
                if (USERS.get(userId).isOpen() && userId.contains("/deviceAlarm/list")) {
                    String instanceNo = redisCache.getCacheObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + userId);
                    String payload = message.getPayload();
                    JSONObject json = JSON.parseObject(payload);
                    JSONArray jsonArray = json.getJSONArray(instanceNo);
                    if (jsonArray != null && !jsonArray.isEmpty()){
                        USERS.get(userId).sendMessage(new TextMessage(JSON.toJSONString(jsonArray)));
                    }else {
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

    private void sendMessage(String path){
        Set<String> keys = (Set<String>) redisCache.keys(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + path + "*");
        List<String> multiCacheValue = redisCache.getMultiCacheValue(keys);
        List<String> collect = multiCacheValue.stream().distinct().collect(Collectors.toList());
        Map<String, List<DeviceAlarmVo>> deviceAlarms = deviceAlarmService.findByStationNo(collect);
        this.sendMessageToUSERS(new TextMessage(JSON.toJSONString(deviceAlarms)));
    }
}
