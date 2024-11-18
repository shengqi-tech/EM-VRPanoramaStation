package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Version;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/1/29
 * @Description: 版本VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "VersionVo", description = "版本VO类")
public class VersionVo extends Version {

    @ApiModelProperty("模块Vo列表")
    List<ModuleVo> moduleVos;

}
