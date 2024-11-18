package com.shengqitech.ems.models.vo;

import com.shengqitech.ems.models.domains.Navigation;
import com.shengqitech.ems.models.domains.Sysfile;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : wsh
 * @Date : 2023/6/27
 * @Description: 全景导航VO类
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "Navigation", description = "全景导航点实体类")
public class NavigationVo extends Navigation {

    /**
     * 图标文件对象
     */
    @ApiModelProperty("图标文件对象")
    private Sysfile ems_navigation_tagtypeiconfile;

    @ApiModelProperty("标签图标文件类型")
    private String ems_navigation_tagtype;
    @ApiModelProperty("标签图标文件pid")
    private String ems_navigation_tagtypepid;

}
