package com.shengqitech.ems.common.exception.item;

import com.shengqitech.ems.common.exception.user.UserException;

/**
 * @author : wsh
 * @Date : 2024/3/7
 * @Description: 菜单已存在异常
 */
public class ItemExistsException extends UserException {
    private static final long serialVersionUID = 1L;

    public ItemExistsException() {
        super("item.already.exists", null);
    }
}
