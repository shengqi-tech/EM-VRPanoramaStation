package com.shengqitech.ems.models.po;

import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * @author : wsh
 * @Date : 2023/11/23
 * @Description: 新增标签类型PO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "TagtypeAddPo", description = "新增标签类型PO类")
public class TagtypeAddPo implements Serializable{

    private static final long serialVersionUID = 1L;

    /**
     * 标签类型名称
     */
    @ApiModelProperty("标签类型名称")
    private String ems_tagtype_name;

    /**
     * 图标文件
     */
    @ApiModelProperty("图标文件")
    private Sysfile ems_tagtype_iconfile;

    /**
     * 父节点id
     */
    @ApiModelProperty("父节点id")
    private Integer ems_tagtype_pid;

    /**
     * 标签类型
     */
    @ApiModelProperty("标签类型(热点:hotspot、导航:navigation、网页:html、视频融合:videofusion)")
    private String ems_tagtype_type;

}
