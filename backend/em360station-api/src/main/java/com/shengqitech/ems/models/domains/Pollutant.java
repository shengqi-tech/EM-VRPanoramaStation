package com.shengqitech.ems.models.domains;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import java.io.Serializable;
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
@ApiModel(value = "Pollutant对象", description = "")
public class Pollutant implements Serializable {

    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "污染物表")
    private Integer ems_pollutant_id;

    @ApiModelProperty(value = "污染物中文名称")
    private String ems_pollutant_namecn;

    @ApiModelProperty(value = "污染物英文名称")
    private String ems_pollutant_nameen;

    @ApiModelProperty(value = "污染物化学符号")
    private String ems_pollutant_chemicalsymbols;

    @ApiModelProperty(value = "污染物代码")
    private String ems_pollutant_code;

    @ApiModelProperty(value = "污染物类别id")
    private Integer ems_pollutant_pollutantclassificationid;
}
