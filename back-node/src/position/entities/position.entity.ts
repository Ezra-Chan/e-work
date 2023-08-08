import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { PositionDesc } from 'src/utils/entitiesDescription';

@Entity('position')
export class Position {
  @ApiPropertyDesc(PositionDesc)
  @PrimaryGeneratedColumn({ comment: PositionDesc.id })
  id: number;

  @ApiPropertyDesc(PositionDesc)
  @Column({ length: 50, unique: true, comment: PositionDesc.name })
  name: string;
}
