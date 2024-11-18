package com.shengqitech.ems.system.utils;

import com.github.pagehelper.PageHelper;
import com.shengqitech.ems.system.page.PageDomain;
import com.shengqitech.ems.system.page.TableSupport;

/**
 * 分页工具类
 *
 * @author wsh
 */
public class PageUtils extends PageHelper {
    /**
     * 设置请求分页数据
     */
    public static void startPage() {
        PageDomain pageDomain = TableSupport.buildPageRequest();
        if (pageDomain.getPageNum() == null || pageDomain.getPageSize() == null) {
            return;
        }
        Integer pageNum = pageDomain.getPageNum();
        Integer pageSize = pageDomain.getPageSize();
        String orderBy = SqlUtil.escapeOrderBySql(pageDomain.getOrderBy());
        Boolean reasonable = pageDomain.getReasonable();
        PageHelper.startPage(pageNum, pageSize, orderBy).setReasonable(reasonable);
    }

    /**
     * 清理分页的线程变量
     */
    public static void clearPage() {
        PageHelper.clearPage();
    }
}
