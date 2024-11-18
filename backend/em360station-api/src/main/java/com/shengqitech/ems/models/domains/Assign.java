package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author 
 * @since 2024-03-08
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Assign", description = "Assign对象")
public class Assign implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "监测站分配表")
    private Integer ems_assign_id;

    @ApiModelProperty(value = "分配时间")
    private Date ems_assign_time;

    @ApiModelProperty(value = "过期时间(开始时间~结束时间)")
    private String ems_assign_expirationdate;

    @ApiModelProperty(value = "监测站id")
    private Integer ems_assign_instanceid;

    @ApiModelProperty(value = "用户id")
    private Integer ems_assign_userid;
}
