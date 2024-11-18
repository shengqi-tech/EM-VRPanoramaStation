package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

/**
 * <p>
 * 版本
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ApiModel(value = "Version", description = "版本表")
public class Version implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "版本表")
    private Integer ems_version_id;

    @ApiModelProperty(value = "版本号")
    private Integer ems_version_no;

    @ApiModelProperty(value = "是否当使用版本 0 不是 1 是")
    private Integer ems_version_iscurrent;

    @ApiModelProperty(value = "产品id")
    private Integer ems_version_productid;
}
