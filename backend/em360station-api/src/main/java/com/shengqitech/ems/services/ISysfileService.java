package com.shengqitech.ems.services;

import com.shengqitech.ems.models.domains.Sysfile;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface ISysfileService{

    /*****
     * 插入
     * @param sysfile
     * @return
     */
    Boolean insert(Sysfile sysfile);

}
