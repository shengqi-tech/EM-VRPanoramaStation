package com.shengqitech.ems.services.impl;

import com.shengqitech.ems.common.exception.customer.CustomerExistsCompositionException;
import com.shengqitech.ems.common.exception.customer.CustomerExistsUserException;
import com.shengqitech.ems.mappers.CustomerMapper;
import com.shengqitech.ems.mappers.SysuserMapper;
import com.shengqitech.ems.models.domains.Customer;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.po.CustomerAddPo;
import com.shengqitech.ems.models.po.CustomerEditPo;
import com.shengqitech.ems.models.vo.CustomerVo;
import com.shengqitech.ems.services.ICustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务实现类
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Service
public class CustomerServiceImpl implements ICustomerService {

    @Autowired
    private CustomerMapper customerMapper;

    @Autowired
    private SysuserMapper sysuserMapper;

    @Override
    public Boolean insert(CustomerAddPo customerAddPo) {
        Date now = new Date();
        Sysfile logofile = customerAddPo.getEms_customer_logofile();
        Customer customer = Customer.builder()
                .ems_customer_name(customerAddPo.getEms_customer_name())
                .ems_customer_logofileid(logofile == null ? null : logofile.getEms_sysfile_id())
                .ems_customer_state(customerAddPo.getEms_customer_state())
                .ems_customer_city(customerAddPo.getEms_customer_city())
                .ems_customer_region(customerAddPo.getEms_customer_region())
                .ems_customer_address(customerAddPo.getEms_customer_address())
                .ems_customer_des(customerAddPo.getEms_customer_des())
                .ems_customer_createtime(now)
                .ems_customer_updatetime(now).build();
        return customerMapper.insert(customer) > 0;
    }

    @Override
    public Boolean update(CustomerEditPo customerEditPo) {
        Date now = new Date();
        Sysfile logofile = customerEditPo.getEms_customer_logofile();
        Customer customer = Customer.builder()
                .ems_customer_id(customerEditPo.getEms_customer_id())
                .ems_customer_name(customerEditPo.getEms_customer_name())
                .ems_customer_logofileid(logofile == null ? null : logofile.getEms_sysfile_id())
                .ems_customer_state(customerEditPo.getEms_customer_state())
                .ems_customer_city(customerEditPo.getEms_customer_city())
                .ems_customer_region(customerEditPo.getEms_customer_region())
                .ems_customer_address(customerEditPo.getEms_customer_address())
                .ems_customer_des(customerEditPo.getEms_customer_des())
                .ems_customer_isrealname(1)
                .ems_customer_updatetime(now)
                .ems_customer_realnametime(now)
                .ems_customer_legalperson(customerEditPo.getEms_customer_legalperson())
                .ems_customer_organizationcode(customerEditPo.getEms_customer_organizationcode())
                .ems_customer_email(customerEditPo.getEms_customer_email())
                .build();
        return customerMapper.update(customer) > 0;
    }

    @Override
    public List<CustomerVo> findByMap(Map<String, Object> map) {
        return customerMapper.findByMap(map);
    }

    @Override
    public Boolean delete(Integer ems_customer_id) {
        int userCount = customerMapper.checkCustomerExistUser(ems_customer_id);
        if (userCount > 0){
            throw new CustomerExistsUserException();
        }

        int compositionCount = customerMapper.checkCustomerExistComposition(ems_customer_id);
        if (compositionCount > 0){
            throw new CustomerExistsCompositionException();
        }
        return customerMapper.delete(ems_customer_id) > 0;
    }

}
