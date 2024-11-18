package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 设备
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Device implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer ems_device_id;

    private String ems_device_no;

    private Integer ems_device_picfileid;

    private Integer ems_device_state;

    private Integer ems_device_versionid;

    private Integer ems_device_instanceid;

    private Date ems_device_createtime;
}
