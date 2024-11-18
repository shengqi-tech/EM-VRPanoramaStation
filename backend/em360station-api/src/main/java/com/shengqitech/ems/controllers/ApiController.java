package com.shengqitech.ems.controllers;

import com.alibaba.fastjson2.JSONArray;
import com.alibaba.fastjson2.JSONObject;
import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.models.po.ApiAddPo;
import com.shengqitech.ems.models.po.ApiEditPo;
import com.shengqitech.ems.models.vo.ApiVo;
import com.shengqitech.ems.system.http.RestClient;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.utils.StringUtils;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.shengqitech.ems.services.IApiService;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-12-04
 */
@RestController
@RequestMapping("/api")
@Api(value = "平台对接表管理", tags = "apiController")
public class ApiController extends BaseController {


    @Autowired
    private IApiService ApiService;

    @Autowired
    private RestClient restClient;

    @ApiImplicitParams({@ApiImplicitParam(name = "apiAddPo", value = "添加平台对接表PO类", dataTypeClass = ApiAddPo.class, required = true),})
    @ApiOperation(value = "新增平台对接表", nickname = "insertApi")
    @MyLog(title = "新增平台对接表", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper<Integer> insert(@RequestBody ApiAddPo apiAddPo) {
        int count = ApiService.insert(apiAddPo);
        if (count > 0) {
            return WrapMapper.ok(count);
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "apiEditPo", value = "编辑平台对接表PO类", dataTypeClass = ApiEditPo.class, required = true),})
    @ApiOperation(value = "编辑平台对接表", nickname = "updateApi")
    @MyLog(title = "编辑平台对接表", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody ApiEditPo apiEditPo) {
        Boolean flag = ApiService.update(apiEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "ems_api_id", value = "平台对接表id", dataTypeClass = Integer.class, required = true),})
    @ApiOperation(value = "删除平台对接表", nickname = "deleteApi")
    @MyLog(title = "删除平台对接表", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer ems_api_id) {
        Boolean flag = ApiService.delete(ems_api_id);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams(value = {
            @ApiImplicitParam(name = "ems_api_url", value = "请求地址", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_api_requesttype", value = "请求类型(GET POST)", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_api_starttime", value = "开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_api_endtime", value = "结束时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量" , required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询平台对接表", nickname = "findApiByMap")
    @MyLog(title = "查询平台对接表", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<ApiVo>> findByMap(String ems_api_url, String ems_api_requesttype, Date ems_api_starttime, Date ems_api_endtime) {
        Map<String, Object> map = new HashMap<>();
        if (!StringUtils.isEmpty(ems_api_url)) {
            map.put("ems_api_url", ems_api_url);
        }
        if (!StringUtils.isEmpty(ems_api_requesttype)) {
            map.put("ems_api_requesttype", ems_api_requesttype);
        }
        if (ems_api_starttime != null) {
            map.put("ems_api_starttime", ems_api_starttime);
        }
        if (ems_api_endtime != null) {
            map.put("ems_api_endtime", ems_api_endtime);
        }
        startPage();
        List<ApiVo> apiVos = ApiService.findByMap(map);

        return WrapMapper.ok(getDataTable(apiVos));
    }

    @ApiImplicitParams({@ApiImplicitParam(name = "apiAddPo", value = "添加平台对接表PO类", dataTypeClass = ApiAddPo.class, required = true),})
    @ApiOperation(value = "调用测试", nickname = "callTest")
    @MyLog(title = "调用测试", businessType = BusinessType.OTHER)
    @PostMapping("/callTest")
    public JSONObject callTest(@RequestBody ApiAddPo apiAddPo) {
        String header = apiAddPo.getEms_api_header();
        String emsApiUrl = apiAddPo.getEms_api_url();
        HttpHeaders headers = new HttpHeaders();
        if (header != null && !"".equals(header)) {
            headers.set("Authorization", header);
        }
        String parameters = apiAddPo.getEms_api_parameters();
        Map<String, List<String>> queryParams = new HashMap<>();  // 修改为支持数组类型参数的Map
        Map<String, String> pathParams = new HashMap<>();
        if (parameters != null && !"{}".equals(parameters)) {
            JSONObject parametersJson = JSONObject.parseObject(parameters);
            if (parametersJson != null) {
                JSONObject parameter = parametersJson.getJSONObject("parameters");
                JSONArray queryParameters = parameter.getJSONArray("queryParameters");
                JSONArray pathParameters = parameter.getJSONArray("pathParameters");
                if (queryParameters != null && queryParameters.size() != 0) {
                    for (int i = 0; i < queryParameters.size(); i++) {
                        JSONObject json = queryParameters.getJSONObject(i);
                        String pname = json.getString("pname");

                        // 处理参数值为数组的情况
                        if (json.containsKey("pvalues") && json.get("pvalues") instanceof JSONArray) {
                            JSONArray pvaluesArray = json.getJSONArray("pvalues");
                            for (int j = 0; j < pvaluesArray.size(); j++) {
                                JSONObject jsonObject = pvaluesArray.getJSONObject(j);
                                String pvalue = jsonObject.getString("value");
//                                String pvalue = pvaluesArray.getString(j);
                                queryParams.computeIfAbsent(pname, k -> new ArrayList<>()).add(pvalue);
                            }
                        } else {
                            String pvalues = json.getString("pvalues");
                            queryParams.computeIfAbsent(pname, k -> new ArrayList<>()).add(pvalues);
                        }
                    }
                }
                if (pathParameters != null && pathParameters.size() != 0) {
                    for (int i = 0; i < pathParameters.size(); i++) {
                        JSONObject json = pathParameters.getJSONObject(i);
                        pathParams.put(json.getString("pathname"), json.getString("pathvalue"));
                    }
                }
            }
        }
        String url = buildUrlWithParams(emsApiUrl, queryParams, pathParams);
        String requesttype = apiAddPo.getEms_api_requesttype();

        ResponseEntity<JSONObject> responseEntity = null;
        if ("GET".equals(requesttype)) {
            // GET请求
            responseEntity = restClient.get(url, null, JSONObject.class);
        } else if ("POST".equals(requesttype)) {
            // POST请求
        }
        JSONObject body = responseEntity.getBody();
        if (body.getInteger("code") == 200) {
            System.out.println();
            return body;
        }
        return null;
    }

    private String buildUrlWithParams(String url, Map<String, List<String>> queryParams, Map<String, String> pathParams) {
        if (pathParams != null && !pathParams.isEmpty()) {
            for (Map.Entry<String, String> entry : pathParams.entrySet()) {
                url = url.replace("{" + entry.getKey() + "}", entry.getValue());
            }
        }
        if (queryParams != null && !queryParams.isEmpty()) {
            StringBuilder queryString = new StringBuilder("?");
            for (Map.Entry<String, List<String>> entry : queryParams.entrySet()) {
                String key = entry.getKey();
                List<String> values = entry.getValue();

                for (String value : values) {
                    queryString.append(key).append("=").append(value).append("&");
                }
            }
            url += queryString.substring(0, queryString.length() - 1); // remove the last "&"
        }
        return url;
    }

}