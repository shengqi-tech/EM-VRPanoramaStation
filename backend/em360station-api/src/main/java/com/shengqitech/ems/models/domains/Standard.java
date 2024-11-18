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
 * 标准表
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Getter
@Setter
@ApiModel(value = "Standard对象", description = "标准表")
public class Standard implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "质量标准id")
    private Integer ems_standard_id;

    @ApiModelProperty(value = "父标准id")
    private Integer ems_standard_pid;

    @ApiModelProperty(value = "是否首次发布  0 不是 1 是，如果是，者pid为0，否则选择父标准")
    private Boolean ems_standard_isfirst;

    @ApiModelProperty(value = "年份")
    private String ems_standard_year;

    @ApiModelProperty(value = "标准中文名")
    private String ems_standard_namecn;

    @ApiModelProperty(value = "标准英文名")
    private String ems_standard_nameen;

    @ApiModelProperty(value = "编号")
    private String ems_standard_no;

    @ApiModelProperty(value = "摘要")
    private String ems_standard_des;

    @ApiModelProperty(value = "发布时间")
    private Date ems_standard_publishtime;

    @ApiModelProperty(value = "执行时间")
    private Date ems_standard_carryouttime;

    @ApiModelProperty(value = "发布者")
    private String ems_standard_publisher;

    @ApiModelProperty(value = "起草单位")
    private String ems_standard_draftingunit;

    @ApiModelProperty(value = "0、待修订 1、编制说明 2、征求意见稿 3、试行 4、发行")
    private Integer ems_standard_state;

    @ApiModelProperty(value = "标准文件id")
    private Integer ems_standard_fileid;
}
