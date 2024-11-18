package com.shengqitech.ems.mappers;

import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.models.po.SysuserAddPo;
import com.shengqitech.ems.models.vo.SysuserViewVo;
import com.shengqitech.ems.models.vo.SysuserVo;

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
public interface SysuserMapper{

    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    Sysuser selectUserByUserName(String userName);

    /**
     * 校验用户名称是否唯一
     *
     * @param loginname 用户名称
     * @return 结果
     */
    public Sysuser checkUserNameUnique(String loginname);

    /**
     * 新增用户信息
     *
     * @param sysuser 用户信息
     * @return 结果
     */
    public int insert(Sysuser sysuser);

    /*****
     * 添加用户角色
     * @param id 用户id
     * @return
     */
    public int insertUserRoles(Integer id,Integer[] roleids);

    /**
     * 根据用户删除用户角色关系
     * @param ems_sysuser_id
     * @return
     */
    int deleteUserRolesByUserid(Integer ems_sysuser_id);

    /**
     * 编辑
     * @param sysuser
     * @return
     */
    int update(Sysuser sysuser);

    List<SysuserVo> findByMap(Map<String, Object> map);

    /**
     * 查询用户详情
     * @param ems_sysuser_id
     * @return
     */
    SysuserViewVo getView(Integer ems_sysuser_id);

    /**
     * 删除
     * @param ids
     * @return
     */
    int delete(Integer[] ids);


}
