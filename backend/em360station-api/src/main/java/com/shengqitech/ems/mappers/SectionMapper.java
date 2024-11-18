package com.shengqitech.ems.mappers;

import com.shengqitech.ems.common.aspectj.annotation.DataSource;
import com.shengqitech.ems.common.enums.DataSourceType;
import com.shengqitech.ems.models.domains.Section;

/**
 * @author : wsh
 * @Date : 2024/1/11
 * @Description: 断面mapper
 */
@DataSource(DataSourceType.SLAVE)
public interface SectionMapper {

    int insert(Section section);

}
