package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Sysfile;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface SysfileMapper {

    Sysfile selectByFileId(Integer id);

    int insert(Sysfile sysfile);

    /**
     * 批量查询
     * @param ids
     * @return
     */
    List<Sysfile> findByIds(List<Integer> ids);
}
