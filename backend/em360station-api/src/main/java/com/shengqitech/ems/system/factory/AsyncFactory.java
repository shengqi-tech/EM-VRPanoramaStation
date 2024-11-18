package com.shengqitech.ems.system.factory;

import com.shengqitech.ems.models.domains.Syslog;
import com.shengqitech.ems.services.ISyslogService;
import com.shengqitech.ems.system.utils.IpUtils;
import com.shengqitech.ems.system.utils.SpringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.TimerTask;

/**
 * 异步工厂（产生任务用）
 * 
 * @author wsh
 */
public class AsyncFactory
{
    private static final Logger sys_user_logger = LoggerFactory.getLogger("sys-user");


    /**
     * 操作日志记录
     * 
     * @param syslog 操作日志信息
     * @return 任务task
     */
    public static TimerTask recordOper(final Syslog syslog)
    {
        return new TimerTask()
        {
            @Override
            public void run()
            {
                // 远程查询操作地点
//                syslog.setOperLocation(AddressUtils.getRealAddressByIP(operLog.getOperIp()));
                SpringUtils.getBean(ISyslogService.class).insertSyslog(syslog);
            }
        };
    }
}
