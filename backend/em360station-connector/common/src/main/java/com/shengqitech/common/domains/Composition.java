package com.shengqitech.common.domains;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * <p>
 * 组成
 * </p>
 *
 * @author wsh
 * @since 2023-11-24
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Composition implements Serializable {

    private static final long serialVersionUID = 1L;

    private Integer ems_composition_id;

    private Integer ems_composition_pid;

    private String ems_composition_name;

    private Integer ems_composition_iconfileid;

    private Integer ems_composition_modelfileid;

    private String ems_composition_des;

    private Boolean ems_composition_isleaf;

    private Integer ems_composition_standardid;
}
