package com.shengqitech.ems.controllers;


import com.aliyun.auth.credentials.Credential;
import com.aliyun.auth.credentials.provider.StaticCredentialProvider;
import com.aliyun.sdk.service.dysmsapi20170525.AsyncClient;
import com.aliyun.sdk.service.dysmsapi20170525.models.SendSmsRequest;
import com.aliyun.sdk.service.dysmsapi20170525.models.SendSmsResponse;
import com.google.gson.Gson;
import com.shengqitech.ems.common.aspectj.annotation.MyLog;
import com.shengqitech.ems.common.aspectj.enums.BusinessType;
import com.shengqitech.ems.common.constant.CacheConstants;
import com.shengqitech.ems.common.constant.Constants;
import com.shengqitech.ems.common.security.context.AuthenticationContextHolder;
import com.shengqitech.ems.common.security.service.SysLoginService;
import com.shengqitech.ems.common.security.service.TokenService;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.mappers.SysfileMapper;
import com.shengqitech.ems.models.domains.LoginBody;
import com.shengqitech.ems.models.domains.LoginUser;
import com.shengqitech.ems.models.domains.Sysfile;
import com.shengqitech.ems.models.domains.Sysuser;
import com.shengqitech.ems.models.po.SysuserAddPo;
import com.shengqitech.ems.models.vo.SysuserViewVo;
import com.shengqitech.ems.models.vo.SysuserVo;
import com.shengqitech.ems.models.po.SysuserEditPo;
import com.shengqitech.ems.services.ISysuserService;
import com.shengqitech.ems.system.config.ProjectConfig;
import com.shengqitech.ems.system.page.TableDataInfo;
import com.shengqitech.ems.system.redis.RedisCache;
import com.shengqitech.ems.system.utils.SecurityUtils;
import com.shengqitech.ems.system.utils.StringUtils;
import com.shengqitech.ems.system.utils.uuid.IdUtils;
import darabonba.core.client.ClientOverrideConfiguration;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.annotation.Resource;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

/**
 * <p>
 * 前端控制器
 * </p>
 *
 * @author wsh
 * @since 2023-11-21
 */
@Slf4j
@RestController
@RequestMapping("/sysuser")
@Api(value = "用户管理", tags = "sysuserController")
public class SysuserController extends BaseController {

    @Autowired
    private SysLoginService loginService;


    @Autowired
    private SysfileMapper sysfileMapper;

    @Autowired
    private AsyncClient asyncClient;

    @Autowired
    private RedisCache redisCache;

    @Autowired
    private ISysuserService sysuserService;

    @Autowired
    private TokenService tokenService;

    @Value("${aliyun.sms.expireTime}")
    private Integer expireTime;
    @Value("${aliyun.sms.templateCode}")
    private String templateCode;
    @Value("${aliyun.sms.signName}")
    private String signName;
    // 令牌秘钥
    @Value("${token.secret}")
    private String secret;

    @Resource
    private AuthenticationManager authenticationManager;

