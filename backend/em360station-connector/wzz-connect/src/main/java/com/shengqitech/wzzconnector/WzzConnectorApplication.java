package com.shengqitech.wzzconnector;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

/**
 * 杭州微智造连接器
 */
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class WzzConnectorApplication {
    public static void main(String[] args) {
        SpringApplication.run(WzzConnectorApplication.class, args);
    }
}
