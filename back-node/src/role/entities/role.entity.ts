import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { RoleDesc } from 'src/utils/entitiesDescription';

@Entity('role')
export class Role {
  @ApiPropertyDesc(RoleDesc)
  @PrimaryGeneratedColumn({ comment: RoleDesc.id })
  id: number;

  @ApiPropertyDesc(RoleDesc)
  @Column({ length: 50, unique: true, comment: RoleDesc.name })
  name: string;
}
