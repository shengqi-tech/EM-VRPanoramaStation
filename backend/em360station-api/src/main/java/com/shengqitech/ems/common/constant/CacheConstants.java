package com.shengqitech.ems.common.constant;

/**
 * 缓存的key 常量
 *
 * @author wsh
 */
public class CacheConstants {

    /**
     * 系统名称常量
     */
    public static final String SYSTEM_KEY = "ems";

    /**
     * KEY分隔符
     */
    public static final String SEGMENT_KEY = ":";

    /**
     * websocket 站房编号
     */
    public static final String WEBSOCKET_INSTANCE_NO = "instanceNo";

    /**
     * 登录用户 redis key
     */
    public static final String LOGIN_TOKEN_KEY = "login_tokens:";

    /**
     * JNPF平台token(唯一)
     */
    public static final String JNPF_TOKEN_KEY = "jnpf_tokens";

    /**
     * 验证码 redis key
     */
    public static final String CAPTCHA_CODE_KEY = "captcha_codes:";

    /**
     * 参数管理 cache key
     */
    public static final String SYS_CONFIG_KEY = "sys_config:";

    /**
     * 字典管理 cache key
     */
    public static final String SYS_DICT_KEY = "sys_dict:";

    /**
     * 防重提交 redis key
     */
    public static final String REPEAT_SUBMIT_KEY = "repeat_submit:";

    /**
     * 限流 redis key
     */
    public static final String RATE_LIMIT_KEY = "rate_limit:";

    /**
     * 登录账户密码错误次数 redis key
     */
    public static final String PWD_ERR_CNT_KEY = "pwd_err_cnt:";

    /**
     * 验证码key
     */
    public static final String SYS_CODE = "smsCode";

}
