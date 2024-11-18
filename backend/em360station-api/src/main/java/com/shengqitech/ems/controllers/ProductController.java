package com.shengqitech.ems.controllers;


import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.domains.Product;
import com.shengqitech.ems.models.vo.ApiVo;
import com.shengqitech.ems.models.vo.ProductVo;
import com.shengqitech.ems.services.IProductService;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@RestController
@RequestMapping("/product")
@Api(value = "产品表管理", tags = "productController")
public class ProductController extends BaseController {

    @Autowired
    private IProductService productService;

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_product_id", value = "产品id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_product_name", value = "产品名称", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_product_type", value = "产品型号", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_composition_id", value = "组成id", dataTypeClass = Integer.class, required = false),
//            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
//            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量" , required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询产品", nickname = "findProductByMap")
    @MyLog(title = "查询产品", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<List<ProductVo>> findByMap(Integer ems_product_id, String ems_product_name, String ems_product_type, Integer ems_composition_id) {
        Map<String, Object> map = new HashMap<>();
        if (ems_product_id != null) {
            map.put("ems_product_id", ems_product_id);
        }
        if (!StringUtils.isEmpty(ems_product_name)) {
            map.put("ems_product_name", ems_product_name);
        }
        if (!StringUtils.isEmpty(ems_product_type)) {
            map.put("ems_product_type", ems_product_type);
        }
        if (ems_composition_id != null) {
            map.put("ems_composition_id", ems_composition_id);
        }
        List<ProductVo> products = productService.findByMap(map);

        return WrapMapper.ok(products);
    }

}
