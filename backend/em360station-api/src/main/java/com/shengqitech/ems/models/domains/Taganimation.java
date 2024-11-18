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
@ApiModel(value = "Taganimation对象", description = "")
public class Taganimation implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "标签动画表")
    private Integer ems_taganimation_id;

    @ApiModelProperty(value = "标签动画名字")
    private String ems_taganimation_name;
}
