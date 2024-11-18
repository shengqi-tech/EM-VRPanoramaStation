package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * restapi分组 实体类
 * </p>
 *
 * @author wsh
 * @since 2023-12-14
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Restapigroup", description = "restapi分组 实体类")
public class Restapigroup implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "restapi分组")
    private Integer ems_restapigroup_id;

    @ApiModelProperty(value = "分组名称")
    private String ems_restapigroup_name;

    @ApiModelProperty(value = "用户id")
    private Integer ems_restapigroup_userid;
}
