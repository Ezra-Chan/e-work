/*
 Navicat Premium Data Transfer

 Source Server         : root
 Source Server Type    : MySQL
 Source Server Version : 80033
 Source Host           : localhost:3306
 Source Schema         : ework

 Target Server Type    : MySQL
 Target Server Version : 80033
 File Encoding         : 65001

 Date: 08/09/2023 23:44:54
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for department
-- ----------------------------
DROP TABLE IF EXISTS `department`;
CREATE TABLE `department` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '部门ID',
  `name` varchar(50) NOT NULL COMMENT '部门名',
  `email` varchar(255) DEFAULT NULL COMMENT '部门邮箱',
  `manager_id` bigint DEFAULT NULL COMMENT '用户ID',
  `parent_id` bigint DEFAULT NULL COMMENT '部门ID',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_471da4b90e96c1ebe0af221e07` (`name`),
  UNIQUE KEY `REL_4ca0fbc25538965a90575dc4a8` (`manager_id`),
  KEY `FK_110d56d702b0880fe9b005878e9` (`parent_id`),
  CONSTRAINT `FK_110d56d702b0880fe9b005878e9` FOREIGN KEY (`parent_id`) REFERENCES `department` (`id`),
  CONSTRAINT `FK_4ca0fbc25538965a90575dc4a81` FOREIGN KEY (`manager_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of department
-- ----------------------------
BEGIN;
INSERT INTO `department` VALUES (1, '研发部', NULL, NULL, NULL);
INSERT INTO `department` VALUES (2, '人力资源部', NULL, 2, NULL);
INSERT INTO `department` VALUES (3, '财务部', NULL, 3, NULL);
INSERT INTO `department` VALUES (4, '综合部', NULL, NULL, NULL);
INSERT INTO `department` VALUES (5, '市场部', NULL, NULL, NULL);
INSERT INTO `department` VALUES (6, '销售部', NULL, NULL, NULL);
INSERT INTO `department` VALUES (7, '产品部', NULL, NULL, 1);
INSERT INTO `department` VALUES (8, '开发部', NULL, 5, 1);
INSERT INTO `department` VALUES (9, '项目部', NULL, NULL, 1);
INSERT INTO `department` VALUES (10, '测试部', NULL, NULL, 1);
INSERT INTO `department` VALUES (11, '运维部', NULL, NULL, 1);
INSERT INTO `department` VALUES (12, '会计部', NULL, NULL, 3);
INSERT INTO `department` VALUES (13, '出纳部', NULL, NULL, 3);
INSERT INTO `department` VALUES (14, '总经办', NULL, NULL, 4);
INSERT INTO `department` VALUES (15, '行政部', NULL, NULL, 4);
INSERT INTO `department` VALUES (16, '采购部', NULL, NULL, 4);
INSERT INTO `department` VALUES (17, '法务部', NULL, NULL, 4);
INSERT INTO `department` VALUES (18, '产品营销部', NULL, NULL, 5);
INSERT INTO `department` VALUES (19, '市场运营部', NULL, NULL, 5);
INSERT INTO `department` VALUES (20, '售前部', NULL, NULL, 6);
INSERT INTO `department` VALUES (21, '售后部', NULL, NULL, 6);
INSERT INTO `department` VALUES (22, '渠道部', NULL, NULL, 6);
COMMIT;

-- ----------------------------
-- Table structure for nation
-- ----------------------------
DROP TABLE IF EXISTS `nation`;
CREATE TABLE `nation` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '民族ID',
  `name` varchar(50) NOT NULL COMMENT '民族名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_88f486ebf11b412463de3ae943` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of nation
-- ----------------------------
BEGIN;
INSERT INTO `nation` VALUES (23, '东乡族');
INSERT INTO `nation` VALUES (50, '乌孜别克族');
INSERT INTO `nation` VALUES (44, '京族');
INSERT INTO `nation` VALUES (22, '仡佬族');
INSERT INTO `nation` VALUES (31, '仫佬族');
INSERT INTO `nation` VALUES (27, '佤族');
INSERT INTO `nation` VALUES (12, '侗族');
INSERT INTO `nation` VALUES (48, '俄罗斯族');
INSERT INTO `nation` VALUES (47, '保安族');
INSERT INTO `nation` VALUES (21, '傈僳族');
INSERT INTO `nation` VALUES (19, '傣族');
INSERT INTO `nation` VALUES (57, '其它');
INSERT INTO `nation` VALUES (16, '哈尼族');
INSERT INTO `nation` VALUES (17, '哈萨克族');
INSERT INTO `nation` VALUES (4, '回族');
INSERT INTO `nation` VALUES (7, '土家族');
INSERT INTO `nation` VALUES (30, '土族');
INSERT INTO `nation` VALUES (45, '基诺族');
INSERT INTO `nation` VALUES (39, '塔吉克族');
INSERT INTO `nation` VALUES (54, '塔塔尔族');
INSERT INTO `nation` VALUES (2, '壮族');
INSERT INTO `nation` VALUES (11, '布依族');
INSERT INTO `nation` VALUES (38, '布朗族');
INSERT INTO `nation` VALUES (8, '彝族');
INSERT INTO `nation` VALUES (46, '德昂族');
INSERT INTO `nation` VALUES (43, '怒族');
INSERT INTO `nation` VALUES (25, '拉祜族');
INSERT INTO `nation` VALUES (37, '撒拉族');
INSERT INTO `nation` VALUES (41, '普米族');
INSERT INTO `nation` VALUES (35, '景颇族');
INSERT INTO `nation` VALUES (14, '朝鲜族');
INSERT INTO `nation` VALUES (33, '柯尔克孜族');
INSERT INTO `nation` VALUES (36, '毛南族');
INSERT INTO `nation` VALUES (26, '水族');
INSERT INTO `nation` VALUES (1, '汉族');
INSERT INTO `nation` VALUES (3, '满族');
INSERT INTO `nation` VALUES (53, '独龙族');
INSERT INTO `nation` VALUES (56, '珞巴族');
INSERT INTO `nation` VALUES (13, '瑶族');
INSERT INTO `nation` VALUES (20, '畲族');
INSERT INTO `nation` VALUES (15, '白族');
INSERT INTO `nation` VALUES (28, '纳西族');
INSERT INTO `nation` VALUES (6, '维吾尔族');
INSERT INTO `nation` VALUES (29, '羌族');
INSERT INTO `nation` VALUES (5, '苗族');
INSERT INTO `nation` VALUES (9, '蒙古族');
INSERT INTO `nation` VALUES (10, '藏族');
INSERT INTO `nation` VALUES (49, '裕固族');
INSERT INTO `nation` VALUES (55, '赫哲族');
INSERT INTO `nation` VALUES (34, '达斡尔族');
INSERT INTO `nation` VALUES (52, '鄂伦春族');
INSERT INTO `nation` VALUES (42, '鄂温克族');
INSERT INTO `nation` VALUES (32, '锡伯族');
INSERT INTO `nation` VALUES (51, '门巴族');
INSERT INTO `nation` VALUES (40, '阿昌族');
INSERT INTO `nation` VALUES (24, '高山族');
INSERT INTO `nation` VALUES (18, '黎族');
COMMIT;

-- ----------------------------
-- Table structure for position
-- ----------------------------
DROP TABLE IF EXISTS `position`;
CREATE TABLE `position` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '职位ID',
  `name` varchar(50) NOT NULL COMMENT '职位名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_94b556b24267b2d75d6d05fcd1` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of position
-- ----------------------------
BEGIN;
INSERT INTO `position` VALUES (28, '产品经理');
INSERT INTO `position` VALUES (21, '产品营销部经理');
INSERT INTO `position` VALUES (39, '产品运营');
INSERT INTO `position` VALUES (11, '产品部经理');
INSERT INTO `position` VALUES (40, '产品销售');
INSERT INTO `position` VALUES (45, '人事专员');
INSERT INTO `position` VALUES (6, '人力资源部经理');
INSERT INTO `position` VALUES (32, '会计');
INSERT INTO `position` VALUES (16, '会计部经理');
INSERT INTO `position` VALUES (33, '出纳');
INSERT INTO `position` VALUES (17, '出纳部经理');
INSERT INTO `position` VALUES (26, '前端工程师');
INSERT INTO `position` VALUES (4, '副总裁');
INSERT INTO `position` VALUES (27, '后端工程师');
INSERT INTO `position` VALUES (43, '售前工程师');
INSERT INTO `position` VALUES (23, '售前部经理');
INSERT INTO `position` VALUES (44, '售后');
INSERT INTO `position` VALUES (24, '售后部经理');
INSERT INTO `position` VALUES (41, '市场运营');
INSERT INTO `position` VALUES (22, '市场运营部经理');
INSERT INTO `position` VALUES (9, '市场部经理');
INSERT INTO `position` VALUES (12, '开发部经理');
INSERT INTO `position` VALUES (3, '总裁');
INSERT INTO `position` VALUES (35, '总裁助理');
INSERT INTO `position` VALUES (38, '法务专员');
INSERT INTO `position` VALUES (20, '法务部经理');
INSERT INTO `position` VALUES (30, '测试工程师');
INSERT INTO `position` VALUES (14, '测试部经理');
INSERT INTO `position` VALUES (25, '渠道部经理');
INSERT INTO `position` VALUES (5, '研发部经理');
INSERT INTO `position` VALUES (8, '综合部经理');
INSERT INTO `position` VALUES (2, '董事');
INSERT INTO `position` VALUES (1, '董事长');
INSERT INTO `position` VALUES (34, '董事长秘书');
INSERT INTO `position` VALUES (36, '行政');
INSERT INTO `position` VALUES (18, '行政部经理');
INSERT INTO `position` VALUES (7, '财务部经理');
INSERT INTO `position` VALUES (31, '运维工程师');
INSERT INTO `position` VALUES (15, '运维部经理');
INSERT INTO `position` VALUES (37, '采购员');
INSERT INTO `position` VALUES (19, '采购部经理');
INSERT INTO `position` VALUES (42, '销售经理');
INSERT INTO `position` VALUES (10, '销售部经理');
INSERT INTO `position` VALUES (29, '项目经理');
INSERT INTO `position` VALUES (13, '项目部经理');
COMMIT;

-- ----------------------------
-- Table structure for role
-- ----------------------------
DROP TABLE IF EXISTS `role`;
CREATE TABLE `role` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '角色ID',
  `name` varchar(50) NOT NULL COMMENT '角色名',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_ae4578dcaed5adff96595e6166` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of role
-- ----------------------------
BEGIN;
INSERT INTO `role` VALUES (2, '人事');
INSERT INTO `role` VALUES (4, '普通员工');
INSERT INTO `role` VALUES (5, '测试');
INSERT INTO `role` VALUES (3, '财务');
INSERT INTO `role` VALUES (1, '超级管理员');
COMMIT;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` bigint NOT NULL AUTO_INCREMENT COMMENT '用户ID',
  `real_name` varchar(50) NOT NULL COMMENT '姓名',
  `sex` enum('男','女') NOT NULL DEFAULT '男' COMMENT '性别',
  `login_name` varchar(50) NOT NULL COMMENT '登录名',
  `password` varchar(255) NOT NULL COMMENT '密码',
  `avatar` varchar(255) DEFAULT NULL COMMENT '头像',
  `email` varchar(255) DEFAULT NULL COMMENT '邮箱',
  `phone_number` varchar(255) DEFAULT NULL COMMENT '手机号',
  `id_card` varchar(255) NOT NULL COMMENT '身份证号',
  `bank_card` varchar(255) NOT NULL COMMENT '银行卡号',
  `education` enum('无','小学','初中','中专','高中','大专','本科','硕士','博士','其它') DEFAULT NULL COMMENT '学历',
  `graduate_school` varchar(255) DEFAULT NULL COMMENT '毕业院校',
  `address` varchar(255) DEFAULT NULL COMMENT '住址',
  `signature` varchar(255) DEFAULT NULL COMMENT '个性签名',
  `last_login_ip` varchar(255) DEFAULT NULL COMMENT '最后登录IP',
  `last_login_time` timestamp NULL DEFAULT NULL COMMENT '最后登录时间',
  `create_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '入职日期',
  `update_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  `enabled` tinyint NOT NULL DEFAULT '1' COMMENT '是否启用',
  `role_id` int DEFAULT NULL COMMENT '角色ID',
  `department_id` bigint DEFAULT NULL COMMENT '部门ID',
  `leader_id` bigint DEFAULT NULL COMMENT '用户ID',
  `graduate_time` timestamp NULL DEFAULT NULL COMMENT '毕业时间',
  `marital_status` varchar(255) DEFAULT NULL COMMENT '婚姻状况',
  `native_place` varchar(255) DEFAULT NULL COMMENT '籍贯',
  `account_location` varchar(255) DEFAULT NULL COMMENT '户口所在地',
  `nation_id` int DEFAULT NULL COMMENT '民族ID',
  `position_id` int DEFAULT NULL COMMENT '职位ID',
  `social_security` varchar(255) DEFAULT NULL COMMENT '社保卡号',
  `accumulation_fund` varchar(255) DEFAULT NULL COMMENT '公积金号',
  `employee_type` varchar(255) DEFAULT NULL COMMENT '员工类型',
  `employee_status` varchar(255) DEFAULT NULL COMMENT '员工状态',
  `political_status` varchar(255) DEFAULT NULL COMMENT '政治面貌',
  PRIMARY KEY (`id`),
  UNIQUE KEY `IDX_0dc1bdda5aff071cdbcf956594` (`login_name`),
  UNIQUE KEY `IDX_bd43dff3d2c68a6a5f74ec48c1` (`id_card`),
  UNIQUE KEY `IDX_bdc63fa2e960073de64645bfbb` (`bank_card`),
  UNIQUE KEY `IDX_01eea41349b6c9275aec646eee` (`phone_number`),
  UNIQUE KEY `IDX_d24c51c5d8cadd19280f67a452` (`social_security`),
  UNIQUE KEY `IDX_96833ed3a8b2d60b6038d849eb` (`accumulation_fund`),
  KEY `FK_afd2c87bee70dd5557f48911e66` (`department_id`),
  KEY `FK_4267de6dd8880ce7cae1454cdf7` (`leader_id`),
  KEY `FK_f0bb76042ad22ee6710b8adddee` (`nation_id`),
  KEY `FK_3939765e4030ef65f928bfa99bb` (`position_id`),
  KEY `FK_fb2e442d14add3cefbdf33c4561` (`role_id`),
  CONSTRAINT `FK_3939765e4030ef65f928bfa99bb` FOREIGN KEY (`position_id`) REFERENCES `position` (`id`),
  CONSTRAINT `FK_4267de6dd8880ce7cae1454cdf7` FOREIGN KEY (`leader_id`) REFERENCES `user` (`id`),
  CONSTRAINT `FK_afd2c87bee70dd5557f48911e66` FOREIGN KEY (`department_id`) REFERENCES `department` (`id`),
  CONSTRAINT `FK_f0bb76042ad22ee6710b8adddee` FOREIGN KEY (`nation_id`) REFERENCES `nation` (`id`),
  CONSTRAINT `FK_fb2e442d14add3cefbdf33c4561` FOREIGN KEY (`role_id`) REFERENCES `role` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- ----------------------------
-- Records of user
-- ----------------------------
BEGIN;
INSERT INTO `user` VALUES (1, '超级管理员', '男', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'https://avatars.githubusercontent.com/u/21073039?v=4', NULL, NULL, '321001200001011010', '6228480402564890018', '本科', NULL, NULL, 'fighting！fighting！fighting！', '::ffff:127.0.0.1', '2023-09-06 11:24:32', '2023-07-24 11:21:18', '2023-09-06 11:24:32', 1, 1, NULL, NULL, NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (2, '张三', '男', 'zhangsan', 'e10adc3949ba59abbe56e057f20f883e', 'https://avatars.githubusercontent.com/u/21073039?v=4', NULL, NULL, '321001200001011011', '6228480402564890011', '本科', NULL, NULL, NULL, NULL, NULL, '2023-07-24 11:49:08', '2023-08-08 12:08:12', 1, 2, 2, 1, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (3, '李四', '男', 'lisi', 'e10adc3949ba59abbe56e057f20f883e', 'https://avatars.githubusercontent.com/u/21073039?v=4', NULL, NULL, '321001200001011012', '6228480402564890012', '本科', NULL, NULL, NULL, NULL, NULL, '2023-07-24 14:03:19', '2023-08-08 12:08:13', 1, 3, 3, 2, NULL, NULL, NULL, NULL, 2, 2, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (4, '王五', '女', 'wangwu', 'e10adc3949ba59abbe56e057f20f883e', 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif', NULL, NULL, '321001200001011014', '6228480402564890014', '本科', NULL, 'xx市xx区xx街道xx号', '学习是进步的阶梯', NULL, NULL, '2023-07-25 09:32:53', '2023-08-08 12:08:15', 1, 3, 12, 3, NULL, NULL, NULL, NULL, 3, 3, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `user` VALUES (5, '测试', '男', 'test', 'e10adc3949ba59abbe56e057f20f883e', 'https://avatars.githubusercontent.com/u/21073039?v=4', NULL, NULL, '321001200001011015', '6228480402564890015', '本科', NULL, NULL, NULL, NULL, NULL, '2023-07-25 11:13:41', '2023-08-11 21:53:14', 0, 4, 8, NULL, NULL, NULL, NULL, NULL, 4, 4, NULL, NULL, NULL, NULL, NULL);
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
