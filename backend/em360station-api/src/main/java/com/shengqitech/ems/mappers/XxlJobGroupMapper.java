package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.XxlJobGroup;
import com.shengqitech.ems.models.vo.XxlJobGroupVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by xuxueli on 16/9/30.
 */
public interface XxlJobGroupMapper {

    public List<XxlJobGroup> findAll();

    public List<XxlJobGroup> findByAddressType(@Param("addressType") int addressType);

    public int save(XxlJobGroup xxlJobGroup);

    public int update(XxlJobGroup xxlJobGroup);

    public int remove(@Param("id") int id);

    public XxlJobGroup load(@Param("id") Integer id);

    public List<XxlJobGroupVo> pageList(@Param("appname") String appname, @Param("title") String title, @Param("customerId") Integer customerId);

//    public int pageListCount(@Param("offset") int offset,
//                             @Param("pagesize") int pagesize,
//                             @Param("appname") String appname,
//                             @Param("title") String title);

}
