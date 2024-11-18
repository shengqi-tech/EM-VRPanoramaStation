package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Html;
import com.shengqitech.ems.models.po.HtmlAddPo;
import com.shengqitech.ems.models.po.HtmlEditPo;
import com.shengqitech.ems.services.IHtmlService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/html")
@Api(value = "网页标签管理", tags = "htmlController")
public class HtmlController extends BaseController {

    @Autowired
    private IHtmlService htmlService;

    @ApiImplicitParams({@ApiImplicitParam(name = "htmlAddPo", value = "新增网页标签PO类", dataTypeClass = HtmlAddPo.class, required = true),})
    @ApiOperation(value = "新增网页标签", nickname = "insertHtml")
    @MyLog(title = "新增网页标签", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody HtmlAddPo htmlAddPo) {
        Boolean flag = htmlService.insert(htmlAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
    @ApiImplicitParams({@ApiImplicitParam(name = "htmlEditPo", value = "编辑网页标签PO类", dataTypeClass = HtmlEditPo.class, required = true),})
    @ApiOperation(value = "编辑网页标签", nickname = "updateHtml")
    @MyLog(title = "编辑网页标签", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody HtmlEditPo htmlEditPo) {
        Boolean flag = htmlService.update(htmlEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_html_id", value = "网页标签id", dataTypeClass = Integer.class, required = true)
    })
    @ApiOperation(value = "删除网页标签", nickname = "deleteHtml")
    @MyLog(title = "删除网页标签", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_html_id){
        Boolean flag = htmlService.delete(ems_html_id);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }
}
