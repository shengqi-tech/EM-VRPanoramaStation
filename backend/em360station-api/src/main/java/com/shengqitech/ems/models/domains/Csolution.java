package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import java.util.Date;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

/**
 * <p>
 * 
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Getter
@Setter
@ApiModel(value = "Csolution对象", description = "")
public class Csolution implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "建设方案表")
    private Integer ems_csolution_id;

    @ApiModelProperty(value = "建设方案名称")
    private String ems_csolution_name;

    @ApiModelProperty(value = "创建时间")
    private Date ems_csolution_createtime;

    @ApiModelProperty(value = "更新时间")
    private Date ems_csolution_updatetime;

    @ApiModelProperty(value = "场景id")
    private Integer ems_csolution_sceneid;

    @ApiModelProperty(value = "最后方案模型文件地址，格式glb gltf obj等格式")
    private Integer ems_csolution_modelfileid;
}
