package com.shengqitech.ems;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import springfox.documentation.oas.annotations.EnableOpenApi;

@EnableOpenApi
@MapperScan("com.shengqitech.ems.mappers")
@SpringBootApplication(exclude = { DataSourceAutoConfiguration.class })
public class EmstationApplication {

    public static void main(String[] args) {
        SpringApplication.run(EmstationApplication.class, args);
    }

}
