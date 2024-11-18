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
@ApiModel(value = "Scene对象", description = "")
public class Scene implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "监测场景表")
    private Integer ems_scene_id;

    @ApiModelProperty(value = "场景名字")
    private String ems_scene_name;

    @ApiModelProperty(value = "场景图片文件id")
    private Integer ems_scene_picfileid;

    @ApiModelProperty(value = "场景图标文件id")
    private Integer ems_scene_iconfileid;

    @ApiModelProperty(value = "场景描述")
    private String ems_scene_des;

    @ApiModelProperty(value = "创建时间")
    private Date ems_scene_createtime;

    @ApiModelProperty(value = "修改时间")
    private Date ems_scene_updatetime;
}
