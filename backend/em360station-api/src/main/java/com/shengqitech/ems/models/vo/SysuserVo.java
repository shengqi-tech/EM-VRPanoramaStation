package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.domains.Sysuser;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Set;

/**
 * @author : wsh
 * @Date : 2023/5/8
 * @Description: 用户信息传输Vo
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "SysuserVo", description = "用户Vo类")
public class SysuserVo extends Sysuser {

    @ApiModelProperty("用户头像文件")
    private Sysfile ems_sysuser_avatarfile;
    @ApiModelProperty("客户")
    private Customer ems_sysuser_customer;

    /**
     * 权限列表
     */
    @ApiModelProperty("权限列表")
    private Set<String> permissions;

    @ApiModelProperty(value="用户角色(用于用户注册的时候选择角色)",name="ems_role_ids")
    private Integer[] ems_role_ids;

    @ApiModelProperty("token")
    private String token;

}
