package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Date;

/**
 * <p>
 * 产品
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer ems_product_id;

    private String ems_product_name;

    private Integer ems_product_picfileid;

    private Integer ems_product_modelfileid;

    private String ems_product_type;

    private String ems_product_des;

    private Integer ems_product_compositionid;

    private Date ems_product_createtime;

    private Date ems_product_updatetime;

    private String ems_product_brand;
}
