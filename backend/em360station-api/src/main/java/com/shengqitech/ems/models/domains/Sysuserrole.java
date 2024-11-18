package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Getter
@Setter
@ApiModel(value = "Sysuserrole对象", description = "")
public class Sysuserrole implements Serializable {

    private static final long serialVersionUID = 1L;
    private Integer ems_sysuserrole_id;
    private Integer ems_sysuserrole_sysuserid;
    private Integer ems_sysuserrole_roleid;
}
