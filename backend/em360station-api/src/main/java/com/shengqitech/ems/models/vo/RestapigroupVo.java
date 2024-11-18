package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Api;
import com.shengqitech.ems.models.domains.Restapigroup;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/12/14
 * @Description: restapi分组VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "RestapigroupVo", description = "restapi分组VO类")
public class RestapigroupVo extends Restapigroup {

    @ApiModelProperty("api对象列表")
    private List<ApiVo> ems_restapigroup_apivos;

}
