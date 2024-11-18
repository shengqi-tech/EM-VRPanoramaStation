package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.domains.Role;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.domains.Sysuser;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/3/1
 * @Description: 用户详情VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "SysuserViewVo", description = "用户详情VO类")
public class SysuserViewVo extends Sysuser {

    @ApiModelProperty(value = "用户头像",name = "ems_sysuser_avatarfile")
    private Sysfile ems_sysuser_avatarfile;
    @ApiModelProperty(value = "客户",name = "ems_sysuser_customer")
    private Customer ems_sysuser_customer;

}
