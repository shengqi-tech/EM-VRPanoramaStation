package com.shengqitech.ems.models.po;


import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;



/**
 * @author : hgy
 * @Date : 2024/1/31
 * @Description: 新增产品属性PO类
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "PropertyEditPo", description = "编辑产品属性PO类")
public class PropertyEditPo extends PropertyAddPo {

    /**
     * 产品属性表
     */
    @TableId(value = "ems_property_id", type = IdType.AUTO)
    private Integer ems_property_id;
}
