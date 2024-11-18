package com.shengqitech.ems.models.domains;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 组成
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Composition", description = "组成表")
public class Composition implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "组成结构表")
    private Integer ems_composition_id;

    @ApiModelProperty(value = "父节点id")
    private Integer ems_composition_pid;

    @ApiModelProperty(value = "组成名称")
    private String ems_composition_name;

    @ApiModelProperty(value = "图标文件id")
    private Integer ems_composition_iconfileid;

    @ApiModelProperty(value = "默认模型文件id")
    private Integer ems_composition_modelfileid;

    @ApiModelProperty(value = "模块描述")
    private String ems_composition_des;

    @ApiModelProperty(value = "是否是叶子 0 不是 1是")
    private Boolean ems_composition_isleaf;

    @ApiModelProperty(value = "标准id")
    private Integer ems_composition_standardid;

    @ApiModelProperty(value = "子类")
    private List<Composition> ems_composition_compositions = new ArrayList<>();
}
