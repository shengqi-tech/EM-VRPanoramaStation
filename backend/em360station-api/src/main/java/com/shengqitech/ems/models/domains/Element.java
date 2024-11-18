package com.shengqitech.ems.models.domains;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * <p>
 * 监测要素
 * </p>
 *
 * @author hgy
 * @since 2024-01-25
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Element", description = "监测要素表")
public class Element implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "要素表")
    private Integer ems_element_id;



    @ApiModelProperty(value = "要素名称")
    private String ems_element_name;

    @ApiModelProperty(value = "图标名，可以在前端通过iconfont呈现")
    private String ems_element_icon;

    @ApiModelProperty(value = "序号")
    private Integer ems_element_index;

    @ApiModelProperty(value = "描述")
    private String ems_element_des;
    
}
