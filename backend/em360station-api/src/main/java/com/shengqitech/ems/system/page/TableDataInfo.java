package com.shengqitech.ems.system.page;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

/**
 * 表格分页数据对象
 *
 * @author wsh
 */
@ApiModel(value = "TableDataInfo", description = "分页数据对象")
public class TableDataInfo<T> implements Serializable {
    private static final long serialVersionUID = 1L;

    /**
     * 总记录数
     */
    @ApiModelProperty("总记录数")
    private long total;
    /**
     * 总记录数
     */
    @ApiModelProperty("统计类数据(列表统计项)")
    private Map<Object,Object> counter;

    /**
     * 列表数据
     */
    @ApiModelProperty("列表数据")
    private List<T> list;

    /**
     * 表格数据对象
     */
    public TableDataInfo(List<T> list) {
        this.list = list;
    }

    /**
     * 分页
     *
     * @param list  列表数据
     * @param total 总记录数
     */
    public TableDataInfo(List<T> list, int total) {
        this.list = list;
        this.total = total;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public List<T> getList() {
        return list;
    }

    public void setList(List<T> list) {
        this.list = list;
    }

    public Map<Object, Object> getCounter() {
        return counter;
    }

    public void setCounter(Map<Object, Object> counter) {
        this.counter = counter;
    }
}