    @ApiImplicitParams({@ApiImplicitParam(name = "sysuserAddPo", value = "新增用户PO类", dataTypeClass = SysuserAddPo.class, required = true),})
    @ApiOperation(value = "新增用户", nickname = "insertSysuser")
    @MyLog(title = "新增用户", businessType = BusinessType.INSERT)
    @PostMapping("/insert")
    public Wrapper insert(@RequestBody SysuserAddPo sysuserAddPo) {
        Boolean flag = sysuserService.insert(sysuserAddPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    /**
     * 登录方法
     *
     * @param loginBody 登录信息
     * @return 结果
     */
    @ApiImplicitParams({
            @ApiImplicitParam(name = "username", value = "用户名", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "password", value = "密码", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "code", value = "验证码", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "uuid", value = "uuid", dataTypeClass = String.class, required = false),
    })
    @ApiOperation(value = "用户登录", nickname = "login")
    @MyLog(title = "用户登录", businessType = BusinessType.OTHER)
    @PostMapping("/login")
    public Wrapper login(@RequestBody LoginBody loginBody) {
        String token = loginService.login(loginBody.getUsername(), loginBody.getPassword(), loginBody.getCode(),
                loginBody.getUuid());
        return WrapMapper.ok(token);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_sysuser_id", value = "用户id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_sysuser_name", value = "用户姓名", dataTypeClass = String.class, required = false),
            @ApiImplicitParam(name = "ems_sysuser_customerid", value = "客户id", dataTypeClass = Integer.class, required = false),
            @ApiImplicitParam(name = "ems_sysuser_starttime", value = "开始时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "ems_sysuser_endtime", value = "结束时间", dataTypeClass = Date.class, required = false),
            @ApiImplicitParam(name = "pageNum", value = "当前页", required = false, dataTypeClass = Integer.class, paramType = "query"),
            @ApiImplicitParam(name = "pageSize", value = "每页显示的数量", required = false, dataTypeClass = Integer.class, paramType = "query"),
    })
    @ApiOperation(value = "查询用户", nickname = "findSysuserByMap")
    @MyLog(title = "查询用户", businessType = BusinessType.SELECT)
    @GetMapping("/findByMap")
    public Wrapper<TableDataInfo<SysuserVo>> findByMap(Integer ems_sysuser_id, String ems_sysuser_name, Integer ems_sysuser_customerid, Date ems_sysuser_starttime, Date ems_sysuser_endtime) {
        Map<String, Object> map = new HashMap<>();
        if (ems_sysuser_id != null) {
            map.put("ems_sysuser_id", ems_sysuser_id);
        }
        if (!StringUtils.isEmpty(ems_sysuser_name)) {
            map.put("ems_sysuser_name", ems_sysuser_name);
        }
        if (ems_sysuser_customerid != null) {
            map.put("ems_sysuser_customerid", ems_sysuser_customerid);
        }
        if (ems_sysuser_starttime != null) {
            map.put("ems_sysuser_starttime", ems_sysuser_starttime);
        }
        if (ems_sysuser_endtime != null) {
            map.put("ems_sysuser_endtime", ems_sysuser_endtime);
        }
        startPage();
        List<SysuserVo> sysuserVos = sysuserService.findByMap(map);
        return WrapMapper.ok(getDataTable(sysuserVos));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_sysuser_id", value = "用户id", dataTypeClass = Integer.class, required = true),
    })
    @ApiOperation(value = "查询用户详情", nickname = "getSysuserView")
    @MyLog(title = "查询用户详情", businessType = BusinessType.SELECT)
    @GetMapping("/getView")
    public Wrapper<SysuserViewVo> getView(Integer ems_sysuser_id) {
        SysuserViewVo view = sysuserService.getView(ems_sysuser_id);
        return WrapMapper.ok(view);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "mobile", value = "手机号码", required = true),
    })
    @ApiOperation(value = "获取手机验证码", nickname = "smsCode")
    @MyLog(title = "获取手机验证码", businessType = BusinessType.OTHER)
    @GetMapping("/smsCode")
    public Wrapper smsCode(String mobile) {
        int code = (int) Math.ceil(Math.random() * 9000 + 1000);
        Map<String, Object> map = new HashMap<>();
        map.put("mobile", mobile);
        map.put("smsCode", code);
        // 缓存验证码(5分钟)
        redisCache.setCacheObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.SYS_CODE + ":" + mobile, map, expireTime, TimeUnit.MINUTES);
        try {
            // Parameter settings for API request
            SendSmsRequest sendSmsRequest = SendSmsRequest.builder()
                    // 接收短信的手机号码，多个用英文逗号隔开
                    .phoneNumbers(mobile)
                    // 短信签名名称，eg: "武汉生栖"
                    .signName(signName)
                    // 短信模板CODE
                    .templateCode(templateCode)
                    .templateParam("{\"code\":" + "\"" + code + "\"}")
                    // 短信模板变量对应的实际值，eg：{"code":"1234"}
                    // Request-level configuration rewrite, can set Http request parameters, etc.
                    // .requestConfiguration(RequestConfiguration.create().setHttpHeaders(new HttpHeaders()))
                    .build();

            CompletableFuture<SendSmsResponse> response = asyncClient.sendSms(sendSmsRequest);
            // Synchronously get the return value of the API request
            SendSmsResponse resp = response.get();
            log.info(new Gson().toJson(resp));
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        }
        return WrapMapper.ok();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "mobile", value = "手机号码", required = true),
            @ApiImplicitParam(name = "code", value = "验证码", required = true),
    })
    @ApiOperation(value = "校验验证码", nickname = "checkCode")
    @MyLog(title = "校验验证码", businessType = BusinessType.OTHER)
    @GetMapping("/checkCode")
    public Wrapper checkCode(String mobile, String code) {
        Map cacheMap = redisCache.getCacheObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.SYS_CODE + ":" + mobile);
        if (cacheMap == null) {
            throw new BadCredentialsException("未检测到申请验证码");
        }

        String mobileStr = (String) cacheMap.get("mobile");
        Integer smsCode = (Integer) cacheMap.get("smsCode");

        if (!mobileStr.equals(mobile)) {
            throw new BadCredentialsException("手机号码不一致");
        }
        if (smsCode != Integer.parseInt(code)) {
            throw new BadCredentialsException("验证码错误");
        }
        redisCache.deleteObject(CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.SYS_CODE + ":" + mobile);
        return WrapMapper.ok();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_sysuser_id", value = "用户id", required = true),
            @ApiImplicitParam(name = "ems_sysuser_password", value = "密码", required = true),
    })
    @ApiOperation(value = "重置密码", nickname = "resetPwd")
    @MyLog(title = "重置密码", businessType = BusinessType.OTHER)
    @PostMapping("/resetPwd")
    public Wrapper resetPwd(Integer ems_sysuser_id, String ems_sysuser_password) {
        Sysuser sysuser = Sysuser.builder()
                .ems_sysuser_id(ems_sysuser_id)
                .ems_sysuser_password(SecurityUtils.encryptPassword(ems_sysuser_password))
                .ems_sysuser_updatetime(new Date())
                .build();
        Boolean flag = sysuserService.resetPwd(sysuser);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "mobile", value = "手机号码", dataTypeClass = String.class, required = true),
            @ApiImplicitParam(name = "smsCode", value = "验证码", dataTypeClass = String.class, required = true),
    })
    @ApiOperation(value = "手机验证码登录", nickname = "smsLogin")
    @MyLog(title = "手机验证码登录", businessType = BusinessType.OTHER)
    @PostMapping("/smsLogin")
    public Wrapper phoneLogin(String mobile, String smsCode) {
        return null;
    }

    /**
     * 获取当前用户信息
     *
     * @return 结果
     */
    @MyLog(title = "获取当前用户信息", businessType = BusinessType.SELECT)
    @ApiOperation(value = "获取当前用户信息", nickname = "getCurrentUser")
    @GetMapping("/getCurrentUser")
    public Wrapper<SysuserVo> getCurrentUser() {
        // 获取当前用户
        Authentication authentication = SecurityUtils.getAuthentication();
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();
        return WrapMapper.ok(result(loginUser));
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysuserEditPo", value = "编辑用户信息PO类", dataTypeClass = SysuserEditPo.class, required = true),
    })
    @ApiOperation(value = "编辑用户", nickname = "updateSysuser")
    @MyLog(title = "编辑用户", businessType = BusinessType.UPDATE)
    @PostMapping("/update")
    public Wrapper update(@RequestBody SysuserEditPo sysuserEditPo) {
        Boolean flag = sysuserService.update(sysuserEditPo);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "sysuserEditPo", value = "编辑用户信息PO类", dataTypeClass = SysuserEditPo.class, required = true),
    })
    @ApiOperation(value = "个人设置", nickname = "personalSetting")
    @MyLog(title = "个人设置", businessType = BusinessType.OTHER)
    @PostMapping("/personalSetting")
    public Wrapper personalSetting(@RequestBody SysuserEditPo sysuserEditPo) {
        Sysfile avatarfile = sysuserEditPo.getEms_sysuser_avatarfile();
        LoginUser loginUser = SecurityUtils.getLoginUser();
        Sysuser currentUser = loginUser.getUser();
        currentUser.setEms_sysuser_id(sysuserEditPo.getEms_sysuser_id());
        currentUser.setEms_sysuser_name(sysuserEditPo.getEms_sysuser_name());
        currentUser.setEms_sysuser_avatarfileid(avatarfile == null ? null : avatarfile.getEms_sysfile_id());
        currentUser.setEms_sysuser_mobilephone(sysuserEditPo.getEms_sysuser_mobilephone());
        currentUser.setEms_sysuser_signature(sysuserEditPo.getEms_sysuser_signature());
        currentUser.setEms_sysuser_address(sysuserEditPo.getEms_sysuser_address());
        currentUser.setEms_sysuser_updatetime(new Date());
        Boolean flag = sysuserService.personalSetting(currentUser);
        if (flag) {
            // 更新缓存用户信息
            tokenService.setLoginUser(loginUser);
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ids", value = "用户id数组", dataTypeClass = Integer.class, required = true, allowMultiple = true),
    })
    @ApiOperation(value = "删除用户", nickname = "deleteSysuser")
    @MyLog(title = "删除用户", businessType = BusinessType.DELETE)
    @GetMapping("/delete")
    public Wrapper delete(Integer[] ids) {
        Boolean flag = sysuserService.delete(ids);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @GetMapping("/getToken")
    public Wrapper<String> getToken() {
        // 用户验证
        Authentication authentication = null;
        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken("admin", "admin123");
        AuthenticationContextHolder.setContext(authenticationToken);
        // 该方法会去调用UserDetailsServiceImpl.loadUserByUsername
        authentication = authenticationManager.authenticate(authenticationToken);
        LoginUser loginUser = (LoginUser) authentication.getPrincipal();

        String uuid = IdUtils.fastUUID();
        loginUser.setToken(uuid);

        loginUser.setLoginTime(System.currentTimeMillis());
        loginUser.setExpireTime(-1L);
        // 根据uuid将loginUser缓存
        String userKey = CacheConstants.SYSTEM_KEY + CacheConstants.SEGMENT_KEY + CacheConstants.LOGIN_TOKEN_KEY + uuid;
        redisCache.setCacheObject(userKey, loginUser);

        Map<String, Object> claims = new HashMap<>();
        claims.put(Constants.LOGIN_USER_KEY, uuid);
        String token = Jwts.builder()
                .setClaims(claims)
                .signWith(SignatureAlgorithm.HS512, secret).compact();
        // 生成token
//        String token = tokenService.createToken(loginUser);
        return WrapMapper.ok(token);
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_sysuser_id", value = "用户id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "ids", value = "用户id数组", dataTypeClass = Integer.class, required = true, allowMultiple = true),
    })
    @ApiOperation(value = "分配角色", nickname = "assignRoles")
    @MyLog(title = "分配角色", businessType = BusinessType.OTHER)
    @PostMapping("/assignRoles")
    public Wrapper assignRoles(Integer ems_sysuser_id, Integer[] ids) {
        Boolean flag = sysuserService.assignRoles(ems_sysuser_id, ids);
        if (flag) {
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    @ApiImplicitParams({
            @ApiImplicitParam(name = "ems_sysuser_id", value = "用户id", dataTypeClass = Integer.class, required = true),
            @ApiImplicitParam(name = "ems_instance_ids", value = "监测站点id数组", dataTypeClass = Integer.class, required = true, allowMultiple = true),
            @ApiImplicitParam(name = "ems_assign_expirationdate", value = "过期时间(开始时间~结束时间)", dataTypeClass = String.class, required = true),
    })
    @ApiOperation(value = "分配检测站点", nickname = "assignInstance")
    @MyLog(title = "分配检测站点", businessType = BusinessType.OTHER)
    @PostMapping("/assignInstance")
    public Wrapper assignInstance(Integer ems_sysuser_id, Integer[] ems_instance_ids, String ems_assign_expirationdate) {
        Boolean flag = sysuserService.assignInstance(ems_sysuser_id, ems_instance_ids, ems_assign_expirationdate);
        if (flag){
            return WrapMapper.ok();
        }
        return WrapMapper.error();
    }

    /**
     * 该方法不会进入，会被security拦截
     *
     * @return
     */
    @GetMapping("/loginOut")
    @ApiOperation(value = "用户注销", nickname = "loginOut")
    public Wrapper loginOut() {
        return null;
    }

    @ApiOperation(value = "上传用户文件", nickname = "uploadUserFile")
    @MyLog(title = "上传用户文件", businessType = BusinessType.OTHER)
    @PostMapping("/upload")
    public Wrapper<Sysfile> upload(@RequestPart("file") MultipartFile file) {
        return super.upload(file, ProjectConfig.getUserPath(), null);
    }

    private SysuserVo result(@RequestBody LoginUser loginUser) {
        Sysuser sysUser = loginUser.getUser();
        Sysfile sysfile = sysfileMapper.selectByFileId(sysUser.getEms_sysuser_avatarfileid());
        SysuserVo userDto = new SysuserVo();
        userDto.setEms_sysuser_id(sysUser.getEms_sysuser_id());
        userDto.setEms_sysuser_loginname(sysUser.getEms_sysuser_loginname());
        userDto.setEms_sysuser_name(sysUser.getEms_sysuser_name());
        userDto.setEms_sysuser_status(sysUser.getEms_sysuser_status());
        userDto.setEms_sysuser_customerid(sysUser.getEms_sysuser_customerid());
        userDto.setEms_sysuser_mobilephone(sysUser.getEms_sysuser_mobilephone());
        userDto.setEms_sysuser_signature(sysUser.getEms_sysuser_signature());
        userDto.setEms_sysuser_address(sysUser.getEms_sysuser_address());
        userDto.setEms_sysuser_creatime(sysUser.getEms_sysuser_creatime());
        userDto.setEms_sysuser_updatetime(sysUser.getEms_sysuser_updatetime());
        userDto.setRoles(sysUser.getRoles());
        userDto.setPermissions(loginUser.getPermissions());
        userDto.setEms_sysuser_avatarfile(sysfile);
        return userDto;
    }

    public static void main(String[] args) throws Exception {
        // Configure Credentials authentication information, including ak, secret, token
        StaticCredentialProvider provider = StaticCredentialProvider.create(Credential.builder()
                // Please ensure that the environment variables ALIBABA_CLOUD_ACCESS_KEY_ID and ALIBABA_CLOUD_ACCESS_KEY_SECRET are set.
                .accessKeyId("LTAI5tC6bSZGuP1iyXbLrJTn")
                .accessKeySecret("H8bm25AaqTXZ3azdb2osfcfBq8qYJD")
                //.securityToken(System.getenv("ALIBABA_CLOUD_SECURITY_TOKEN")) // use STS token
                .build());

        // Configure the Client
        AsyncClient client = AsyncClient.builder()
                .region("cn-hangzhou") // Region ID
                //.httpClient(httpClient) // Use the configured HttpClient, otherwise use the default HttpClient (Apache HttpClient)
                .credentialsProvider(provider)
                //.serviceConfiguration(Configuration.create()) // Service-level configuration
                // Client-level configuration rewrite, can set Endpoint, Http request parameters, etc.
                .overrideConfiguration(
                        ClientOverrideConfiguration.create()
                                // Endpoint 请参考 https://api.aliyun.com/product/Dysmsapi
                                .setEndpointOverride("dysmsapi.aliyuncs.com")
                        //.setConnectTimeout(Duration.ofSeconds(30))
                )
                .build();

        // Parameter settings for API request
        SendSmsRequest sendSmsRequest = SendSmsRequest.builder()
                // 接收短信的手机号码，多个用英文逗号隔开
                .phoneNumbers("15912590423")
                // 短信签名名称，eg: "武汉生栖"
                .signName("武汉生栖科技")
                // 短信模板CODE
                .templateCode("SMS_464740666")
                .templateParam("{\"code\":\"112233\"}")
                // 短信模板变量对应的实际值，eg：{"code":"1234"}
                // Request-level configuration rewrite, can set Http request parameters, etc.
                // .requestConfiguration(RequestConfiguration.create().setHttpHeaders(new HttpHeaders()))
                .build();

        // Asynchronously get the return value of the API request
        CompletableFuture<SendSmsResponse> response = client.sendSms(sendSmsRequest);
        // Synchronously get the return value of the API request
        SendSmsResponse resp = response.get();
        System.out.println(new Gson().toJson(resp));
        // Asynchronous processing of return values
        /*response.thenAccept(resp -> {
            System.out.println(new Gson().toJson(resp));
        }).exceptionally(throwable -> { // Handling exceptions
            System.out.println(throwable.getMessage());
            return null;
        });*/

        // Finally, close the client
        client.close();
    }


}
