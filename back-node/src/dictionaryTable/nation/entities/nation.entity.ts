import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { NationDesc } from 'src/utils/entitiesDescription';

@Entity('nation')
export class Nation {
  @ApiPropertyDesc(NationDesc)
  @PrimaryGeneratedColumn({ type: 'integer', comment: NationDesc.id })
  id: number;

  @ApiPropertyDesc(NationDesc)
  @Column({ length: 50, unique: true, comment: NationDesc.name })
  name: string;
}
