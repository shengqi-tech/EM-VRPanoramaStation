package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Activity;
import com.shengqitech.ems.models.domains.Element;

import com.shengqitech.ems.models.domains.Resultmap;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

/**
 * @author : hgy
 * @Date : 2024/01/25
 * @Description: 监测要素VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ElementVo", description = "监测要素VO类")
public class ElementVo extends Element implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "监测活动")
    private List<Activity> ems_element_activities;
}
