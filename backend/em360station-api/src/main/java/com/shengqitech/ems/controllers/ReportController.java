package com.shengqitech.ems.controllers;

import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.vo.ReportVo;
import com.shengqitech.ems.services.XxlJobService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import java.util.Date;
import java.util.Map;

/**
 * index controller
 * @author xuxueli 2015-12-19 16:13:16
 */
@RestController
@RequestMapping("/report")
@Api(value = "调度报告管理", tags = "reportController")
public class ReportController {

	@Resource
	private XxlJobService xxlJobService;


    @ApiImplicitParams({
            @ApiImplicitParam(name = "startDate", value = "开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "endDate", value = "结束时间", dataTypeClass = Date.class, required = false)
    })
    @ApiOperation(value = "调度统计信息", nickname = "chartInfo")
    @MyLog(title = "调度统计信息", businessType = BusinessType.OTHER)
    @GetMapping("/chartInfo")
	public Wrapper<ReportVo> chartInfo(Date startDate, Date endDate) {
        ReportVo reportVo = xxlJobService.chartInfo(startDate, endDate);
        return WrapMapper.ok(reportVo);
    }
	

}
