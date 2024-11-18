package com.shengqitech.ems.mappers;


import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.vo.CustomerVo;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
public interface CustomerMapper {
    /**
     * 新增
     * @param customer
     * @return
     */
    int insert(Customer customer);

    /**
     * 修改
     * @param customer
     * @return
     */
    int update(Customer customer);

    /**
     * 根据条件查询
     * @param map
     * @return
     */

    List<CustomerVo> findByMap(Map<String,Object> map);

    /**
     * 根据id查询
     * @param ems_customer_id
     * @return
     */
    CustomerVo findById(Integer ems_customer_id);

    /**
     * 删除
     * @param ems_customer_id
     * @return
     */
    int delete(Integer ems_customer_id);

    /**
     * 删除自定义结构
     * @param ems_customer_id
     * @return
     */
    int deleteCustomercomposition(Integer ems_customer_id);

    /**
     * 查询客户是否存在用户
     * @param ems_customer_id
     * @return
     */
    int checkCustomerExistUser(Integer ems_customer_id);
    /**
     * 查询客户是否存组成
     * @param ems_customer_id
     * @return
     */
    int checkCustomerExistComposition(Integer ems_customer_id);


}
