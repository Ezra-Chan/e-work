import { Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('menu')
export class Menu {
  @PrimaryGeneratedColumn({ type: 'bigint', comment: '' })
  id: number;
}
