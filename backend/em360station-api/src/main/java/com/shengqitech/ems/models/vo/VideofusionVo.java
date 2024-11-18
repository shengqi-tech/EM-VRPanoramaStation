package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.domains.Videofusion;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/11/27
 * @Description: 视频融合对象VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "VideofusionVo", description = "视频融合对象VO类")
public class VideofusionVo extends Videofusion {

    /**
     * 图标文件对象
     */
    @ApiModelProperty("图标文件对象")
    private Sysfile ems_videofusion_tagtypeiconfile;

}
