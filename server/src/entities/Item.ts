import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { Size } from './Size';
import { SalesDetail } from './SalesDetail';

@Entity('item', { schema: 'kioskdb' })
export class Item {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('int', { name: 'rank', nullable: true })
  rank: number | null;

  @Column('varchar', { name: 'name', nullable: true, length: 45 })
  name: string | null;

  @Column('decimal', { name: 'price', nullable: true, precision: 8, scale: 0 })
  price: number | null;

  @Column('varchar', { name: 'thumbnail', nullable: true, length: 255 })
  thumbnail: string | null;

  @Column('varchar', {
    name: 'specific_temperature_only',
    nullable: true,
    length: 45,
  })
  specificTemperatureOnly: string | null;

  @Column('varchar', { name: 'description', nullable: true, length: 45 })
  description: string | null;

  @Column('int', { name: 'category_id', select: false })
  categoryId: number;

  @ManyToOne(() => Category, (category) => category.items, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'category_id', referencedColumnName: 'id' }])
  category: Category;

  @ManyToMany(() => Size, (size) => size.items)
  @JoinTable({
    name: 'item_has_size',
    joinColumns: [{ name: 'item_id', referencedColumnName: 'id' }],
    inverseJoinColumns: [{ name: 'size_id', referencedColumnName: 'id' }],
    schema: 'kioskdb',
  })
  sizes: Size[];

  @OneToMany(() => SalesDetail, (salesDetail) => salesDetail.item)
  salesDetails: SalesDetail[];
}
