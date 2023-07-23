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
import { EDUCATION, SEX } from 'src/utils/constant';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { UserDesc } from 'src/utils/entitiesDescription';

@Entity('user')
export class User {
  @ApiPropertyDesc(UserDesc)
  @PrimaryGeneratedColumn({ type: 'bigint', comment: UserDesc.id })
  id: number;

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
  @ManyToOne(() => Role, role => role.id, { nullable: false })
  @JoinColumn({ name: 'role_id' })
  roleId: Role['id'];

  @ApiPropertyDesc(UserDesc)
  @ManyToOne(() => Department, department => department.id)
  @JoinColumn({ name: 'department_id' })
  departmentId: Department['id'];

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
    name: 'bank_card',
    nullable: false,
    unique: true,
    comment: UserDesc.bankCard,
  })
  bankCard: string;

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
  @ManyToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'leader_id' })
  leaderId: User['id'];

  @ApiPropertyDesc(UserDesc)
  @Column({ nullable: true, default: null, comment: UserDesc.address })
  address: string;

  @ApiPropertyDesc(UserDesc)
  @Column({ nullable: true, default: null, comment: UserDesc.signature })
  signature: string;

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
    name: 'create_time',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    comment: UserDesc.joinTime,
  })
  joinTime: Date;

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
