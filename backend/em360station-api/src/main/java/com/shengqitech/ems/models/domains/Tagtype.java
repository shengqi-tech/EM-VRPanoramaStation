package com.shengqitech.ems.models.domains;

import java.util.Date;
import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Tagtype", description = "标签类型表")
public class Tagtype implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * 标签类型表
     */
    @ApiModelProperty("标签类型表")
    private Integer ems_tagtype_id;

    /**
     * 标签类型名称
     */
    @ApiModelProperty("标签类型名称")
    private String ems_tagtype_name;

    /**
     * 图标文件id
     */
    @ApiModelProperty("图标文件id")
    private Integer ems_tagtype_iconfileid;

    /**
     * 创建时间
     */
    @ApiModelProperty("创建时间")
    private Date ems_tagtype_createtime;

    /**
     * 修改时间
     */
    @ApiModelProperty("修改时间")
    private Date ems_tagtype_updatetime;

    /**
     * 父节点id
     */
    @ApiModelProperty("父节点id")
    private Integer ems_tagtype_pid;

    /**
     * 标签类型
     */
    @ApiModelProperty("标签类型")
    private String ems_tagtype_type;
    /**
     * 是否是默认标签类型
     */
    @ApiModelProperty("是否是默认标签类型")
    private Integer ems_tagtype_isdefault;
    /**
     * 是否需要上传图标(对根节点有效,0:否,1:是)
     */
    @ApiModelProperty("是否需要上传图标(对根节点有效,0:否,1:是)")
    private Integer ems_tagtype_isupload;


}
