package com.shengqitech.ems.models.domains;

import java.io.Serializable;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 系统文件实体类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Sysfile", description = "系统文件实体类")
public class Sysfile implements Serializable {

    private static final long serialVersionUID = 1L;

    /**
     * id
     */
    @ApiModelProperty(value = "id")
    private Integer ems_sysfile_id;

    /**
     * 文件名称
     */
    @ApiModelProperty(value = "文件名称")
    private String ems_sysfile_name;

    /**
     * 文件大小
     */
    @ApiModelProperty(value = "文件大小")
    private Long ems_sysfile_size;

    /**
     * 文件类型
     */
    @ApiModelProperty(value = "文件类型")
    private String ems_sysfile_type;

    /**
     * 文件后缀
     */
    @ApiModelProperty(value = "文件后缀")
    private String ems_sysfile_suffix;

    /**
     * 文件路径
     */
    @ApiModelProperty(value = "文件路径")
    private String ems_sysfile_path;


}
