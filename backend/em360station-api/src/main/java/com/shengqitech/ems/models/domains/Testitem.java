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
@ApiModel(value = "Testitem对象", description = "")
public class Testitem implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "测试项目表")
    private Integer ems_testitem_id;

    @ApiModelProperty(value = "是否必测 0 选测 1必测")
    private String ems_testitem_option;

    @ApiModelProperty(value = "污染物id")
    private Integer ems_testitem_pollutantid;

    @ApiModelProperty(value = "标准id")
    private Integer ems_testitem_standardid;
}
