package com.shengqitech.ems.common.exception.item;

import com.shengqitech.ems.common.exception.base.BaseException;

/**
 * @author : wsh
 * @Date : 2024/3/7
 * @Description: 菜单信息异常类
 */
public class ItemException extends BaseException {
    private static final long serialVersionUID = 1L;

    public ItemException(String code, Object[] args) {
        super("item", code, args, null);
    }
}
