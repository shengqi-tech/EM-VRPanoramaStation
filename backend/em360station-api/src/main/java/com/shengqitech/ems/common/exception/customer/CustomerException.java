package com.shengqitech.ems.common.exception.customer;

import com.shengqitech.ems.common.exception.base.BaseException;

/**
 * @author : wsh
 * @Date : 2024/3/8
 * @Description: 客户信息异常类
 */
public class CustomerException extends BaseException {
    private static final long serialVersionUID = 1L;

    public CustomerException(String code, Object[] args) {
        super("user", code, args, null);
    }
}
