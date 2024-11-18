package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.models.domains.Syslog;
import com.shengqitech.ems.mappers.SyslogMapper;
import com.shengqitech.ems.services.ISyslogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 操作日志记录 服务实现类
 * </p>
 *
 * @author 
 * @since 2024-03-11
 */
@Service
public class SyslogServiceImpl  implements ISyslogService {

    @Autowired
    private SyslogMapper syslogMapper;

    @Override
    public Boolean insertSyslog(Syslog syslog) {
        return syslogMapper.insert(syslog) > 0;
    }

    @Override
    public List<Syslog> findByMap(Map<String, Object> map) {
        return syslogMapper.findByMap(map);
    }
}
