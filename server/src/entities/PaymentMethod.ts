import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Sales } from './Sales';

@Entity('payment_method', { schema: 'kioskdb' })
export class PaymentMethod {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  id: number;

  @Column('varchar', { name: 'name', nullable: true, length: 45 })
  name: string | null;

  @OneToMany(() => Sales, (sales) => sales.paymentMethod)
  sales: Sales[];
}
