package com.shengqitech.ems.common.security.handler;

import com.alibaba.fastjson2.JSON;
import com.shengqitech.ems.common.security.service.TokenService;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.models.domains.LoginUser;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/**
 * @author : wsh
 * @Date : 2024/1/16
 * @Description: 验证成功处理
 */
@Component
@Slf4j
public class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private TokenService tokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        log.info("登录成功");
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        String token = tokenService.createToken(loginUser);

        response.setContentType("application/json;charset=UTF-8");
        response.getWriter().write(JSON.toJSONString(WrapMapper.ok(token)));
    }
}

