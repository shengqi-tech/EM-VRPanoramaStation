package com.shengqitech.ems.system.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;

@Configuration
public class WebAppConfig extends WebMvcConfigurerAdapter {


//    @Value("${file.upload}")
//    private String uploadPath;


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {

        /** 图片访问路径的映射 */
//        registry.addResourceHandler("/**").addResourceLocations("file:" + uploadPath);

        /** swagger-ui.html*/
        registry.addResourceHandler("swagger-ui.html")
                .addResourceLocations("classpath:/META-INF/resources/");

        registry.addResourceHandler("/webjars/**")
                .addResourceLocations("classpath:/META-INF/resources/webjars/springfox-swagger-ui/");

        /**knif4j  doc.html*/
        registry.addResourceHandler("doc.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }

}
