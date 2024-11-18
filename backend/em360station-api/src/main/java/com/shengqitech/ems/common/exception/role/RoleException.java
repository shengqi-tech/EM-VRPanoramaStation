package com.shengqitech.ems.common.exception.role;

import com.shengqitech.ems.common.exception.base.BaseException;

/**
 * @author : wsh
 * @Date : 2024/3/4
 * @Description: 角色信息异常类
 */
public class RoleException extends BaseException {
    private static final long serialVersionUID = 1L;

    public RoleException(String code, Object[] args) {
        super("role", code, args, null);
    }
}
