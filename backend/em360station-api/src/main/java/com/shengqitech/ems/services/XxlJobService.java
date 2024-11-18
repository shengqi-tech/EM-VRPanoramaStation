package com.shengqitech.ems.services;


import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.XxlJobInfoAddPo;
import com.shengqitech.ems.models.po.XxlJobInfoEditPo;
import com.shengqitech.ems.models.vo.ReportVo;
import com.shengqitech.ems.models.domains.XxlJobInfo;
import com.shengqitech.ems.models.vo.XxlJobInfoVo;
import com.xxl.job.core.biz.model.ReturnT;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * core job action for xxl-job
 * 
 * @author xuxueli 2016-5-28 15:30:33
 */
public interface XxlJobService {

	/**
	 * page list
	 *
	 * @param jobGroup
	 * @param jobDesc
	 * @param executorHandler
	 * @param author
	 * @return
	 */
	public List<XxlJobInfoVo> pageList(Integer jobGroup, Integer triggerStatus, String jobDesc, String executorHandler, String author);

    public List<Integer> counter();

	/**
	 * add job
	 *
	 * @param jobInfoAddPo
	 * @return
	 */
	public Wrapper<String> add(XxlJobInfoAddPo jobInfoAddPo);

	/**
	 * update job
	 *
	 * @param jobInfoEditPo
	 * @return
	 */
	public Wrapper<String> update(XxlJobInfoEditPo jobInfoEditPo);

	/**
	 * remove job
	 * 	 *
	 * @param id
	 * @return
	 */
	public Wrapper<String> remove(Integer id);

	/**
	 * start job
	 *
	 * @param id
	 * @return
	 */
	public Wrapper<String> start(Integer id);

	/**
	 * stop job
	 *
	 * @param id
	 * @return
	 */
	public Wrapper<String> stop(Integer id);

	/**
	 * dashboard info
	 *
	 * @return
	 */
	public Map<String,Object> dashboardInfo();

	/**
	 * chart info
	 *
	 * @param startDate
	 * @param endDate
	 * @return
	 */
	public ReportVo chartInfo(Date startDate, Date endDate);

}
