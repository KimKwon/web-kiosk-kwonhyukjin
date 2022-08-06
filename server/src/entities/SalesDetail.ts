import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Item } from './Item';
import { Sales } from './Sales';
import { Size } from './Size';

@Entity('sales_detail', { schema: 'kioskdb' })
export class SalesDetail {
  @Column('tinyint', { name: 'is_ice', nullable: true })
  isIce: number | null;

  @Column('int', { name: 'amount', nullable: true, default: () => "'1'" })
  amount: number | null;

  @Column('int', { primary: true, name: 'item_id' })
  itemId: number;

  @Column('int', { primary: true, name: 'sales_id' })
  salesId: number;

  @Column('int', { primary: true, name: 'size_id' })
  sizeId: number;

  @ManyToOne(() => Item, (item) => item.salesDetails, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'item_id', referencedColumnName: 'id' }])
  item: Item;

  @ManyToOne(() => Sales, (sales) => sales.salesDetails, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'sales_id', referencedColumnName: 'id' }])
  sales: Sales;

  @ManyToOne(() => Size, (size) => size.salesDetails, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'size_id', referencedColumnName: 'id' }])
  size: Size;
}
