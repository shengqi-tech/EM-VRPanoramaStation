package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Html;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/11/27
 * @Description: html标签VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "HtmlVo", description = "html标签VO类")
public class HtmlVo extends Html {

    /**
     * 图标文件对象
     */
    @ApiModelProperty("图标文件对象")
    private Sysfile ems_html_tagtypeiconfile;

    @ApiModelProperty("标签图标文件类型")
    private String ems_html_tagtype;
    @ApiModelProperty("标签图标文件pid")
    private String ems_html_tagtypepid;
}
