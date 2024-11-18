package com.shengqitech.ems.controllers.wrappers;

import com.shengqitech.ems.common.constant.HttpMessage;
import com.shengqitech.ems.common.constant.HttpStatus;
import org.apache.commons.lang3.StringUtils;

public class WrapMapper {
    /**
     * Instantiates a new wrap mapper.
     */
    public WrapMapper() {
    }

    /**
     * Wrap.
     *
     * @param <E>     the element type
     * @param code    the code
     * @param message the message
     * @param o       the o
     * @return the wrapper
     */
    public static <E> Wrapper<E> wrap(int code, String message, E o) {
        return new Wrapper<>(code, message, o);
    }

    /**
     * Wrap.
     *
     * @param <E>     the element type
     * @param code    the code
     * @param message the message
     * @return the wrapper
     */
    public static <E> Wrapper<E> wrap(int code, String message) {
        return wrap(code, message, null);
    }

    /**
     * Wrap.
     *
     * @param <E>  the element type
     * @param code the code
     * @return the wrapper
     */
    public static <E> Wrapper<E> wrap(int code) {
        return wrap(code, null);
    }

    /**
     * Wrap.
     *
     * @param <E> the element type
     * @param e   the e
     * @return the wrapper
     */
    public static <E> Wrapper<E> wrap(Exception e) {
        return new Wrapper<>(HttpStatus.ERROR, e.getMessage());
    }

    /**
     * Un wrapper.
     *
     * @param <E>     the element type
     * @param wrapper the wrapper
     * @return the e
     */
    public static <E> E unWrap(Wrapper<E> wrapper) {
        return wrapper.getResult();
    }

    /**
     * Wrap ERROR. code=100
     *
     * @param <E> the element type
     * @return the wrapper
     */
    public static <E> Wrapper<E> illegalArgument() {
        return wrap(HttpStatus.ILLEGAL_ARGUMENT_CODE_, HttpMessage.ILLEGAL_ARGUMENT_MESSAGE);
    }

    /**
     * Wrap ERROR. code=500
     *
     * @param <E> the element type
     * @return the wrapper
     */
    public static <E> Wrapper<E> error() {
        return wrap(HttpStatus.ERROR, HttpStatus.ERROR_MESSAGE);
    }


    /**
     * Error wrapper.
     *
     * @param <E>     the type parameter
     * @param message the message
     * @return the wrapper
     */
    public static <E> Wrapper<E> error(int code, String message) {
        return wrap(code, StringUtils.isBlank(message) ? HttpStatus.ERROR_MESSAGE : message);
    }

    public static <E> Wrapper<E> error(String message) {
        return wrap(HttpStatus.ERROR, StringUtils.isBlank(message) ? HttpStatus.ERROR_MESSAGE : message);
    }

    /**
     * Wrap SUCCESS. code=200
     *
     * @param <E> the element type
     * @return the wrapper
     */
    public static <E> Wrapper<E> ok() {
        return new Wrapper<>();
    }

    /**
     * Ok wrapper.
     *
     * @param <E> the type parameter
     * @param o   the o
     * @return the wrapper
     */
    public static <E> Wrapper<E> ok(E o) {
        return new Wrapper<>(HttpStatus.SUCCESS, HttpMessage.SUCCESS_MESSAGE, o);
    }
}
