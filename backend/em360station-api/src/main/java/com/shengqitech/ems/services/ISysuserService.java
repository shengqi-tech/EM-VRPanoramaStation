package com.shengqitech.ems.services;


import com.shengqitech.ems.common.exception.file.InvalidExtensionException;
import com.shengqitech.ems.models.domains.Instance;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.models.po.SysuserAddPo;
import com.shengqitech.ems.models.vo.SysuserViewVo;
import com.shengqitech.ems.models.vo.SysuserVo;
import com.shengqitech.ems.models.po.SysuserEditPo;

import java.io.IOException;
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
public interface ISysuserService {

    /**
     * 通过用户名查询用户
     *
     * @param userName 用户名
     * @return 用户对象信息
     */
    public Sysuser selectUserByUserName(String userName);


    /**
     * 注册用户信息
     *
     * @param sysuserAddPo 用户信息
     * @return 结果
     */
    public boolean registerUser(SysuserAddPo sysuserAddPo)throws IOException, InvalidExtensionException;

    /**
     * 编辑用户
     * @param updateSysuserVo
     * @return
     */
    Boolean update(SysuserEditPo updateSysuserVo);
    /**
     * 个人设置
     * @param sysuser
     * @return
     */
    Boolean personalSetting(Sysuser sysuser);

    /**
     * 重置密码
     * @param sysuser
     * @return
     */
    Boolean resetPwd(Sysuser sysuser);

    List<SysuserVo> findByMap(Map<String, Object> map);

    /**
     * 新增
     * @param sysuserAddPo
     * @return
     */
    Boolean insert(SysuserAddPo sysuserAddPo);

    /**
     * 详情
     * @param ems_sysuser_id
     * @return
     */
    SysuserViewVo getView(Integer ems_sysuser_id);

    /**
     * 删除
     * @param ids
     * @return
     */
    Boolean delete(Integer[] ids);

    /**
     * 分配角色
     * @param ems_sysuser_id
     * @param ids
     * @return
     */
    Boolean assignRoles(Integer ems_sysuser_id, Integer[] ids);

    /**
     * 检测站点分配
     * @param ems_sysuser_id
     * @param ems_instance_ids
     * @param ems_assign_expirationdate
     * @return
     */
    Boolean assignInstance(Integer ems_sysuser_id, Integer[] ems_instance_ids, String ems_assign_expirationdate);
}
