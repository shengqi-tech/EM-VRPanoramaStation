package com.shengqitech.ems.common.exception.customer;

/**
 * @author : wsh
 * @Date : 2024/3/8
 * @Description: 客户存在组成异常
 */
public class CustomerExistsCompositionException extends CustomerException {
    private static final long serialVersionUID = 1L;

    public CustomerExistsCompositionException() {
        super("customer.exists.composition", null);
    }
}
