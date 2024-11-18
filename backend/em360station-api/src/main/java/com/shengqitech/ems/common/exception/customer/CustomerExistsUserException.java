package com.shengqitech.ems.common.exception.customer;


/**
 * @author : wsh
 * @Date : 2024/3/8
 * @Description: 客户存在用户异常
 */
public class CustomerExistsUserException extends CustomerException {

    private static final long serialVersionUID = 1L;

    public CustomerExistsUserException() {
        super("customer.exists.user", null);
    }

}
