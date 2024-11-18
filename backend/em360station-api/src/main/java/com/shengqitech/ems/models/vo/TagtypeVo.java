package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.domains.Tagtype;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/11/23
 * @Description: 标签类型VO
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "TagtypeVo", description = "标签类型VO")
public class TagtypeVo extends Tagtype {

    @ApiModelProperty("图标文件")
    private Sysfile ems_tagtype_iconfile;

    /**
     * 子节点
     */
    private List<TagtypeVo> ems_tagtype_tagtypes= new ArrayList<>();
}
