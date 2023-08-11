import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Department } from 'src/department/entities/department.entity';
import { Role } from 'src/role/entities/role.entity';
import { Nation } from 'src/dictionaryTable/nation/entities/nation.entity';
import {
  EDUCATION,
  SEX,
  MARITAL_STATUS,
  EMPLOYEE_TYPE,
  EMPLOYEE_STATUS,
  POLITICAL_STATUS,
} from 'src/utils/constant';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { UserDesc } from 'src/utils/entitiesDescription';
import { Position } from 'src/position/entities/position.entity';

@Entity('user')
export class User {
  // 个人信息
  @ApiPropertyDesc(UserDesc)
  @PrimaryGeneratedColumn({ type: 'bigint', comment: UserDesc.id })
  id: number;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'login_name',
    length: 50,
    unique: true,
    comment: UserDesc.loginName,
  })
  loginName: string;

  @ApiPropertyDesc(UserDesc)
  @Exclude()
  @Column({ comment: UserDesc.password })
  password: string;

  @ApiPropertyDesc(UserDesc)
  @Column({ name: 'real_name', length: 50, comment: UserDesc.realName })
  realName: string;

  @ApiPropertyDesc(UserDesc)
  @Column('enum', {
    enum: SEX,
    default: SEX['MALE'],
    comment: UserDesc.sex,
  })
  sex: SEX;

  @ApiPropertyDesc(UserDesc)
  @Column({ nullable: true, default: null, comment: UserDesc.avatar })
  avatar: string;

  @ApiPropertyDesc(UserDesc)
  @Column({ nullable: true, default: null, comment: UserDesc.email })
  email: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'phone_number',
    nullable: true,
    default: null,
    comment: UserDesc.phoneNumber,
    unique: true,
  })
  phoneNumber: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'id_card',
    nullable: false,
    comment: UserDesc.idCard,
    unique: true,
  })
  idCard: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'marital_status',
    default: null,
    nullable: true,
    comment: UserDesc.maritalStatus,
  })
  maritalStatus: MARITAL_STATUS;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'native_place',
    default: null,
    nullable: true,
    comment: UserDesc.nativePlace,
  })
  nativePlace: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'political_status',
    default: null,
    nullable: true,
    comment: UserDesc.politicalStatus,
  })
  politicalStatus: POLITICAL_STATUS;

  @ApiPropertyDesc(UserDesc)
  @ManyToOne(() => Nation, nation => nation.id, { nullable: true })
  @JoinColumn({ name: 'nation_id' })
  nation: Nation;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'account_location',
    default: null,
    nullable: true,
    comment: UserDesc.accountLocation,
  })
  accountLocation: string;

  @ApiPropertyDesc(UserDesc)
  @Column({ nullable: true, default: null, comment: UserDesc.address })
  address: string;

  @ApiPropertyDesc(UserDesc)
  @Column({ nullable: true, default: null, comment: UserDesc.signature })
  signature: string;

  // 学历信息
  @ApiPropertyDesc(UserDesc)
  @Column('enum', {
    enum: EDUCATION,
    default: null,
    nullable: true,
    comment: UserDesc.education,
  })
  education: EDUCATION;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'graduate_school',
    default: null,
    nullable: true,
    comment: UserDesc.graduateSchool,
  })
  graduateSchool: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'graduate_time',
    type: 'timestamp',
    default: null,
    nullable: true,
    comment: UserDesc.graduateTime,
  })
  graduateTime: Date;

  // 工作信息
  @ApiPropertyDesc(UserDesc, { type: () => Role, example: 1 })
  @ManyToOne(() => Role, role => role.id, { nullable: true })
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @ApiPropertyDesc(UserDesc, { type: () => Department, example: 1 })
  @ManyToOne(() => Department, department => department.id)
  @JoinColumn({ name: 'department_id' })
  department: Department;

  @ApiPropertyDesc(UserDesc)
  @ManyToOne(() => Position, position => position.id, { nullable: true })
  @JoinColumn({ name: 'position_id' })
  position: Position;

  @ApiPropertyDesc(UserDesc, { type: () => User, example: 1 })
  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'leader_id' })
  leader: User;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'employee_type',
    default: null,
    nullable: true,
    comment: UserDesc.employeeType,
  })
  employeeType: EMPLOYEE_TYPE;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'employee_status',
    default: null,
    nullable: true,
    comment: UserDesc.employeeStatus,
  })
  employeeStatus: EMPLOYEE_STATUS;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: UserDesc.joinTime,
  })
  joinTime: Date;

  // 账户信息
  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'bank_card',
    nullable: false,
    unique: true,
    comment: UserDesc.bankCard,
  })
  bankCard: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'social_security',
    nullable: true,
    unique: true,
    comment: UserDesc.socialSecurity,
  })
  socialSecurity: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'accumulation_fund',
    nullable: true,
    unique: true,
    comment: UserDesc.accumulationFund,
  })
  accumulationFund: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'last_login_ip',
    default: null,
    comment: UserDesc.lastLoginIp,
  })
  lastLoginIp: string;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'last_login_time',
    type: 'timestamp',
    default: null,
    comment: UserDesc.lastLoginTime,
  })
  lastLoginTime: Date;

  @ApiPropertyDesc(UserDesc)
  @Column({
    name: 'update_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
    comment: UserDesc.updateTime,
  })
  updateTime: Date;

  @ApiPropertyDesc(UserDesc)
  @Column({ type: 'boolean', default: true, comment: UserDesc.enabled })
  enabled: boolean;
}
