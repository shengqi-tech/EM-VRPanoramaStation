package com.shengqitech.ems.system.http;

import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.List;
import java.util.Map;


/**
 * @author : wsh
 * @Date : 2023/6/20
 * @Description: restTemplate 封装类
 */
@Component
public class RestClient {

    private final RestTemplate restTemplate;

    public RestClient() {
        this.restTemplate = new RestTemplate();
    }

    /**
     * post
     * @param url 请求路径
     * @param request 请求对象
     * @param responseType 响应类型
     * @return
     * @param <T>
     */
    public <T> ResponseEntity<T> post(String url, Object request, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Object> httpEntity = new HttpEntity<>(request, headers);

        return restTemplate.exchange(url, HttpMethod.POST, httpEntity, responseType);
    }

    /**
     * post
     * @param url 请求路径
     * @param formData 参数
     * @param responseType 响应类型
     * @return
     * @param <T>
     */
    public <T> ResponseEntity<T> postFormData(String url, Map<String, Object> formData, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        for (Map.Entry<String, Object> entry : formData.entrySet()) {
            body.add(entry.getKey(), entry.getValue());
        }

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        return restTemplate.exchange(url, HttpMethod.POST, requestEntity, responseType);
    }


    /**
     * get
     * @param url 请求路径
     * @param params 请求参数
     * @param responseType 响应类型
     * @return
     * @param <T>
     */
    public <T> ResponseEntity<T> get(String url, MultiValueMap<String, String> params, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
        if (params != null && !params.isEmpty()){
            for (Map.Entry<String, List<String>> entry : params.entrySet()) {
                String key = entry.getKey();
                List<String> values = entry.getValue();
                for (String value : values) {
                    builder.queryParam(key, value);
                }
            }
        }


        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);

        return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, httpEntity, responseType);
    }

    /**
     * get请求
     * @param url 访问路径
     * @param params 参数
     * @param authorization token
     * @param responseType 返回类型
     * @return
     * @param <T>
     */
    public <T> ResponseEntity<T> getWithAuthorization(String url, MultiValueMap<String, String> params, String authorization, Class<T> responseType) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        headers.set("Authorization", authorization);

        UriComponentsBuilder builder = UriComponentsBuilder.fromHttpUrl(url);
        if (params != null && !params.isEmpty()){
            for (Map.Entry<String, List<String>> entry : params.entrySet()) {
                String key = entry.getKey();
                List<String> values = entry.getValue();
                for (String value : values) {
                    builder.queryParam(key, value);
                }
            }
        }

        HttpEntity<Object> httpEntity = new HttpEntity<>(headers);

        return restTemplate.exchange(builder.toUriString(), HttpMethod.GET, httpEntity, responseType);
    }
}
