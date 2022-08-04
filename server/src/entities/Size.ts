import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Item } from './Item';
import { SalesDetail } from './SalesDetail';

@Entity('size', { schema: 'kioskdb' })
export class Size {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('decimal', {
    name: 'surcharge',
    nullable: true,
    precision: 10,
    scale: 0,
  })
  surcharge: string | null;

  @Column('varchar', { name: 'name', nullable: true, length: 45 })
  name: string | null;

  @ManyToMany(() => Item, (item) => item.sizes)
  items: Item[];

  @OneToMany(() => SalesDetail, (salesDetail) => salesDetail.size)
  salesDetails: SalesDetail[];
}
