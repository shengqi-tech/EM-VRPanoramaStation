package com.shengqitech.ems.websocket;

import org.springframework.stereotype.Component;
import org.springframework.web.socket.TextMessage;

import java.io.IOException;

/**
 * @author : wsh
 * @Date : 2022/11/2
 * @Description:
 */
@Component
public class PollutantMinuteWebSocket extends BaseWebSocket {
    public PollutantMinuteWebSocket() {
    }

    @Override
    public void sendMessageToUSERS(TextMessage message) {
        for (String userId : USERS.keySet()) {
            try {
                if (USERS.get(userId).isOpen() && userId.contains("/monitordata/pollutantMinute")) {
                    USERS.get(userId).sendMessage(message);
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
    }
}
