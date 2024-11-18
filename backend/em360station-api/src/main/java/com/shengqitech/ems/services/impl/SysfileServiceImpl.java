package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.mappers.SysfileMapper;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.services.ISysfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class SysfileServiceImpl implements ISysfileService {

    @Autowired
    private SysfileMapper sysfileMapper;

    @Override
    public Boolean insert(Sysfile sysfile) {
        return sysfileMapper.insert(sysfile) > 0;
    }

}
