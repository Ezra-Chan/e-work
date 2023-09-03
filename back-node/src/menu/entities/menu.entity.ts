import { ApiPropertyDesc } from 'src/utils/customDecorator';
import { MenuDesc } from 'src/utils/entitiesDescription';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('menu')
export class Menu {
  @ApiPropertyDesc(MenuDesc)
  @PrimaryGeneratedColumn({ type: 'bigint', comment: MenuDesc.id })
  id: number;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'name', comment: MenuDesc.name, length: 50 })
  name: string;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'title', comment: MenuDesc.title, length: 50 })
  title: string;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'path', comment: MenuDesc.path, length: 100 })
  path: string;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'component', comment: MenuDesc.component, length: 100 })
  component: string;

  @ApiPropertyDesc(MenuDesc)
  @Column({ name: 'icon', comment: MenuDesc.icon })
  icon: string;

  @ApiPropertyDesc(MenuDesc, { type: () => Menu, example: 1 })
  @ManyToOne(() => Menu, menu => menu.id, { nullable: true })
  @JoinColumn({ name: 'parent_id' })
  parentId: Menu;
}
