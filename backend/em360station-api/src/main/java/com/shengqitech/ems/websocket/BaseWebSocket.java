package com.shengqitech.ems.websocket;

import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.services.IDeviceAlarmService;
import com.shengqitech.ems.system.redis.RedisCache;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

/**
 * @author : wsh
 * @Date : 2022/11/2
 * @Description:
 */
@Component
@Slf4j
public class BaseWebSocket extends TextWebSocketHandler {

    @Autowired
    private RedisCache redisCache;


    //Map来存储WebSocketSession，key用USER_ID 即在线用户列表
    public static final Map<String, WebSocketSession> USERS;

    static {
        USERS = new HashMap<String, WebSocketSession>();
    }

    public BaseWebSocket() {
    }

    /**
     * 连接成功时候，会触发页面上onopen方法
     */
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {

        log.info("用户" + session.getId() + "建立连接！");
        String path = session.getUri().getPath();
        String userId = session.getId();
        USERS.put(path + CacheConstants.SEGMENT_KEY + userId, session);
        log.info("当前websocket线上用户数量:" + USERS.size());

        //这块会实现自己业务，比如，当用户登录后，会把离线消息推送给用户
        //TextMessage returnMessage = new TextMessage("成功建立socket连接，你将收到的离线");
        //session.sendMessage(returnMessage);
    }

    /**
     * 关闭连接时触发
     */
    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
//        String userId= (String) session.getAttributes().get(USER_ID);
        String userId = session.getId();
        String path = session.getUri().getPath();
        USERS.remove(path + CacheConstants.SEGMENT_KEY + userId);
        redisCache.deleteObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + path + CacheConstants.SEGMENT_KEY + userId);
        log.info("用户" + userId + "已退出！");
        log.info("剩余websocket在线用户" + USERS.size());
    }

    /**
     * js调用websocket.send时候，会调用该方法
     */
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        super.handleTextMessage(session, message);
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        if (session.isOpen()) {
            session.close();
        }
//        String userId= (String) session.getAttributes().get(USER_ID);
        String userId = session.getId();
        String path = session.getUri().getPath();
        USERS.remove(path + CacheConstants.SEGMENT_KEY + userId);
        redisCache.deleteObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.WEBSOCKET_INSTANCE_NO + CacheConstants.SEGMENT_KEY + path + CacheConstants.SEGMENT_KEY + userId);
        log.info("传输出现异常，关闭websocket连接... ");
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }


    /**
     * 给某个用户发送消息
     *
     * @param message
     */
    public void sendMessageToUser( TextMessage message) {
    }

    /**
     * 给所有在线用户发送消息
     *
     * @param message
     */
    public void sendMessageToUSERS(TextMessage message) {
        for (String userId : USERS.keySet()) {
            try {
                if (USERS.get(userId).isOpen()) {
                    USERS.get(userId).sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }




}
