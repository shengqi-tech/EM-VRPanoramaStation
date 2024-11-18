package com.shengqitech.ems.models.po;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : wsh
 * @Date : 2023/11/23
 * @Description: 编辑标签类型PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "TagtypeEditPo", description = "编辑标签类型PO类")
public class TagtypeEditPo extends TagtypeAddPo implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 标签类型id
     */
    @ApiModelProperty("标签类型id")
    private Integer ems_tagtype_id;

}
