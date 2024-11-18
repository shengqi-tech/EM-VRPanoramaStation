package com.shengqitech.ems.common.exception.role;

/**
 * @author : wsh
 * @Date : 2024/3/4
 * @Description: 角色已存在异常
 */
public class RoleExistsException extends RoleException{
    private static final long serialVersionUID = 1L;

    public RoleExistsException() {
        super("role.already.exists", null);
    }
}
