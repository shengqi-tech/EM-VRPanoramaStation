package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Version;
import com.shengqitech.ems.models.vo.VersionVo;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface VersionMapper {

    int insert(Version version);

    /**
     * 根据产品查询
     * @param ems_product_id
     * @return
     */
    Version findByProductId(Integer ems_product_id);

}
