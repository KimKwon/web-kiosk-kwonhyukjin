import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from './PaymentMethod';
import { SalesDetail } from './SalesDetail';

@Entity('sales', { schema: 'kioskdb' })
export class Sales {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @Column('int', { name: 'payment_method_id' })
  paymentMethodId: number;

  @Column('decimal', {
    name: 'total_amount',
    nullable: true,
    precision: 8,
    scale: 0,
  })
  totalAmount: number | null;

  @Column('decimal', {
    name: 'given_price',
    nullable: true,
    precision: 8,
    scale: 0,
  })
  givenPrice: number | null;

  @ManyToOne(() => PaymentMethod, (paymentMethod) => paymentMethod.sales, {
    onDelete: 'NO ACTION',
    onUpdate: 'NO ACTION',
  })
  @JoinColumn([{ name: 'payment_method_id', referencedColumnName: 'id' }])
  paymentMethod: PaymentMethod;

  @OneToMany(() => SalesDetail, (salesDetail) => salesDetail.sales)
  salesDetails: SalesDetail[];
}
