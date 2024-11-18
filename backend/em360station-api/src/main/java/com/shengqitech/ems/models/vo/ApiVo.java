package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Api;
import com.shengqitech.ems.models.domains.Resultmap;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.List;

/**
 * @author : wsh
 * @Date : 2023/12/5
 * @Description: 平台对接表VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "ApiVo", description = "平台对接表VO类")
public class ApiVo extends Api implements Serializable {
    private static final long serialVersionUID = 1L;
    @ApiModelProperty(value = "结果映射列表")
    private List<Resultmap> resultmapList;
}
