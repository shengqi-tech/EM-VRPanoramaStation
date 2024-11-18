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
@ApiModel(value = "Customcomposition对象", description = "")
public class Customcomposition implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "自定义组成结构")
    private Integer ems_customcomposition_id;

    @ApiModelProperty(value = "自定义组成名称")
    private String ems_customcomposition_name;

    @ApiModelProperty(value = "自定义组成编码")
    private String ems_customcomposition_code;

    @ApiModelProperty(value = "组成id")
    private Integer ems_customcomposition_compositionid;

    @ApiModelProperty(value = "客户id")
    private Integer ems_customcomposition_customerid;
}
