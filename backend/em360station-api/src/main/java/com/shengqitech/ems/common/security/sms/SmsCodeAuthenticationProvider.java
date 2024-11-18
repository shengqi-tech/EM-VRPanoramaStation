package com.shengqitech.ems.common.security.sms;

import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.common.security.service.SysPermissionService;
import com.shengqitech.ems.common.security.service.TokenService;
import com.shengqitech.ems.mappers.CustomerMapper;
import com.shengqitech.ems.mappers.SysuserMapper;
import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.domains.LoginUser;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.system.redis.RedisCache;
import com.shengqitech.ems.system.utils.SecurityUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.Map;

/**
 * @author : wsh
 * @Date : 2024/1/16
 * @Description: 短信登陆鉴权 Provider，要求实现 AuthenticationProvider 接口
 */
@Component
public class SmsCodeAuthenticationProvider implements AuthenticationProvider {
    private UserDetailsService userDetailsService;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private SysuserMapper userMapper;

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private SysPermissionService permissionService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        SmsCodeAuthenticationToken authenticationToken = (SmsCodeAuthenticationToken) authentication;

        String mobile = (String) authenticationToken.getPrincipal();
        // 校验验证码
        checkSmsCode(mobile);
        // 查询是否存在
        Sysuser user = userMapper.selectUserByUserName(mobile);
        if (user == null){
            // 注册用户
            addUser(mobile);
        }
//        Sysuser user = userMapper.selectUserByUserName(mobile);
        UserDetails userDetails = createLoginUser(user == null ? userMapper.selectUserByUserName(mobile) : user);
//        UserDetails userDetails = userDetailsService.loadUserByUsername(mobile);

        // 此时鉴权成功后，应当重新 new 一个拥有鉴权的 authenticationResult 返回
        SmsCodeAuthenticationToken authenticationResult = new SmsCodeAuthenticationToken(userDetails, userDetails.getAuthorities());

        authenticationResult.setDetails(authenticationToken.getDetails());

        return authenticationResult;
    }

    /**
     * 校验验证码
     * @param mobile
     */
    private void checkSmsCode(String mobile) {
        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
        String inputCode = request.getParameter("smsCode");

//        Map<String, Object> smsCode = (Map<String, Object>) request.getSession().getAttribute("smsCode");
        Map cacheMap = redisCache.getCacheObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.SYS_CODE + ":" + mobile);
        if(cacheMap == null) {
            throw new BadCredentialsException("未检测到申请验证码");
        }

        String mobileStr = (String) cacheMap.get("mobile");
        Integer smsCode = (Integer) cacheMap.get("smsCode");

        if(!mobileStr.equals(mobile)) {
            throw new BadCredentialsException("申请的手机号码与登录手机号码不一致");
        }
        if(smsCode != Integer.parseInt(inputCode)) {
            throw new BadCredentialsException("验证码错误");
        }
    }

    private void addUser(String mobile){
        Date now = new Date();
        Customer customer = Customer.builder()
                .ems_customer_createtime(now)
                .ems_customer_createtime(now)
                .ems_customer_isrealname(0)
                .build();
        customerMapper.insert(customer);

        Sysuser sysuser = Sysuser.builder()
                .ems_sysuser_loginname(mobile)
                .ems_sysuser_password(SecurityUtils.encryptPassword("shengqi-tech"))
                .ems_sysuser_customerid(customer.getEms_customer_id())
                .ems_sysuser_status(1)
                .ems_sysuser_avatarfileid(3423)
                .build();
        userMapper.insert(sysuser);
        userMapper.insertUserRoles(sysuser.getEms_sysuser_id(), new Integer[]{5});
    }

    private UserDetails createLoginUser(Sysuser user) {
//        tokenService.createToken(user)
        return new LoginUser(user.getEms_sysuser_id(), user, permissionService.getMenuPermission(user));
    }

    @Override
    public boolean supports(Class<?> authentication) {
        // 判断 authentication 是不是 SmsCodeAuthenticationToken 的子类或子接口
        return SmsCodeAuthenticationToken.class.isAssignableFrom(authentication);
    }

    public UserDetailsService getUserDetailsService() {
        return userDetailsService;
    }

    public void setUserDetailsService(UserDetailsService userDetailsService) {
        this.userDetailsService = userDetailsService;
    }
}

