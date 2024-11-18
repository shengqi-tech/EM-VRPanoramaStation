package com.shengqitech.ems.common.exception.user;

/**
 * @author : wsh
 * @Date : 2024/3/4
 * @Description: 用户已存在异常类
 */
public class UserExistsException extends UserException {
    private static final long serialVersionUID = 1L;

    public UserExistsException() {
        super("user.already.exists", null);
    }
}
