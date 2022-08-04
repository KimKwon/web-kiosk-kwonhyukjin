import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';

@Entity('category', { schema: 'kioskdb' })
export class Category {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 45 })
  name: string | null;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
