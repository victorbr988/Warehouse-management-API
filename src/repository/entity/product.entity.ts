import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { HistoryMovimentation } from "./history-movimentation.entity";
import { v4 as uuidV4 } from 'uuid';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidV4();

  @Column()
  name: string;

  @Column()
  quantity: number;

  @OneToMany(() => HistoryMovimentation, (historyMovimentation) => historyMovimentation.product)
  historyMovimentations: HistoryMovimentation[];

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}