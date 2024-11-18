package com.shengqitech.ems.common.security.service;

import com.shengqitech.ems.common.exception.ServiceException;
import com.shengqitech.ems.models.domains.LoginUser;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.services.ISysuserService;
import com.shengqitech.ems.system.utils.MessageUtils;
import com.shengqitech.ems.system.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

/**
 * 用户验证处理
 *
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    private static final Logger log = LoggerFactory.getLogger(UserDetailsServiceImpl.class);

    @Autowired
    private ISysuserService userService;

    @Autowired
    private SysPasswordService passwordService;

    @Autowired
    private SysPermissionService permissionService;

    @Override
    public UserDetails loadUserByUsername(String username) {
        Sysuser user = userService.selectUserByUserName(username);
        if (StringUtils.isNull(user)) {
            log.info("登录用户：{} 不存在.", username);
            throw new ServiceException(MessageUtils.message("user.not.exists"));
        } /*else if (UserStatus.DELETED.getCode().equals(user.getDelFlag())) {
            log.info("登录用户：{} 已被删除.", username);
            throw new ServiceException(MessageUtils.message("user.password.delete"));
        } else if (UserStatus.DISABLE.getCode().equals(user.getStatus())) {
            log.info("登录用户：{} 已被停用.", username);
            throw new ServiceException(MessageUtils.message("user.blocked"));
        }*/

        passwordService.validate(user);

        return createLoginUser(user);
    }

    public UserDetails createLoginUser(Sysuser user) {
        return new LoginUser(user.getEms_sysuser_id(), user, permissionService.getMenuPermission(user));
    }
}
