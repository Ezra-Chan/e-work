import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('users')
export class User {
  @ApiProperty({ description: '用户ID' })
  @PrimaryGeneratedColumn({ comment: '用户ID' })
  id: number;

  @ApiProperty({ description: '用户登录名' })
  @Column({ length: 50, unique: true, comment: '用户登录名', nullable: false })
  loginName: string;

  @ApiProperty({ description: '用户密码' })
  @Column({ length: 50, comment: '用户密码', nullable: false })
  password: string;
}
