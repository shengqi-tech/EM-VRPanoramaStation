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
@ApiModel(value = "Scenestandard对象", description = "")
public class Scenestandard implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "场景标准表")
    private Integer ems_scenestandard_id;

    @ApiModelProperty(value = "场景id")
    private Integer ems_scenestandard_sceneid;

    @ApiModelProperty(value = "标准id")
    private Integer ems_scenestandard_standardid;
}
