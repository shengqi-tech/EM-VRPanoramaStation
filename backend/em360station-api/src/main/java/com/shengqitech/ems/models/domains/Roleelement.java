package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
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
@ApiModel(value = "Roleelement对象", description = "")
public class Roleelement implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "角色ui元素表")
    private Integer ems_roleitem_id;
    private Integer ems_roleitem_roleid;
    private Integer ems_roleitem_itemid;

    @ApiModelProperty(value = "0 无权限 1 只读 2 可修改 3 可删除 4 可修改和删除")
    private Integer ems_roleitem_canopt;
}
