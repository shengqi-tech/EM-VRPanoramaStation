package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Module;
import com.shengqitech.ems.models.domains.Property;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/1/29
 * @Description: 模块VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ModuleVo", description = "模块VO类")
public class ModuleVo extends Module {

    @ApiModelProperty("属性列表")
    List<Property> properties;

}
