package com.shengqitech.ems.system.core.alarm;

import com.shengqitech.ems.models.domains.XxlJobInfo;
import com.shengqitech.ems.models.domains.XxlJobLog;

/**
 * @author xuxueli 2020-01-19
 */
public interface JobAlarm {

    /**
     * job alarm
     *
     * @param info
     * @param jobLog
     * @return
     */
    public boolean doAlarm(XxlJobInfo info, XxlJobLog jobLog);

}
