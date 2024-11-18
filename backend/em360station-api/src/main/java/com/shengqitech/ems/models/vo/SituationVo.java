package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Resultmap;
import com.shengqitech.ems.models.domains.Situation;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : hgy
 * @Date : 2024/01/25
 * @Description: 监测状况VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "SituationVo", description = "监测状况VO类")
public class SituationVo extends Situation implements Serializable {
    private static final long serialVersionUID = 1L;

    @ApiModelProperty(value = "当监测状况为 环境质量时：要素活动")
    private List<ElementVo> ems_situation_elementVos;

    @ApiModelProperty(value = "当监测状况为 污染源时：监测行业")
    private List<SectorVo> ems_situation_sectorVos;
}
