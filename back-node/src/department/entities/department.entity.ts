import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { DepartmentDesc } from 'src/utils/entitiesDescription';

@Entity('department')
export class Department {
  @ApiPropertyDesc(DepartmentDesc)
  @PrimaryGeneratedColumn({ type: 'bigint', comment: DepartmentDesc.id })
  id: number;

  @ApiPropertyDesc(DepartmentDesc)
  @Column({ length: 50, unique: true, comment: DepartmentDesc.name })
  name: string;

  @ApiPropertyDesc(DepartmentDesc)
  @OneToOne(() => User, user => user.id, { nullable: true })
  @JoinColumn({ name: 'manager' })
  manager: User['id'];

  @ApiPropertyDesc(DepartmentDesc)
  @ManyToOne(() => Department, department => department.id, {
    nullable: true,
  })
  @JoinColumn({ name: 'parent' })
  parent: Department['id'];

  @ApiPropertyDesc(DepartmentDesc)
  @Column({ nullable: true, comment: DepartmentDesc.email })
  email: string;
}
