package com.shengqitech.wzzconnector.config;

import com.influxdb.LogLevel;
import com.influxdb.client.InfluxDBClient;
import com.influxdb.client.InfluxDBClientFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * @author : wsh
 * @Date : 2024/1/31
 * @Description:
 */
@Configuration
public class InfluxdbConfig {

    @Value("${spring.influx.url}")
    private String influxUrl;
    @Value("${spring.influx.bucket}")
    private String influxBucket;
    @Value("${spring.influx.org}")
    private String influxOrg;
    @Value("${spring.influx.token}")
    private String influxToken;


    @Bean
    public InfluxDBClient influxDBClient() {
//        InfluxDBClient influxDBClient = InfluxDBClientFactory.create(influxUrl, influxToken.toCharArray(),influxOrg,influxBucket);
//        influxDBClient.setLogLevel(LogLevel.BASIC);
//        return influxDBClient;
        return InfluxDBClientFactory.create(influxUrl, influxToken.toCharArray(), influxOrg, influxBucket);
    }

}
