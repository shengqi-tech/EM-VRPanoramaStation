package com.shengqitech.ems.services;


import com.shengqitech.ems.models.domains.Syslog;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 操作日志记录 服务类
 * </p>
 *
 * @author 
 * @since 2024-03-11
 */
public interface ISyslogService {

    /**
     * 新增日志
     *
     * @param syslog 操作日志对象
     */
    public Boolean insertSyslog(Syslog syslog);

    /**
     * 查询
     * @param map
     * @return
     */
    List<Syslog> findByMap(Map<String, Object> map);
}
