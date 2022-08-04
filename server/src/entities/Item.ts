import {
  Column,
  Entity,
  Index,
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

@Index('fk_item_category1_idx', ['categoryId'], {})
@Entity('item', { schema: 'kioskdb' })
export class Item {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 45 })
  name: string | null;

  @Column('decimal', { name: 'price', nullable: true, precision: 10, scale: 0 })
  price: string | null;

  @Column('varchar', { name: 'thumbnail', nullable: true, length: 45 })
  thumbnail: string | null;

  @Column('varchar', {
    name: 'specific_tempature_only',
    nullable: true,
    length: 45,
  })
  specificTempatureOnly: string | null;

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
