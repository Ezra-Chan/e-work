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

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'path', comment: MenuDesc.path, length: 100 })
  path: string;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'icon', comment: MenuDesc.icon, length: 50 })
  icon: string;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'component', comment: MenuDesc.component, length: 100 })
  component: string;
}
