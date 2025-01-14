/*
 Navicat Premium Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80030 (8.0.30)
 Source Host           : localhost:3306
 Source Schema         : ems

 Target Server Type    : MySQL
 Target Server Version : 80030 (8.0.30)
 File Encoding         : 65001

 Date: 03/12/2024 11:22:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for activity
-- ----------------------------
DROP TABLE IF EXISTS `activity`;
CREATE TABLE `activity`  (
  `ems_activity_id` int NOT NULL AUTO_INCREMENT COMMENT '监测活动表',
  `ems_activity_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '监测活动名称',
  `ems_activity_elementid` int NULL DEFAULT NULL COMMENT '监测要素id',
  `ems_activity_sectorid` int NULL DEFAULT NULL COMMENT '污染源行业id',
  PRIMARY KEY (`ems_activity_id`) USING BTREE,
  INDEX `ems_activity_elementid_fk`(`ems_activity_elementid` ASC) USING BTREE,
  INDEX `ems_activity_sectorid_fk`(`ems_activity_sectorid` ASC) USING BTREE,
  CONSTRAINT `ems_activity_elementid_fk` FOREIGN KEY (`ems_activity_elementid`) REFERENCES `element` (`ems_element_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_activity_sectorid_fk` FOREIGN KEY (`ems_activity_sectorid`) REFERENCES `sector` (`ems_sector_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 12 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for alarmlevel
-- ----------------------------
DROP TABLE IF EXISTS `alarmlevel`;
CREATE TABLE `alarmlevel`  (
  `ems_alarmlevel_id` int NOT NULL AUTO_INCREMENT COMMENT '报警等级表',
  `ems_alarmlevel_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警等级名称',
  `ems_alarmlevel_code` int NULL DEFAULT NULL COMMENT '报警等级枚举',
  PRIMARY KEY (`ems_alarmlevel_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for api
-- ----------------------------
DROP TABLE IF EXISTS `api`;
CREATE TABLE `api`  (
  `ems_api_id` int NOT NULL AUTO_INCREMENT COMMENT '平台对接表',
  `ems_api_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'api名称',
  `ems_api_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '地址',
  `ems_api_parameters` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求参数JSON(传输数据格式，【字段名、字段值、字段类型、字段描述】数组)',
  `ems_api_header` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求头JSON(包含token等)',
  `ems_api_receptorid` int NULL DEFAULT NULL COMMENT '对接人id',
  `ems_api_requesttype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '请求类型(GET POST)',
  `ems_api_sysuserid` int NULL DEFAULT NULL COMMENT '用户id',
  `ems_api_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_api_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `ems_api_restapigroupid` int NULL DEFAULT NULL COMMENT '分组id',
  PRIMARY KEY (`ems_api_id`) USING BTREE,
  INDEX `ems_api_sysuserid_fk`(`ems_api_sysuserid` ASC) USING BTREE,
  INDEX `ems_api_restapigroupid`(`ems_api_restapigroupid` ASC) USING BTREE,
  CONSTRAINT `ems_api_restapigroupid_fk` FOREIGN KEY (`ems_api_restapigroupid`) REFERENCES `restapigroup` (`ems_restapigroup_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_api_sysuserid_fk` FOREIGN KEY (`ems_api_sysuserid`) REFERENCES `sysuser` (`ems_sysuser_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for assign
-- ----------------------------
DROP TABLE IF EXISTS `assign`;
CREATE TABLE `assign`  (
  `ems_assign_id` int NOT NULL AUTO_INCREMENT COMMENT '监测站分配表',
  `ems_assign_time` datetime NULL DEFAULT NULL COMMENT '分配时间',
  `ems_assign_expirationdate` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '过期时间(开始时间~结束时间)',
  `ems_assign_instanceid` int NULL DEFAULT NULL COMMENT '监测站id',
  `ems_assign_userid` int NULL DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`ems_assign_id`) USING BTREE,
  INDEX `ems_assign_userid_fk`(`ems_assign_userid` ASC) USING BTREE,
  CONSTRAINT `ems_assign_userid_fk` FOREIGN KEY (`ems_assign_userid`) REFERENCES `sysuser` (`ems_sysuser_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 14 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for common
-- ----------------------------
DROP TABLE IF EXISTS `common`;
CREATE TABLE `common`  (
  `ems_common_id` int NOT NULL AUTO_INCREMENT COMMENT '通用标签表',
  `ems_common_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '通用标签名称',
  `ems_common_panoramaid` int NULL DEFAULT NULL COMMENT '全景图id',
  `ems_common_tagtypeid` int NULL DEFAULT NULL COMMENT '标签类型id',
  `ems_common_widthratio` double NULL DEFAULT NULL COMMENT '宽度比例',
  `ems_common_heightratio` double NULL DEFAULT NULL COMMENT '高度比例',
  `ems_common_taganimationid` int NULL DEFAULT NULL COMMENT '标签动画id',
  `ems_common_rotation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '热点旋转角度(\"0,-7,0\")',
  `ems_common_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '热点位置(\"-0.49,-7.71,-48.49\")',
  `ems_common_isview` int NULL DEFAULT NULL COMMENT '是否显示(0:不显示,1:显示)',
  `ems_common_isembed` tinyint NULL DEFAULT NULL COMMENT '是否嵌入(0:否 DIV,1:是 threejs对象)',
  `ems_common_fovrange` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'fov范围(标签显示的范围)',
  `ems_common_jsondata` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'json数据',
  `ems_common_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_common_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`ems_common_id`) USING BTREE,
  INDEX `ems_common_panoramaid_fk`(`ems_common_panoramaid` ASC) USING BTREE,
  INDEX `ems_common_panoramadesignid_fk`(`ems_common_tagtypeid` ASC) USING BTREE,
  INDEX `ems_common_taganimation_fk`(`ems_common_taganimationid` ASC) USING BTREE,
  CONSTRAINT `emc_common_commontagtype_fk` FOREIGN KEY (`ems_common_tagtypeid`) REFERENCES `tagtype` (`ems_tagtype_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_common_panorama_fk` FOREIGN KEY (`ems_common_panoramaid`) REFERENCES `panorama` (`ems_panorama_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_common_taganimation_fk` FOREIGN KEY (`ems_common_taganimationid`) REFERENCES `taganimation` (`ems_taganimation_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 395 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '通用标签' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for commonproperty
-- ----------------------------
DROP TABLE IF EXISTS `commonproperty`;
CREATE TABLE `commonproperty`  (
  `ems_commonproperty_id` int NOT NULL AUTO_INCREMENT COMMENT '监测数据上图表',
  `ems_commonproperty_commonid` int NULL DEFAULT NULL COMMENT '通用热点id',
  `ems_commonproperty_propertyid` int NULL DEFAULT NULL COMMENT '属性id',
  PRIMARY KEY (`ems_commonproperty_id`) USING BTREE,
  INDEX `ems_commonproperty_commonid_fk`(`ems_commonproperty_commonid` ASC) USING BTREE,
  INDEX `ems_commonproperty_propertyid_fk`(`ems_commonproperty_propertyid` ASC) USING BTREE,
  CONSTRAINT `ems_commonproperty_commonid_fk` FOREIGN KEY (`ems_commonproperty_commonid`) REFERENCES `common` (`ems_common_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_commonproperty_propertyid_fk` FOREIGN KEY (`ems_commonproperty_propertyid`) REFERENCES `property` (`ems_property_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1278 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for composition
-- ----------------------------
DROP TABLE IF EXISTS `composition`;
CREATE TABLE `composition`  (
  `ems_composition_id` int NOT NULL AUTO_INCREMENT COMMENT '组成结构表',
  `ems_composition_pid` int NULL DEFAULT NULL COMMENT '父节点id',
  `ems_composition_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组成名称',
  `ems_composition_iconfileid` int NULL DEFAULT NULL COMMENT '图标文件id',
  `ems_composition_modelfileid` int NULL DEFAULT NULL COMMENT '默认模型文件id',
  `ems_composition_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模块描述',
  `ems_composition_isleaf` tinyint(1) NULL DEFAULT NULL COMMENT '是否是叶子 0 不是 1是',
  `ems_composition_standardid` int NULL DEFAULT NULL COMMENT '标准id',
  PRIMARY KEY (`ems_composition_id`) USING BTREE,
  INDEX `emc_composition_standardid`(`ems_composition_standardid` ASC) USING BTREE,
  CONSTRAINT `emc_composition_standardid_fk` FOREIGN KEY (`ems_composition_standardid`) REFERENCES `standard` (`ems_standard_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 732 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for condition
-- ----------------------------
DROP TABLE IF EXISTS `condition`;
CREATE TABLE `condition`  (
  `ems_condition_id` int NOT NULL AUTO_INCREMENT COMMENT '条件表',
  `ems_condition_ruleitemid` int NULL DEFAULT NULL COMMENT '规则项id',
  `ems_condition_ruleid` int NULL DEFAULT NULL COMMENT '规则id',
  `ems_condition_operatorid` int NULL DEFAULT NULL COMMENT '操作id',
  `ems_condition_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '条件值',
  `ems_condition_spacecontolrid` int NULL DEFAULT NULL COMMENT '空间管控id',
  `ems_condition_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_condition_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ems_condition_id`) USING BTREE,
  INDEX `emc_comdition_ruleid_fk`(`ems_condition_ruleid` ASC) USING BTREE,
  INDEX `emc_comdition_ruleitemid_fk`(`ems_condition_ruleitemid` ASC) USING BTREE,
  INDEX `emc_comdition_operatorid_fk`(`ems_condition_operatorid` ASC) USING BTREE,
  INDEX `emc_comdition_spacecontolrid_fk`(`ems_condition_spacecontolrid` ASC) USING BTREE,
  CONSTRAINT `emc_comdition_operatorid_fk` FOREIGN KEY (`ems_condition_operatorid`) REFERENCES `operator` (`ems_operator_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_comdition_ruleid_fk` FOREIGN KEY (`ems_condition_ruleid`) REFERENCES `rule` (`ems_rule_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_comdition_ruleitemid_fk` FOREIGN KEY (`ems_condition_ruleitemid`) REFERENCES `ruleitem` (`ems_ruleitem_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_comdition_spacecontolrid_fk` FOREIGN KEY (`ems_condition_spacecontolrid`) REFERENCES `spacecontrol` (`ems_spacecontrol_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 166 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for configuration
-- ----------------------------
DROP TABLE IF EXISTS `configuration`;
CREATE TABLE `configuration`  (
  `ems_configuration_id` int NOT NULL AUTO_INCREMENT COMMENT '配置表',
  `ems_configuration_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '配置项描述',
  `ems_configuration_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '配置项类型',
  `ems_configuration_compositionid` int NULL DEFAULT NULL COMMENT '组成id',
  `ems_configuration_datatypeid` int NULL DEFAULT NULL COMMENT '数据类型id',
  `ems_configuration_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '配置key(没有什么用，为了前端做数据绑定使用)',
  PRIMARY KEY (`ems_configuration_id`) USING BTREE,
  INDEX `emc_configuration_compositionid_fk`(`ems_configuration_compositionid` ASC) USING BTREE,
  INDEX `ems_configuration_datatypeid_fk`(`ems_configuration_datatypeid` ASC) USING BTREE,
  CONSTRAINT `emc_configuration_compositionid_fk` FOREIGN KEY (`ems_configuration_compositionid`) REFERENCES `composition` (`ems_composition_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_configuration_datatypeid_fk` FOREIGN KEY (`ems_configuration_datatypeid`) REFERENCES `datatype` (`ems_datatype_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 347 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for csolution
-- ----------------------------
DROP TABLE IF EXISTS `csolution`;
CREATE TABLE `csolution`  (
  `ems_csolution_id` int NOT NULL AUTO_INCREMENT COMMENT '建设方案表',
  `ems_csolution_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '建设方案名称',
  `ems_csolution_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_csolution_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `ems_csolution_sceneid` int NULL DEFAULT NULL COMMENT '场景id',
  `ems_csolution_modelfileid` int NULL DEFAULT NULL COMMENT '最后方案模型文件地址，格式glb gltf obj等格式',
  PRIMARY KEY (`ems_csolution_id`) USING BTREE,
  INDEX `emc_csolution_sceneid_fk`(`ems_csolution_sceneid` ASC) USING BTREE,
  CONSTRAINT `emc_csolution_sceneid_fk` FOREIGN KEY (`ems_csolution_sceneid`) REFERENCES `scene` (`ems_scene_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for csolutionproduct
-- ----------------------------
DROP TABLE IF EXISTS `csolutionproduct`;
CREATE TABLE `csolutionproduct`  (
  `ems_layoutproduct_id` int NOT NULL AUTO_INCREMENT COMMENT '方案产品表',
  `ems_layoutproduct_designposition` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设计点位名称',
  `ems_layoutproduct_csolutionid` int NULL DEFAULT NULL COMMENT '方案id',
  `ems_layoutproduct_productid` int NULL DEFAULT NULL COMMENT '产品id',
  PRIMARY KEY (`ems_layoutproduct_id`) USING BTREE,
  INDEX `emc_layoutproduct_csolutionid_fk`(`ems_layoutproduct_csolutionid` ASC) USING BTREE,
  INDEX `emc_layoutproduct_productid_fk`(`ems_layoutproduct_productid` ASC) USING BTREE,
  CONSTRAINT `emc_layoutproduct_csolutionid_fk` FOREIGN KEY (`ems_layoutproduct_csolutionid`) REFERENCES `csolution` (`ems_csolution_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_layoutproduct_productid_fk` FOREIGN KEY (`ems_layoutproduct_productid`) REFERENCES `product` (`ems_product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for customcomposition
-- ----------------------------
DROP TABLE IF EXISTS `customcomposition`;
CREATE TABLE `customcomposition`  (
  `ems_customcomposition_id` int NOT NULL AUTO_INCREMENT COMMENT '自定义组成结构',
  `ems_customcomposition_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '自定义组成名称',
  `ems_customcomposition_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '自定义组成编码',
  `ems_customcomposition_compositionid` int NULL DEFAULT NULL COMMENT '组成id',
  `ems_customcomposition_customerid` int NULL DEFAULT NULL COMMENT '客户id',
  PRIMARY KEY (`ems_customcomposition_id`) USING BTREE,
  INDEX `ems_customcomposition_composition_fk`(`ems_customcomposition_compositionid` ASC) USING BTREE,
  INDEX `ems_customcomposition_customer_fk`(`ems_customcomposition_customerid` ASC) USING BTREE,
  CONSTRAINT `ems_customcomposition_composition_fk` FOREIGN KEY (`ems_customcomposition_compositionid`) REFERENCES `composition` (`ems_composition_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_customcomposition_customer_fk` FOREIGN KEY (`ems_customcomposition_customerid`) REFERENCES `customer` (`ems_customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 116 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for customer
-- ----------------------------
DROP TABLE IF EXISTS `customer`;
CREATE TABLE `customer`  (
  `ems_customer_id` int NOT NULL AUTO_INCREMENT COMMENT '客户表',
  `ems_customer_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '客户名称',
  `ems_customer_logofileid` int NULL DEFAULT NULL COMMENT '客户logo文件id',
  `ems_customer_state` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '州或者省',
  `ems_customer_city` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '城市',
  `ems_customer_region` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '区',
  `ems_customer_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '租户地址',
  `ems_customer_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '客户描述',
  `ems_customer_isrealname` tinyint(1) NULL DEFAULT NULL COMMENT '是否实名  0 待实名  1 已实名',
  `ems_customer_createtime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `ems_customer_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `ems_customer_realnametime` datetime NULL DEFAULT NULL COMMENT '认证时间',
  `ems_customer_legalperson` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '法人姓名',
  `ems_customer_organizationcode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '组织机构代码',
  `ems_customer_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`ems_customer_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for datatype
-- ----------------------------
DROP TABLE IF EXISTS `datatype`;
CREATE TABLE `datatype`  (
  `ems_datatype_id` int NOT NULL AUTO_INCREMENT COMMENT '数据类型表',
  `ems_datatype_chinesename` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '中文名',
  `ems_datatype_englishname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '英文名',
  PRIMARY KEY (`ems_datatype_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for device
-- ----------------------------
DROP TABLE IF EXISTS `device`;
CREATE TABLE `device`  (
  `ems_device_id` int NOT NULL AUTO_INCREMENT COMMENT '设备表',
  `ems_device_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备编号',
  `ems_device_picfileid` int NULL DEFAULT NULL COMMENT '设备实物照片文件id',
  `ems_device_state` int NULL DEFAULT NULL COMMENT '设备状态 0、库存 、1、出库  2、在线 、3、离线',
  `ems_device_versionid` int NULL DEFAULT NULL COMMENT '产品版本id',
  `ems_device_instanceid` int NULL DEFAULT NULL COMMENT '站点id',
  `ems_device_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  PRIMARY KEY (`ems_device_id`) USING BTREE,
  INDEX `emc_device_versionid_fk`(`ems_device_versionid` ASC) USING BTREE,
  CONSTRAINT `emc_device_versionid_fk` FOREIGN KEY (`ems_device_versionid`) REFERENCES `version` (`ems_version_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 2123 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for devicealarm
-- ----------------------------
DROP TABLE IF EXISTS `devicealarm`;
CREATE TABLE `devicealarm`  (
  `ems_devicealarm_id` int NOT NULL AUTO_INCREMENT COMMENT '设备报警表',
  `ems_devicealarm_devicealarmtypeid` int NULL DEFAULT NULL COMMENT '设备报警类型id',
  `ems_devicealarm_happentime` datetime NULL DEFAULT NULL COMMENT '报警发生时间',
  `ems_devicealarm_createtime` datetime NULL DEFAULT NULL COMMENT '报警记录入库时间',
  `ems_devicealarm_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警记录值',
  `ems_devicealarm_log` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警日志',
  `ems_devicealarm_deviceid` int NULL DEFAULT NULL COMMENT '设备id',
  `ems_devicealarm_levelid` int NULL DEFAULT NULL COMMENT '报警等级id',
  PRIMARY KEY (`ems_devicealarm_id`) USING BTREE,
  INDEX `ems_devicealarm_deviceid_fk`(`ems_devicealarm_deviceid` ASC) USING BTREE,
  INDEX `ems_devicealarm_levelid_fk`(`ems_devicealarm_levelid` ASC) USING BTREE,
  INDEX `ems_devicealarm_devicealarmtypeid_fk`(`ems_devicealarm_devicealarmtypeid` ASC) USING BTREE,
  CONSTRAINT `ems_devicealarm_devicealarmtypeid_fk` FOREIGN KEY (`ems_devicealarm_devicealarmtypeid`) REFERENCES `devicealarmtype` (`ems_devicealarmtype_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_devicealarm_deviceid_fk` FOREIGN KEY (`ems_devicealarm_deviceid`) REFERENCES `device` (`ems_device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_devicealarm_levelid_fk` FOREIGN KEY (`ems_devicealarm_levelid`) REFERENCES `alarmlevel` (`ems_alarmlevel_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 556 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for devicealarmtype
-- ----------------------------
DROP TABLE IF EXISTS `devicealarmtype`;
CREATE TABLE `devicealarmtype`  (
  `ems_devicealarmtype_id` int NOT NULL AUTO_INCREMENT COMMENT '设备报警类型表',
  `ems_devicealarmtype_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '设备报警类型名称',
  `ems_devicealarmtype_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警类型编号',
  `ems_devicealarmtype_moduleid` int NULL DEFAULT NULL COMMENT '产品模块id',
  PRIMARY KEY (`ems_devicealarmtype_id`) USING BTREE,
  INDEX `ems_devicealarmtype_moduleid_fk`(`ems_devicealarmtype_moduleid` ASC) USING BTREE,
  CONSTRAINT `ems_devicealarmtype_moduleid_fk` FOREIGN KEY (`ems_devicealarmtype_moduleid`) REFERENCES `module` (`ems_module_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for devicecommon
-- ----------------------------
DROP TABLE IF EXISTS `devicecommon`;
CREATE TABLE `devicecommon`  (
  `ems_devicecommon_id` int NOT NULL AUTO_INCREMENT COMMENT '设备基础标签表',
  `ems_devicecommon_deviceid` int NULL DEFAULT NULL COMMENT '设备id',
  `ems_devicecommon_commonid` int NULL DEFAULT NULL COMMENT '基础标签id',
  PRIMARY KEY (`ems_devicecommon_id`) USING BTREE,
  INDEX `ems_devicecommon_device_fk`(`ems_devicecommon_deviceid` ASC) USING BTREE,
  INDEX `ems_devicecommon_common_fk`(`ems_devicecommon_commonid` ASC) USING BTREE,
  CONSTRAINT `ems_devicecommon_common_fk` FOREIGN KEY (`ems_devicecommon_commonid`) REFERENCES `common` (`ems_common_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_devicecommon_device_fk` FOREIGN KEY (`ems_devicecommon_deviceid`) REFERENCES `device` (`ems_device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 261 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for element
-- ----------------------------
DROP TABLE IF EXISTS `element`;
CREATE TABLE `element`  (
  `ems_element_id` int NOT NULL AUTO_INCREMENT COMMENT '要素',
  `ems_element_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '要素名',
  `ems_element_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '要素说明',
  `ems_element_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图标路径',
  `ems_element_index` int NULL DEFAULT NULL COMMENT '排序序号',
  PRIMARY KEY (`ems_element_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for guide
-- ----------------------------
DROP TABLE IF EXISTS `guide`;
CREATE TABLE `guide`  (
  `ems_guide_id` int NOT NULL AUTO_INCREMENT COMMENT '导览点表',
  `ems_guide_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '导览点名称',
  `ems_guide_coverid` int NULL DEFAULT NULL COMMENT '导览点封面文件id',
  `ems_guide_intr` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '导览点简介',
  `ems_guide_instanceid` int NULL DEFAULT NULL COMMENT '监测站站点id',
  `ems_guide_panoramaid` int NULL DEFAULT NULL COMMENT '全景图id',
  `ems_guide_sort` double NULL DEFAULT NULL COMMENT '排序',
  `ems_guide_jsondata` varchar(5000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'json数据',
  PRIMARY KEY (`ems_guide_id`) USING BTREE,
  INDEX `ems_guide_panoramaid_fk`(`ems_guide_panoramaid` ASC) USING BTREE,
  CONSTRAINT `ems_guide_panoramaid_fk` FOREIGN KEY (`ems_guide_panoramaid`) REFERENCES `panorama` (`ems_panorama_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 72 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for html
-- ----------------------------
DROP TABLE IF EXISTS `html`;
CREATE TABLE `html`  (
  `ems_html_id` int NOT NULL AUTO_INCREMENT COMMENT '网页标签表',
  `ems_html_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '网页标签名称',
  `ems_html_panoramaid` int NULL DEFAULT NULL COMMENT '全景图id',
  `ems_html_tagtypeid` int NULL DEFAULT NULL COMMENT '标签类型id',
  `ems_html_url` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '资源链接地址(系统资源地址)',
  `ems_html_widthratio` double NULL DEFAULT NULL COMMENT '宽度比例',
  `ems_html_heightratio` double NULL DEFAULT NULL COMMENT '高度比例',
  `ems_html_taganimationid` int NULL DEFAULT NULL COMMENT '标签动画id',
  `ems_html_rotation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '热点旋转角度(\"0,-7,0\")',
  `ems_html_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '热点位置(\"-0.49,-7.71,-48.49\")',
  `ems_html_jsondata` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'JSON数据',
  `ems_html_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_html_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`ems_html_id`) USING BTREE,
  INDEX `ems_html_tagtype_fk`(`ems_html_tagtypeid` ASC) USING BTREE,
  INDEX `ems_html_panorama_fk`(`ems_html_panoramaid` ASC) USING BTREE,
  INDEX `ems_html_taganimation_fk`(`ems_html_taganimationid` ASC) USING BTREE,
  CONSTRAINT `ems_html_panorama_fk` FOREIGN KEY (`ems_html_panoramaid`) REFERENCES `panorama` (`ems_panorama_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_html_taganimation_fk` FOREIGN KEY (`ems_html_taganimationid`) REFERENCES `taganimation` (`ems_taganimation_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_html_tagtype_fk` FOREIGN KEY (`ems_html_tagtypeid`) REFERENCES `tagtype` (`ems_tagtype_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 19 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for installconfiguration
-- ----------------------------
DROP TABLE IF EXISTS `installconfiguration`;
CREATE TABLE `installconfiguration`  (
  `ems_installconfiguration_id` int NOT NULL AUTO_INCREMENT COMMENT '安装配置数据表',
  `ems_installconfiguration_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '配置信息值',
  `ems_installconfiguration_deviceid` int NULL DEFAULT NULL COMMENT '设备表id',
  `ems_installconfiguration_configurationid` int NULL DEFAULT NULL COMMENT '配置表id',
  PRIMARY KEY (`ems_installconfiguration_id`) USING BTREE,
  INDEX `emc_installconfiguration_installid_fk`(`ems_installconfiguration_deviceid` ASC) USING BTREE,
  INDEX `emc_installconfiguration_configurationid_fk`(`ems_installconfiguration_configurationid` ASC) USING BTREE,
  CONSTRAINT `emc_installconfiguration_configurationid_fk` FOREIGN KEY (`ems_installconfiguration_configurationid`) REFERENCES `configuration` (`ems_configuration_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_deviceconfiguration_deviceid_fk` FOREIGN KEY (`ems_installconfiguration_deviceid`) REFERENCES `device` (`ems_device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1553 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for item
-- ----------------------------
DROP TABLE IF EXISTS `item`;
CREATE TABLE `item`  (
  `ems_item_id` int NOT NULL AUTO_INCREMENT COMMENT 'ui界面元素表',
  `ems_item_parentid` int NOT NULL COMMENT '父节点id',
  `ems_item_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单标识',
  `ems_item_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单名称',
  `ems_item_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单或按钮事件请求路径',
  `ems_item_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '菜单图标 iconfont name',
  `ems_item_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_item_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `ems_item_order` int NULL DEFAULT NULL COMMENT '次序',
  `ems_item_type` int NULL DEFAULT NULL COMMENT '菜单类型 （类型   0：目录   1：菜单   2：按钮,3:其他)',
  PRIMARY KEY (`ems_item_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 29 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for lookpoint
-- ----------------------------
DROP TABLE IF EXISTS `lookpoint`;
CREATE TABLE `lookpoint`  (
  `ems_lookpoint_id` int NOT NULL AUTO_INCREMENT COMMENT '看点id',
  `ems_lookpoint_fov` double NULL DEFAULT NULL COMMENT 'FOV',
  `ems_lookpoint_weight` double NULL DEFAULT NULL COMMENT '宽度',
  `ems_lookpoint_startcoordinate` double NULL DEFAULT NULL COMMENT '起点坐标',
  `ems_lookpoint_hotspotid` int NULL DEFAULT NULL COMMENT '热点id',
  `ems_lookpoint_guideid` int NULL DEFAULT NULL COMMENT '导览id',
  `ems_lookpoint_hotspottype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '热点类型',
  `ems_lookpoint_content` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '内容',
  PRIMARY KEY (`ems_lookpoint_id`) USING BTREE,
  INDEX `ems_lookpoint_guideid_fk`(`ems_lookpoint_guideid` ASC) USING BTREE,
  CONSTRAINT `ems_lookpoint_guideid_fk` FOREIGN KEY (`ems_lookpoint_guideid`) REFERENCES `guide` (`ems_guide_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 70 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for module
-- ----------------------------
DROP TABLE IF EXISTS `module`;
CREATE TABLE `module`  (
  `ems_module_id` int NOT NULL AUTO_INCREMENT COMMENT '产品模块表',
  `ems_module_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模块名称',
  `ems_module_mode` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模型路径',
  `ems_module_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '型号',
  `ems_module_specifications` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规格',
  `ems_module_des` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '模块描述',
  `ems_module_versionid` int NULL DEFAULT NULL COMMENT '版本id',
  `ems_module_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '模型图标',
  PRIMARY KEY (`ems_module_id`) USING BTREE,
  INDEX `ems_module_versionid_fk`(`ems_module_versionid` ASC) USING BTREE,
  CONSTRAINT `ems_module_versionid_fk` FOREIGN KEY (`ems_module_versionid`) REFERENCES `version` (`ems_version_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 216 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for navigation
-- ----------------------------
DROP TABLE IF EXISTS `navigation`;
CREATE TABLE `navigation`  (
  `ems_navigation_id` int NOT NULL AUTO_INCREMENT COMMENT '全景导航表',
  `ems_navigation_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '导航名字',
  `ems_navigation_panoramaid` int NULL DEFAULT NULL COMMENT '属于哪个全景图id',
  `ems_navigation_topanoramaid` int NULL DEFAULT NULL COMMENT '导航去 全景图id',
  `ems_navigation_tagtypeid` int NULL DEFAULT NULL COMMENT '标签类型id',
  `ems_navigation_rotation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '导航旋转角度(\"0,-7,0\")',
  `ems_navigation_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '导航位置(\"-0.49,-7.71,-48.49\")',
  `ems_navigation_widthratio` double NULL DEFAULT NULL COMMENT '宽度比例',
  `ems_navigation_heightratio` double NULL DEFAULT NULL COMMENT '高度比例',
  `ems_navigation_taganimationid` int NULL DEFAULT NULL COMMENT '标签动画id',
  `ems_navigation_jsondata` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'json数据',
  `ems_navigation_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_navigation_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`ems_navigation_id`) USING BTREE,
  INDEX `emc_navigation_topanoramaid_fk`(`ems_navigation_topanoramaid` ASC) USING BTREE,
  INDEX `emc_navigation_panoramaid_fk`(`ems_navigation_panoramaid` ASC) USING BTREE,
  INDEX `emc_navigation_panoramadesignid_fk`(`ems_navigation_tagtypeid` ASC) USING BTREE,
  INDEX `emc_navigation_taganimation_fk`(`ems_navigation_taganimationid` ASC) USING BTREE,
  CONSTRAINT `emc_navigation_panoramadesignid_fk` FOREIGN KEY (`ems_navigation_tagtypeid`) REFERENCES `tagtype` (`ems_tagtype_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_navigation_panoramaid_fk` FOREIGN KEY (`ems_navigation_panoramaid`) REFERENCES `panorama` (`ems_panorama_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_navigation_taganimation_fk` FOREIGN KEY (`ems_navigation_taganimationid`) REFERENCES `taganimation` (`ems_taganimation_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_navigation_topanoramaid_fk` FOREIGN KEY (`ems_navigation_topanoramaid`) REFERENCES `panorama` (`ems_panorama_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 120 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for operator
-- ----------------------------
DROP TABLE IF EXISTS `operator`;
CREATE TABLE `operator`  (
  `ems_operator_id` int NOT NULL AUTO_INCREMENT COMMENT '运算表',
  `ems_operator_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '运算名',
  `ems_operator_symbol` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '运算符号',
  `ems_operator_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '运算符类型 0 逻辑运算符 1 算术运算符 2、其他',
  `ems_operator_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_operator_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ems_operator_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for panorama
-- ----------------------------
DROP TABLE IF EXISTS `panorama`;
CREATE TABLE `panorama`  (
  `ems_panorama_id` int NOT NULL AUTO_INCREMENT COMMENT '全景场景表',
  `ems_panorama_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '场景名字',
  `ems_panorama_level` int NULL DEFAULT NULL COMMENT '楼层  0：一楼(站房内部)、1：二楼(站房外部与站房二楼)、2：空中(无人机视角)',
  `ems_panorama_coverid` int NULL DEFAULT NULL COMMENT '全景封面文件id',
  `ems_panorama_slicefileids` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '全景切片文件id数组(1张原图+6张一级切片图+24张二级切片图)',
  `ems_panorama_index` double NULL DEFAULT NULL COMMENT '排列顺序',
  `ems_panorama_default` tinyint(1) NULL DEFAULT 0 COMMENT '是否是起始页 0 否 1 是',
  `ems_panorama_initview` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '全景初始状态(位置、视角)',
  `ems_panorama_fov` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '全景视角(水平角:-180~180、垂直角:0~180、视角范围:0~180)',
  `ems_panorama_instanceid` int NULL DEFAULT NULL COMMENT '监测站 id',
  `ems_panorama_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  `ems_panorama_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_panorama_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `ems_panorama_userid` int NULL DEFAULT NULL COMMENT '创建人id',
  `ems_panorama_isdelete` tinyint NULL DEFAULT 0 COMMENT '是否删除(0:否,1:是)',
  PRIMARY KEY (`ems_panorama_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 185 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for personalarm
-- ----------------------------
DROP TABLE IF EXISTS `personalarm`;
CREATE TABLE `personalarm`  (
  `ems_alarm_id` int NOT NULL AUTO_INCREMENT COMMENT '报警表',
  `ems_alarm_level` int NULL DEFAULT NULL COMMENT '报警等级',
  `ems_alarm_spacecontrolid` int NULL DEFAULT NULL COMMENT '管控区域id(人员报警)',
  `ems_alarm_createtime` datetime NULL DEFAULT NULL COMMENT '报警入库时间',
  `ems_alarm_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警描述/日志',
  `ems_alarm_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警记录值',
  `ems_alarm_fileid` int NULL DEFAULT NULL COMMENT '报警视频/图片文件附件',
  `ems_alarm_coverid` int NULL DEFAULT NULL COMMENT '封面id',
  PRIMARY KEY (`ems_alarm_id`) USING BTREE,
  INDEX `emc_alarm_spacecontrolid_fk`(`ems_alarm_spacecontrolid` ASC) USING BTREE,
  CONSTRAINT `emc_alarm_spacecontrolid_fk` FOREIGN KEY (`ems_alarm_spacecontrolid`) REFERENCES `spacecontrol` (`ems_spacecontrol_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 89 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pollutant
-- ----------------------------
DROP TABLE IF EXISTS `pollutant`;
CREATE TABLE `pollutant`  (
  `ems_pollutant_id` int NOT NULL AUTO_INCREMENT COMMENT '污染物表',
  `ems_pollutant_namecn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '污染物中文名称',
  `ems_pollutant_nameen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '污染物英文名称',
  `ems_pollutant_chemicalsymbols` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '污染物化学符号',
  `ems_pollutant_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '污染物代码',
  `ems_pollutant_pollutantclassificationid` int NULL DEFAULT NULL COMMENT '污染物类别id',
  PRIMARY KEY (`ems_pollutant_id`) USING BTREE,
  INDEX `aaqams_pollutant_pollutantclassificationid_fk`(`ems_pollutant_pollutantclassificationid` ASC) USING BTREE,
  CONSTRAINT `aaqams_pollutant_pollutantclassificationid_fk` FOREIGN KEY (`ems_pollutant_pollutantclassificationid`) REFERENCES `pollutantclassification` (`ems_pollutantclassification_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for pollutantclassification
-- ----------------------------
DROP TABLE IF EXISTS `pollutantclassification`;
CREATE TABLE `pollutantclassification`  (
  `ems_pollutantclassification_id` int NOT NULL AUTO_INCREMENT COMMENT '污染物分类表',
  `ems_pollutantclassification_namecn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类中文名称',
  `ems_pollutantclassification_nameen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分类英文名称',
  `ems_pollutantclassification_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类别代码',
  `ems_pollutantclassification_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类型图标',
  `ems_pollutantclassification_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '类型描述',
  `ems_pollutantclassification_standardid` int NULL DEFAULT NULL COMMENT '标准id',
  PRIMARY KEY (`ems_pollutantclassification_id`) USING BTREE,
  INDEX `eme_pollutantclassification_standardid_fk`(`ems_pollutantclassification_standardid` ASC) USING BTREE,
  CONSTRAINT `emc_pollutantclassification_standardid_fk` FOREIGN KEY (`ems_pollutantclassification_standardid`) REFERENCES `standard` (`ems_standard_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product`  (
  `ems_product_id` int NOT NULL AUTO_INCREMENT COMMENT '产品表',
  `ems_product_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品名称',
  `ems_product_picfileid` int NULL DEFAULT NULL COMMENT '产品图片文件id',
  `ems_product_modelfileid` int NULL DEFAULT NULL COMMENT '产品模型文件id',
  `ems_product_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品型号',
  `ems_product_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '产品描述',
  `ems_product_compositionid` int NULL DEFAULT NULL COMMENT '组成id',
  `ems_product_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_product_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `ems_product_brand` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '品牌',
  `ems_product_monitormethod` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '监测方法(光散射法 β法 称量法 ...)',
  PRIMARY KEY (`ems_product_id`) USING BTREE,
  INDEX `emc_product_compositionid_fk`(`ems_product_compositionid` ASC) USING BTREE,
  CONSTRAINT `emc_product_compositionid_fk` FOREIGN KEY (`ems_product_compositionid`) REFERENCES `composition` (`ems_composition_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 486 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for property
-- ----------------------------
DROP TABLE IF EXISTS `property`;
CREATE TABLE `property`  (
  `ems_property_id` int NOT NULL AUTO_INCREMENT COMMENT '属性表',
  `ems_property_code` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '属性表 属性标识',
  `ems_property_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '属性名',
  `ems_property_identifier` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '属性标识符',
  `ems_property_des` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '描述',
  `ems_property_unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '属性单位(目前使用字符串 以后会用字典表)',
  `ems_property_datatypeid` int NULL DEFAULT NULL,
  `ems_property_index` int NULL DEFAULT NULL COMMENT '序号',
  `ems_property_type` int NULL DEFAULT NULL COMMENT '0、工况数据  1、业务数据 2、其他属性',
  `ems_property_moduleid` int NULL DEFAULT NULL COMMENT '模块id',
  PRIMARY KEY (`ems_property_id`) USING BTREE,
  INDEX `ems_property_moduleid_fk`(`ems_property_moduleid` ASC) USING BTREE,
  CONSTRAINT `ems_property_moduleid_fk` FOREIGN KEY (`ems_property_moduleid`) REFERENCES `module` (`ems_module_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 67 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for restapigroup
-- ----------------------------
DROP TABLE IF EXISTS `restapigroup`;
CREATE TABLE `restapigroup`  (
  `ems_restapigroup_id` int NOT NULL AUTO_INCREMENT COMMENT 'restapi分组',
  `ems_restapigroup_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '分组名称',
  `ems_restapigroup_userid` int NULL DEFAULT NULL COMMENT '用户id',
  PRIMARY KEY (`ems_restapigroup_id`) USING BTREE,
  INDEX `ems_restapigroup_userid_fk`(`ems_restapigroup_userid` ASC) USING BTREE,
  CONSTRAINT `ems_restapigroup_userid_fk` FOREIGN KEY (`ems_restapigroup_userid`) REFERENCES `sysuser` (`ems_sysuser_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 20 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for resultmap
-- ----------------------------
DROP TABLE IF EXISTS `resultmap`;
CREATE TABLE `resultmap`  (
  `ems_resultmap_id` int NOT NULL AUTO_INCREMENT COMMENT '结果映射表',
  `ems_resultmap_source` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '源',
  `ems_resultmap_destination` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '目的地',
  `ems_resultmap_apiid` int NULL DEFAULT NULL COMMENT '平台对接表id',
  `ems_resultmap_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_resultmap_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ems_resultmap_id`) USING BTREE,
  INDEX `ems_resultmap_apiid_fk`(`ems_resultmap_apiid` ASC) USING BTREE,
  CONSTRAINT `ems_resultmap_apiid_fk` FOREIGN KEY (`ems_resultmap_apiid`) REFERENCES `api` (`ems_api_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role`  (
  `ems_role_id` int NOT NULL AUTO_INCREMENT COMMENT '角色表',
  `ems_role_tag` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色标识',
  `ems_role_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色名',
  `ems_role_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '角色的描述',
  `ems_role_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_role_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `ems_role_status` tinyint NULL DEFAULT NULL COMMENT '角色状态',
  PRIMARY KEY (`ems_role_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for roleitem
-- ----------------------------
DROP TABLE IF EXISTS `roleitem`;
CREATE TABLE `roleitem`  (
  `ems_roleitem_id` int NOT NULL AUTO_INCREMENT COMMENT '角色ui元素表',
  `ems_roleitem_roleid` int NULL DEFAULT NULL,
  `ems_roleitem_itemid` int NULL DEFAULT NULL,
  `ems_roleitem_canopt` int NULL DEFAULT NULL COMMENT '0 无权限 1 只读 2 可修改 3 可删除 4 可修改和删除',
  PRIMARY KEY (`ems_roleitem_id`) USING BTREE,
  INDEX `eme_roleelement_elementid_fk`(`ems_roleitem_itemid` ASC) USING BTREE,
  INDEX `eme_roleelement_roleid_fk`(`ems_roleitem_roleid` ASC) USING BTREE,
  CONSTRAINT `emc_roleitem_itemid_fk` FOREIGN KEY (`ems_roleitem_itemid`) REFERENCES `item` (`ems_item_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_roleitem_roleid_fk` FOREIGN KEY (`ems_roleitem_roleid`) REFERENCES `role` (`ems_role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 151 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for rule
-- ----------------------------
DROP TABLE IF EXISTS `rule`;
CREATE TABLE `rule`  (
  `ems_rule_id` int NOT NULL AUTO_INCREMENT COMMENT '规则表',
  `ems_rule_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则名称',
  `ems_rule_type` int NULL DEFAULT NULL COMMENT '规则类型  0、数据合规性规则、1、人员合规性规则、2.禁止触碰',
  `ems_rule_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则描述',
  `ems_rule_isstatistics` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否是统计类规则 0 不是 1是',
  `ems_rule_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_rule_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`ems_rule_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for ruleitem
-- ----------------------------
DROP TABLE IF EXISTS `ruleitem`;
CREATE TABLE `ruleitem`  (
  `ems_ruleitem_id` int NOT NULL AUTO_INCREMENT COMMENT '规则项表',
  `ems_ruleitem_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则项名字',
  `ems_ruleitem_unit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '规则项单位',
  `ems_ruleitem_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_ruleitem_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ems_ruleitem_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for scene
-- ----------------------------
DROP TABLE IF EXISTS `scene`;
CREATE TABLE `scene`  (
  `ems_scene_id` int NOT NULL AUTO_INCREMENT COMMENT '监测场景表',
  `ems_scene_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '场景名字',
  `ems_scene_picfileid` int NULL DEFAULT NULL COMMENT '场景图片文件id',
  `ems_scene_iconfileid` int NULL DEFAULT NULL COMMENT '场景图标文件id',
  `ems_scene_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '场景描述',
  `ems_scene_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_scene_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`ems_scene_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for scenestandard
-- ----------------------------
DROP TABLE IF EXISTS `scenestandard`;
CREATE TABLE `scenestandard`  (
  `ems_scenestandard_id` int NOT NULL AUTO_INCREMENT COMMENT '场景标准表',
  `ems_scenestandard_sceneid` int NULL DEFAULT NULL COMMENT '场景id',
  `ems_scenestandard_standardid` int NULL DEFAULT NULL COMMENT '标准id',
  PRIMARY KEY (`ems_scenestandard_id`) USING BTREE,
  INDEX `emc_scenestandard_sceneid_fk`(`ems_scenestandard_sceneid` ASC) USING BTREE,
  INDEX `emc_scenestandard_standardid_fk`(`ems_scenestandard_standardid` ASC) USING BTREE,
  CONSTRAINT `emc_scenestandard_sceneid_fk` FOREIGN KEY (`ems_scenestandard_sceneid`) REFERENCES `scene` (`ems_scene_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_scenestandard_standardid_fk` FOREIGN KEY (`ems_scenestandard_standardid`) REFERENCES `standard` (`ems_standard_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sector
-- ----------------------------
DROP TABLE IF EXISTS `sector`;
CREATE TABLE `sector`  (
  `ems_sector_id` int NOT NULL AUTO_INCREMENT COMMENT '行业表',
  `ems_sector_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '行业名称',
  `ems_sector_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '行业图标',
  `ems_sector_index` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '排序',
  `ems_sector_pid` int NULL DEFAULT NULL COMMENT '父类id',
  `ems_sector_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '描述',
  PRIMARY KEY (`ems_sector_id`) USING BTREE,
  INDEX `ems_sector_pid_fk`(`ems_sector_pid` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for situation
-- ----------------------------
DROP TABLE IF EXISTS `situation`;
CREATE TABLE `situation`  (
  `ems_situation_id` int NOT NULL AUTO_INCREMENT COMMENT '监测状况表',
  `ems_situation_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '监测状况名称',
  `ems_situation_des` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '监测状况描述',
  `ems_situation_icon` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '图标路径',
  `ems_situation_index` int NULL DEFAULT NULL COMMENT '排序序号',
  PRIMARY KEY (`ems_situation_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for spacecontrol
-- ----------------------------
DROP TABLE IF EXISTS `spacecontrol`;
CREATE TABLE `spacecontrol`  (
  `ems_spacecontrol_id` int NOT NULL AUTO_INCREMENT COMMENT '管控区域表',
  `ems_spacecontrol_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '管控区域名称',
  `ems_spacecontrol_region` varchar(3000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '管控区域',
  `ems_spacecontrol_camdeviceid` int NULL DEFAULT NULL COMMENT '设备id(指摄像头)',
  `ems_spacecontrol_ruleid` int NULL DEFAULT NULL COMMENT '规则id',
  `ems_spacecontrol_controldeviceid` int NULL DEFAULT NULL COMMENT '关联的管控设备id',
  `ems_spacecontrol_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_spacecontrol_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `ems_spacecontrol_fileid` int NULL DEFAULT NULL COMMENT '管控区域文件id',
  PRIMARY KEY (`ems_spacecontrol_id`) USING BTREE,
  INDEX `emc_spacecontrol_deviceid_fk`(`ems_spacecontrol_camdeviceid` ASC) USING BTREE,
  INDEX `emc_spacecontrol_ruleid_fk`(`ems_spacecontrol_ruleid` ASC) USING BTREE,
  INDEX `emc_spacecontrol_controldeviceid_fk`(`ems_spacecontrol_controldeviceid` ASC) USING BTREE,
  CONSTRAINT `emc_spacecontrol_camdeviceid_fk` FOREIGN KEY (`ems_spacecontrol_camdeviceid`) REFERENCES `device` (`ems_device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_spacecontrol_controldeviceid_fk` FOREIGN KEY (`ems_spacecontrol_controldeviceid`) REFERENCES `device` (`ems_device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_spacecontrol_ruleid_fk` FOREIGN KEY (`ems_spacecontrol_ruleid`) REFERENCES `rule` (`ems_rule_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 55 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for standard
-- ----------------------------
DROP TABLE IF EXISTS `standard`;
CREATE TABLE `standard`  (
  `ems_standard_id` int NOT NULL AUTO_INCREMENT COMMENT '质量标准id',
  `ems_standard_pid` int NULL DEFAULT NULL COMMENT '父标准id',
  `ems_standard_isfirst` tinyint(1) NULL DEFAULT NULL COMMENT '是否首次发布  0 不是 1 是，如果是，者pid为0，否则选择父标准',
  `ems_standard_year` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '年份',
  `ems_standard_namecn` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标准中文名',
  `ems_standard_nameen` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标准英文名',
  `ems_standard_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '编号',
  `ems_standard_des` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '摘要',
  `ems_standard_publishtime` datetime NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '发布时间',
  `ems_standard_carryouttime` datetime NULL DEFAULT CURRENT_TIMESTAMP COMMENT '执行时间',
  `ems_standard_publisher` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '发布者',
  `ems_standard_draftingunit` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '起草单位',
  `ems_standard_state` int NULL DEFAULT NULL COMMENT '0、待修订 1、编制说明 2、征求意见稿 3、试行 4、发行',
  `ems_standard_fileid` int NULL DEFAULT NULL COMMENT '标准文件id',
  PRIMARY KEY (`ems_standard_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 116 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '标准表' ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sysconfig
-- ----------------------------
DROP TABLE IF EXISTS `sysconfig`;
CREATE TABLE `sysconfig`  (
  `config_id` int NOT NULL AUTO_INCREMENT COMMENT '参数主键',
  `config_name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '参数名称',
  `config_key` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '参数键名',
  `config_value` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '参数键值',
  `config_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT 'N' COMMENT '系统内置（Y是 N否）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`config_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '参数配置表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sysfile
-- ----------------------------
DROP TABLE IF EXISTS `sysfile`;
CREATE TABLE `sysfile`  (
  `ems_sysfile_id` int NOT NULL AUTO_INCREMENT COMMENT 'id',
  `ems_sysfile_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件名称',
  `ems_sysfile_size` int NULL DEFAULT NULL COMMENT '文件大小',
  `ems_sysfile_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件类型',
  `ems_sysfile_suffix` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件后缀',
  `ems_sysfile_path` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '文件路径',
  PRIMARY KEY (`ems_sysfile_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 7521 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for syslog
-- ----------------------------
DROP TABLE IF EXISTS `syslog`;
CREATE TABLE `syslog`  (
  `ems_syslog_id` bigint NOT NULL AUTO_INCREMENT COMMENT '日志主键',
  `ems_syslog_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '模块标题',
  `ems_syslog_type` int NULL DEFAULT 0 COMMENT '业务类型（0其它 1新增 2修改 3删除）',
  `ems_syslog_method` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '方法名称',
  `ems_syslog_requestmethod` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '请求方式',
  `ems_syslog_opertype` int NULL DEFAULT 0 COMMENT '操作类别（0其它 1后台用户 2手机端用户）',
  `ems_syslog_operid` int NULL DEFAULT NULL COMMENT '操作人员id',
  `ems_syslog_opername` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '操作人员',
  `ems_syslog_customerid` int NULL DEFAULT NULL COMMENT '客户id',
  `ems_syslog_operurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '请求URL',
  `ems_syslog_operip` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '主机地址',
  `ems_syslog_operparam` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '请求参数',
  `ems_syslog_jsonresult` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '返回参数',
  `ems_syslog_status` int NULL DEFAULT 0 COMMENT '操作状态（0正常 1异常）',
  `ems_syslog_errormsg` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '错误消息',
  `ems_syslog_opertime` datetime NULL DEFAULT NULL COMMENT '操作时间',
  `ems_syslog_costtime` bigint NULL DEFAULT 0 COMMENT '消耗时间',
  PRIMARY KEY (`ems_syslog_id`) USING BTREE,
  INDEX `idx_sys_oper_log_bt`(`ems_syslog_type` ASC) USING BTREE,
  INDEX `idx_sys_oper_log_s`(`ems_syslog_status` ASC) USING BTREE,
  INDEX `idx_sys_oper_log_ot`(`ems_syslog_opertime` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 63907 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '操作日志记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for syslogininfor
-- ----------------------------
DROP TABLE IF EXISTS `syslogininfor`;
CREATE TABLE `syslogininfor`  (
  `info_id` bigint NOT NULL AUTO_INCREMENT COMMENT '访问ID',
  `user_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '用户账号',
  `ipaddr` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '登录IP地址',
  `login_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '登录地点',
  `browser` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '浏览器类型',
  `os` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '操作系统',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '登录状态（0成功 1失败）',
  `msg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '提示消息',
  `login_time` datetime NULL DEFAULT NULL COMMENT '访问时间',
  PRIMARY KEY (`info_id`) USING BTREE,
  INDEX `idx_sys_logininfor_s`(`status` ASC) USING BTREE,
  INDEX `idx_sys_logininfor_lt`(`login_time` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 100 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '系统访问记录' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sysnotice
-- ----------------------------
DROP TABLE IF EXISTS `sysnotice`;
CREATE TABLE `sysnotice`  (
  `notice_id` int NOT NULL AUTO_INCREMENT COMMENT '公告ID',
  `notice_title` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '公告标题',
  `notice_type` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '公告类型（1通知 2公告）',
  `notice_content` longblob NULL COMMENT '公告内容',
  `status` char(1) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '0' COMMENT '公告状态（0正常 1关闭）',
  `create_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '创建者',
  `create_time` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT '' COMMENT '更新者',
  `update_time` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `remark` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '备注',
  PRIMARY KEY (`notice_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci COMMENT = '通知公告表' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for sysuser
-- ----------------------------
DROP TABLE IF EXISTS `sysuser`;
CREATE TABLE `sysuser`  (
  `ems_sysuser_id` int NOT NULL AUTO_INCREMENT COMMENT '用户表',
  `ems_sysuser_loginname` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录账号 登录名',
  `ems_sysuser_password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '登录账号 密码',
  `ems_sysuser_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户名',
  `ems_sysuser_avatarfileid` int NULL DEFAULT NULL COMMENT '头像文件id',
  `ems_sysuser_status` tinyint(1) NULL DEFAULT NULL COMMENT '帐号状态（0停用 1正常）',
  `ems_sysuser_customerid` int NULL DEFAULT NULL COMMENT '客户id',
  `ems_sysuser_signature` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '个性签名 描述 简介',
  `ems_sysuser_creatime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_sysuser_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '用户地址',
  `ems_sysuser_mobilephone` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '移动电话',
  `ems_sysuser_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  `ems_sysuser_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '邮箱',
  PRIMARY KEY (`ems_sysuser_id`) USING BTREE,
  INDEX `emc_sysuser_customer_fk`(`ems_sysuser_customerid` ASC) USING BTREE,
  CONSTRAINT `emc_sysuser_customer_fk` FOREIGN KEY (`ems_sysuser_customerid`) REFERENCES `customer` (`ems_customer_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for sysuserrole
-- ----------------------------
DROP TABLE IF EXISTS `sysuserrole`;
CREATE TABLE `sysuserrole`  (
  `ems_sysuserrole_id` int NOT NULL AUTO_INCREMENT,
  `ems_sysuserrole_sysuserid` int NULL DEFAULT NULL,
  `ems_sysuserrole_roleid` int NULL DEFAULT NULL,
  PRIMARY KEY (`ems_sysuserrole_id`) USING BTREE,
  INDEX `mpi_userrole_roleid_fk`(`ems_sysuserrole_roleid` ASC) USING BTREE,
  INDEX `mpi_userrole_sysuserid_fk`(`ems_sysuserrole_sysuserid` ASC) USING BTREE,
  CONSTRAINT `emc_userrole_roleid_fk` FOREIGN KEY (`ems_sysuserrole_roleid`) REFERENCES `role` (`ems_role_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_userrole_sysuserid_fk` FOREIGN KEY (`ems_sysuserrole_sysuserid`) REFERENCES `sysuser` (`ems_sysuser_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 83 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for taganimation
-- ----------------------------
DROP TABLE IF EXISTS `taganimation`;
CREATE TABLE `taganimation`  (
  `ems_taganimation_id` int NOT NULL AUTO_INCREMENT COMMENT '标签动画表',
  `ems_taganimation_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签动画名字',
  PRIMARY KEY (`ems_taganimation_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tagtype
-- ----------------------------
DROP TABLE IF EXISTS `tagtype`;
CREATE TABLE `tagtype`  (
  `ems_tagtype_id` int NOT NULL AUTO_INCREMENT COMMENT '标签类型表',
  `ems_tagtype_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签类型名称',
  `ems_tagtype_iconfileid` int NULL DEFAULT NULL COMMENT '图标文件id',
  `ems_tagtype_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_tagtype_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `ems_tagtype_pid` int NULL DEFAULT NULL COMMENT '父节点id',
  `ems_tagtype_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签类型',
  `ems_tagtype_isdefault` tinyint NULL DEFAULT NULL COMMENT '是否是默认标签类型',
  `ems_tagtype_isupload` tinyint NULL DEFAULT NULL COMMENT '是否需要上传图标(对根节点有效,0:否,1:是)',
  `ems_tagtype_isleaf` int NULL DEFAULT NULL COMMENT '是否是叶子节点 0:否 1:是',
  PRIMARY KEY (`ems_tagtype_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 146 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for tagtype_copy
-- ----------------------------
DROP TABLE IF EXISTS `tagtype_copy`;
CREATE TABLE `tagtype_copy`  (
  `ems_tagtype_id` int NOT NULL AUTO_INCREMENT COMMENT '标签类型表',
  `ems_tagtype_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签类型名称',
  `ems_tagtype_iconfileid` int NULL DEFAULT NULL COMMENT '图标文件id',
  `ems_tagtype_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_tagtype_updatetime` datetime NULL DEFAULT NULL COMMENT '修改时间',
  `ems_tagtype_pid` int NULL DEFAULT NULL COMMENT '父节点id',
  `ems_tagtype_type` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '标签类型',
  `ems_tagtype_isdefault` tinyint NULL DEFAULT NULL COMMENT '是否是默认标签类型',
  `ems_tagtype_isupload` tinyint NULL DEFAULT NULL COMMENT '是否需要上传图标(对根节点有效,0:否,1:是)',
  PRIMARY KEY (`ems_tagtype_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 137 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for testitem
-- ----------------------------
DROP TABLE IF EXISTS `testitem`;
CREATE TABLE `testitem`  (
  `ems_testitem_id` int NOT NULL AUTO_INCREMENT COMMENT '测试项目表',
  `ems_testitem_option` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '是否必测 0 选测 1必测',
  `ems_testitem_pollutantid` int NULL DEFAULT NULL COMMENT '污染物id',
  `ems_testitem_standardid` int NULL DEFAULT NULL COMMENT '标准id',
  `ems_testitem_monitoringtartgettype` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '监测对象类型(例如地表水 水体类型 河 湖 库等)',
  `ems_testitem_activityid` int NULL DEFAULT NULL COMMENT '监测活动id',
  PRIMARY KEY (`ems_testitem_id`) USING BTREE,
  INDEX `emc_testitem_pollutantid_fk`(`ems_testitem_pollutantid` ASC) USING BTREE,
  INDEX `emc_testitem_standardid_fk`(`ems_testitem_standardid` ASC) USING BTREE,
  INDEX `ems_testitem_activityid_fk`(`ems_testitem_activityid` ASC) USING BTREE,
  CONSTRAINT `emc_testitem_pollutantid_fk` FOREIGN KEY (`ems_testitem_pollutantid`) REFERENCES `pollutant` (`ems_pollutant_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_testitem_standardid_fk` FOREIGN KEY (`ems_testitem_standardid`) REFERENCES `standard` (`ems_standard_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `ems_testitem_activityid_fk` FOREIGN KEY (`ems_testitem_activityid`) REFERENCES `activity` (`ems_activity_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for version
-- ----------------------------
DROP TABLE IF EXISTS `version`;
CREATE TABLE `version`  (
  `ems_version_id` int NOT NULL AUTO_INCREMENT COMMENT '版本表',
  `ems_version_no` int NULL DEFAULT NULL COMMENT '版本号',
  `ems_version_iscurrent` tinyint(1) NULL DEFAULT NULL COMMENT '是否当使用版本 0 不是 1 是',
  `ems_version_productid` int NULL DEFAULT NULL COMMENT '产品id',
  PRIMARY KEY (`ems_version_id`) USING BTREE,
  INDEX `emc_version_productid_fk`(`ems_version_productid` ASC) USING BTREE,
  CONSTRAINT `emc_version_productid_fk` FOREIGN KEY (`ems_version_productid`) REFERENCES `product` (`ems_product_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 489 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for videofusion
-- ----------------------------
DROP TABLE IF EXISTS `videofusion`;
CREATE TABLE `videofusion`  (
  `ems_videofusion_id` int NOT NULL AUTO_INCREMENT COMMENT '视频融合标签表',
  `ems_videofusion_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视频融合标签名称',
  `ems_videofusion_panoramaid` int NULL DEFAULT NULL COMMENT '全景图id',
  `ems_videofusion_tagtypeid` int NULL DEFAULT NULL COMMENT '标签类型id',
  `ems_videofusion_flvurl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'FLV视频流地址',
  `ems_videofusion_param` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '参数信息',
  `ems_videofusion_deviceid` int NULL DEFAULT NULL COMMENT '设备id',
  `ems_videofusion_rotation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视频融合标签旋转角度(\"0,-7,0\")',
  `ems_videofusion_location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '视频融合标签位置(\"-0.49,-7.71,-48.49\")',
  `ems_videofusion_widthratio` double NULL DEFAULT NULL COMMENT '图标宽度比例',
  `ems_videofusion_heightratio` double NULL DEFAULT NULL COMMENT '图标高度比例',
  `ems_videofusion_camrotation` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '相机旋转角度(\"0,-7,0\")',
  `ems_videofusion_viewscale` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '相机投影画面比例(\"0,0,0\")',
  `ems_videofusion_near` double NULL DEFAULT NULL COMMENT '近平面距离',
  `ems_videofusion_far` double NULL DEFAULT NULL COMMENT '远平面距离',
  `ems_videofusion_createtime` datetime NULL DEFAULT NULL COMMENT '创建时间',
  `ems_videofusion_updatetime` datetime NULL DEFAULT NULL COMMENT '更新时间',
  PRIMARY KEY (`ems_videofusion_id`) USING BTREE,
  INDEX `emc_videofusion_panoramaid_fk`(`ems_videofusion_panoramaid` ASC) USING BTREE,
  INDEX `emc_videofusion_panoramadesignid_fk`(`ems_videofusion_tagtypeid` ASC) USING BTREE,
  INDEX `emc_videofusion_deviceid_fk`(`ems_videofusion_deviceid` ASC) USING BTREE,
  CONSTRAINT `emc_videofusion_deviceid_fk` FOREIGN KEY (`ems_videofusion_deviceid`) REFERENCES `device` (`ems_device_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_videofusion_panoramadesignid_fk` FOREIGN KEY (`ems_videofusion_tagtypeid`) REFERENCES `tagtype` (`ems_tagtype_id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `emc_videofusion_panoramaid_fk` FOREIGN KEY (`ems_videofusion_panoramaid`) REFERENCES `panorama` (`ems_panorama_id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 57 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for workorder
-- ----------------------------
DROP TABLE IF EXISTS `workorder`;
CREATE TABLE `workorder`  (
  `ems_workorder_id` int NOT NULL AUTO_INCREMENT COMMENT '运维工单表',
  `ems_workorder_no` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '工单号',
  `ems_workorder_instanceid` int NULL DEFAULT NULL COMMENT '监测站id',
  `ems_workorder_starttime` datetime NULL DEFAULT NULL COMMENT '要求开始时间',
  `ems_workorder_endtime` datetime NULL DEFAULT NULL COMMENT '要求结束时间',
  PRIMARY KEY (`ems_workorder_id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = DYNAMIC;

-- ----------------------------
-- Table structure for xxl_job_group
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_group`;
CREATE TABLE `xxl_job_group`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `app_name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行器AppName',
  `title` varchar(12) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '执行器名称',
  `address_type` tinyint NOT NULL DEFAULT 0 COMMENT '执行器地址类型：0=自动注册、1=手动录入',
  `address_list` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '执行器地址列表，多地址逗号分隔',
  `update_time` datetime NULL DEFAULT NULL,
  `jobHandlers` varchar(2000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '调度任务JobHandler与描述JSON数组',
  `customerId` int NULL DEFAULT NULL COMMENT '客户id',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 16 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_info
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_info`;
CREATE TABLE `xxl_job_info`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_group` int NOT NULL COMMENT '执行器主键ID',
  `job_desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `add_time` datetime NULL DEFAULT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  `author` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '作者',
  `alarm_email` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '报警邮件',
  `schedule_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'NONE' COMMENT '调度类型',
  `schedule_conf` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '调度配置，值含义取决于调度类型',
  `misfire_strategy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL DEFAULT 'DO_NOTHING' COMMENT '调度过期策略',
  `executor_route_strategy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器路由策略',
  `executor_handler` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器任务handler',
  `executor_param` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器任务参数',
  `executor_block_strategy` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '阻塞处理策略',
  `executor_timeout` int NOT NULL DEFAULT 0 COMMENT '任务执行超时时间，单位秒',
  `executor_fail_retry_count` int NOT NULL DEFAULT 0 COMMENT '失败重试次数',
  `glue_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'GLUE类型',
  `glue_source` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'GLUE源代码',
  `glue_remark` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'GLUE备注',
  `glue_updatetime` datetime NULL DEFAULT NULL COMMENT 'GLUE更新时间',
  `child_jobid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '子任务ID，多个逗号分隔',
  `trigger_status` tinyint NOT NULL DEFAULT 0 COMMENT '调度状态：0-停止，1-运行',
  `trigger_last_time` bigint NOT NULL DEFAULT 0 COMMENT '上次调度时间',
  `trigger_next_time` bigint NOT NULL DEFAULT 0 COMMENT '下次调度时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 45 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_lock
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_lock`;
CREATE TABLE `xxl_job_lock`  (
  `lock_name` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '锁名称',
  PRIMARY KEY (`lock_name`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_log
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_log`;
CREATE TABLE `xxl_job_log`  (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `job_group` int NOT NULL COMMENT '执行器主键ID',
  `job_id` int NOT NULL COMMENT '任务，主键ID',
  `executor_address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器地址，本次执行的地址',
  `executor_handler` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器任务handler',
  `executor_param` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器任务参数',
  `executor_sharding_param` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '执行器任务分片参数，格式如 1/2',
  `executor_fail_retry_count` int NOT NULL DEFAULT 0 COMMENT '失败重试次数',
  `trigger_time` datetime NULL DEFAULT NULL COMMENT '调度-时间',
  `trigger_code` int NOT NULL COMMENT '调度-结果',
  `trigger_msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '调度-日志',
  `handle_time` datetime NULL DEFAULT NULL COMMENT '执行-时间',
  `handle_code` int NOT NULL COMMENT '执行-状态',
  `handle_msg` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT '执行-日志',
  `alarm_status` tinyint NOT NULL DEFAULT 0 COMMENT '告警状态：0-默认、1-无需告警、2-告警成功、3-告警失败',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `I_trigger_time`(`trigger_time` ASC) USING BTREE,
  INDEX `I_handle_code`(`handle_code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 60018 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_log_report
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_log_report`;
CREATE TABLE `xxl_job_log_report`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `trigger_day` datetime NULL DEFAULT NULL COMMENT '调度-时间',
  `running_count` int NOT NULL DEFAULT 0 COMMENT '运行中-日志数量',
  `suc_count` int NOT NULL DEFAULT 0 COMMENT '执行成功-日志数量',
  `fail_count` int NOT NULL DEFAULT 0 COMMENT '执行失败-日志数量',
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `i_trigger_day`(`trigger_day` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 119 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_logglue
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_logglue`;
CREATE TABLE `xxl_job_logglue`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `job_id` int NOT NULL COMMENT '任务，主键ID',
  `glue_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT 'GLUE类型',
  `glue_source` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL COMMENT 'GLUE源代码',
  `glue_remark` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT 'GLUE备注',
  `add_time` datetime NULL DEFAULT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_registry
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_registry`;
CREATE TABLE `xxl_job_registry`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `registry_group` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registry_key` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `registry_value` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `update_time` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `i_g_k_v`(`registry_group` ASC, `registry_key` ASC, `registry_value` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 180 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for xxl_job_user
-- ----------------------------
DROP TABLE IF EXISTS `xxl_job_user`;
CREATE TABLE `xxl_job_user`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '账号',
  `password` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '密码',
  `role` tinyint NOT NULL COMMENT '角色：0-普通用户、1-管理员',
  `permission` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '权限：执行器ID列表，多个逗号分割',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `i_username`(`username` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

SET FOREIGN_KEY_CHECKS = 1;
