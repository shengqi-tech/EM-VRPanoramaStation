package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Product;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

/**
 * @author : wsh
 * @Date : 2024/1/29
 * @Description: 产品VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ProductVo", description = "产品VO类")
public class ProductVo extends Product {

    @ApiModelProperty("版本Vo列表")
    List<VersionVo> versionVos;


}
