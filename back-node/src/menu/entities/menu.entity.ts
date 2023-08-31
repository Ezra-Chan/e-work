import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { MenuDesc } from 'src/utils/entitiesDescription';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @ApiPropertyDesc(MenuDesc)
  @PrimaryGeneratedColumn({ type: 'bigint', comment: MenuDesc.id })
  id: number;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'name', comment: MenuDesc.name, length: 50, unique: true })
  name: string;
}
