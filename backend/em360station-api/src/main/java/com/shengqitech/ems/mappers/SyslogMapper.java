package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Syslog;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 操作日志记录 Mapper 接口
 * </p>
 *
 * @author 
 * @since 2024-03-11
 */
public interface SyslogMapper {

    int insert(Syslog syslog);

    List<Syslog> findByMap(Map<String, Object> map);
}
