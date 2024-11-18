package com.shengqitech.ems.system.exception;

import com.shengqitech.ems.common.exception.ServiceException;
import com.shengqitech.ems.controllers.wrappers.WrapMapper;
import com.shengqitech.ems.controllers.wrappers.Wrapper;
import com.shengqitech.ems.system.utils.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.DuplicateKeyException;
//import org.springframework.security.access.AccessDeniedException;
import org.springframework.validation.BindException;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.servlet.http.HttpServletRequest;
import java.sql.SQLDataException;
import java.sql.SQLException;
import java.sql.SQLIntegrityConstraintViolationException;

/**
 * 全局异常处理器
 *
 * @author wsh
 */
@RestControllerAdvice
public class GlobalExceptionHandler {
    private static final Logger log = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    /**
     * 权限校验异常
     */
//    @ExceptionHandler(AccessDeniedException.class)
//    public Wrapper handleAccessDeniedException(AccessDeniedException e, HttpServletRequest request) {
//        String requestURI = request.getRequestURI();
//        log.error("请求地址'{}',权限校验失败'{}'", requestURI, e.getMessage());
//        return WrapMapper.error(HttpStatus.FORBIDDEN, "没有权限，请联系管理员授权");
//    }

    /**
     * 请求方式不支持
     */
    @ExceptionHandler(HttpRequestMethodNotSupportedException.class)
    public Wrapper handleHttpRequestMethodNotSupported(HttpRequestMethodNotSupportedException e,
                                                       HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',不支持'{}'请求", requestURI, e.getMethod());
        return WrapMapper.error(e.getMessage());
    }

    /**
     * 业务异常
     */
    @ExceptionHandler(ServiceException.class)
    public Wrapper handleServiceException(ServiceException e, HttpServletRequest request) {
        log.error(e.getMessage(), e);
        Integer code = e.getCode();
        return StringUtils.isNotNull(code) ? WrapMapper.error(code, e.getMessage()) : WrapMapper.error(e.getMessage());
    }

    /**
     * 拦截未知的运行时异常
     */
    @ExceptionHandler(RuntimeException.class)
    public Wrapper handleRuntimeException(RuntimeException e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',发生未知异常.", requestURI, e);
        return WrapMapper.error(e.getMessage());
    }


    /**
     * 系统异常
     */
    @ExceptionHandler(Exception.class)
    public Wrapper handleException(Exception e, HttpServletRequest request) {
        String requestURI = request.getRequestURI();
        log.error("请求地址'{}',发生系统异常.", requestURI, e);
        return WrapMapper.error(e.getMessage());
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(BindException.class)
    public Wrapper handleBindException(BindException e) {
        log.error(e.getMessage(), e);
        String message = e.getAllErrors().get(0).getDefaultMessage();
        return WrapMapper.error(message);
    }

    /**
     * 自定义验证异常
     */
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public Object handleMethodArgumentNotValidException(MethodArgumentNotValidException e) {
        log.error(e.getMessage(), e);
        String message = e.getBindingResult().getFieldError().getDefaultMessage();
        return WrapMapper.error(message);
    }
    /**
     * 自定义验证异常
     */
    @ExceptionHandler(SQLException.class)
    public Object handleSQLException(SQLException e) {
        String message = "";
        // 根据异常类型进行分类处理
        if (e instanceof SQLIntegrityConstraintViolationException) {
            // 唯一约束冲突异常处理
            message = "有重复的数据，请核对";
        } else if (e instanceof SQLDataException) {
            // 数据格式错误异常处理
            message = "输入数据格式错误，请检查后重新提交。";
        } else {
            // 其他数据库异常处理
            message = "数据库操作异常，请稍后重试或联系管理员。";
        }
        return WrapMapper.error(message);
    }

    @ExceptionHandler(DataAccessException.class)
    public Object handleDataAccessException(DataAccessException ex) {
        String message = "数据库操作异常，请稍后重试或联系管理员。";

        // 根据具体的异常类型进行处理和定制错误消息
        if (ex instanceof DuplicateKeyException) {
            message = "违反唯一性约束，请修改后重试。";
        } else if (ex instanceof DataIntegrityViolationException) {
            message = "数据完整性违规，请检查后重新提交。";
        }
        log.error(ex.getMessage(), ex);
        // 返回适当的HTTP响应码和错误消息
        return  WrapMapper.error(message);
    }

}
