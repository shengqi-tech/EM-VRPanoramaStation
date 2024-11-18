package com.shengqitech.ems.services;


import com.shengqitech.ems.models.po.CustomerAddPo;
import com.shengqitech.ems.models.po.CustomerEditPo;
import com.shengqitech.ems.models.vo.CustomerVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface ICustomerService {

    Boolean insert(CustomerAddPo customerAddPo);

    Boolean update(CustomerEditPo customerEditPo);

    List<CustomerVo> findByMap(Map<String,Object> map);


    /**
     * 删除
     * @param ems_customer_id
     * @return
     */
    Boolean delete(Integer ems_customer_id);
}
