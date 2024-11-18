package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.XxlJobInfo;
import com.shengqitech.ems.models.vo.XxlJobInfoVo;
import org.apache.ibatis.annotations.MapKey;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;


/**
 * job info
 * @author xuxueli 2016-1-12 18:03:45
 */
public interface XxlJobInfoMapper {

	public List<XxlJobInfoVo> pageList(@Param("jobGroup") Integer jobGroup,
                                       @Param("triggerStatus") Integer triggerStatus,
                                       @Param("jobDesc") String jobDesc,
                                       @Param("executorHandler") String executorHandler,
                                       @Param("author") String author);
	public int pageListCount(@Param("offset") int offset,
							 @Param("pagesize") int pagesize,
							 @Param("jobGroup") int jobGroup,
							 @Param("triggerStatus") int triggerStatus,
							 @Param("jobDesc") String jobDesc,
							 @Param("executorHandler") String executorHandler,
							 @Param("author") String author);
	
	public int save(XxlJobInfo info);

	public XxlJobInfo loadById(@Param("id") Integer id);
	
	public int update(XxlJobInfo xxlJobInfo);

	public int delete(@Param("id") long id);

	public List<XxlJobInfo> getJobsByGroup(@Param("jobGroup") int jobGroup);

	public int findAllCount();

	public List<XxlJobInfo> scheduleJobQuery(@Param("maxNextTime") long maxNextTime, @Param("pagesize") int pagesize );

	public int scheduleUpdate(XxlJobInfo xxlJobInfo);

    public List<Integer> counter();


}
