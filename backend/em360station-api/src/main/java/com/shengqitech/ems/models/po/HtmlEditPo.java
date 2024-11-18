package com.shengqitech.ems.models.po;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import io.swagger.annotations.ApiModel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/11/27
 * @Description: 编辑网页标签PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "HtmlEditPo", description = "编辑网页标签PO类")
public class HtmlEditPo extends HtmlAddPo{

    /**
     * 网页标签表
     */
    @TableId(value = "ems_html_id", type = IdType.AUTO)
    private Integer ems_html_id;

}
