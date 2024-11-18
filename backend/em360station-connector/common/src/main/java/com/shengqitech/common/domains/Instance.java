package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * <p>
 *
 * </p>
 *
 * @author wsh
 * @since 2023-06-08
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Instance {
    private Integer ems_instance_id;
    private String ems_instance_coordinate;
    private String ems_instance_name;
    private String ems_instance_no;
    private Integer ems_instance_csolutionid;
    private Date ems_instance_constructionstarttime;
    private Integer ems_instance_sceneid;
    private Integer ems_instance_picfileid;
    private String ems_instance_des;
    private Integer ems_instance_sectionid;
    private Date ems_instance_createtime;
    private Date ems_instance_updatetime;
    private String ems_instance_address;
    private Date ems_instance_constructionendtime;
    private Integer ems_instance_creatorid;
    private String ems_instance_globeconf;
    private Integer ems_instance_ishobby;

}
