package com.shengqitech.ems.websocket;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;

/**
 * Auth : wsh
 * Date : 2020/11/21
 */
@Configuration
@EnableWebSocket
public class SpringWebSocketConfig implements WebSocketConfigurer {

    @Autowired
    private PollutantRtdValueWebSocket pollutantRtdValueWebSocket;
    @Autowired
    private DeviceAlarmWebSocket deviceAlarmWebSocket;
    @Autowired
    private PollutantMinuteWebSocket pollutantMinuteWebSocket;
    @Autowired
    private WorkRtdValueWebSocket workRtdValueWebSocket;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(pollutantRtdValueWebSocket,"/monitordata/rtdValueList")
                .addInterceptors(new SpringWebSocketHandlerInterceptor()).setAllowedOrigins("*")
                .addHandler(deviceAlarmWebSocket,"/deviceAlarm/list")
                .addInterceptors(new SpringWebSocketHandlerInterceptor()).setAllowedOrigins("*")
                .addHandler(workRtdValueWebSocket,"/monitordata/workRtdValueList")
                .addInterceptors(new SpringWebSocketHandlerInterceptor()).setAllowedOrigins("*")
                .addHandler(pollutantMinuteWebSocket,"/monitordata/pollutantMinute")
                .addInterceptors(new SpringWebSocketHandlerInterceptor()).setAllowedOrigins("*");
    }

    /**
     * 该bean 为解决websocket与spring定时任务冲突
     * @return
     */
    @Bean
    public TaskScheduler taskScheduler() {
        ThreadPoolTaskScheduler scheduling = new ThreadPoolTaskScheduler();
        scheduling.setPoolSize(10);
        scheduling.initialize();
        return scheduling;
    }
}