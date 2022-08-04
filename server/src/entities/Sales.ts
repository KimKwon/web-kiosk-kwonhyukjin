import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { PaymentMethod } from './PaymentMethod';
import { SalesDetail } from './SalesDetail';

@Index('fk_sales_payment_method1_idx', ['paymentMethodId'], {})
@Entity('sales', { schema: 'kioskdb' })
export class Sales {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'created_at', nullable: true, length: 45 })
  createdAt: string | null;

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
