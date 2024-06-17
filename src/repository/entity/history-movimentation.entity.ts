import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";
import { v4 as uuidV4 } from 'uuid';

export enum HistoryMovimentationType {
  ENTRANCE = "1",
  EXIT = "2",
  PRODUCT = "3",
  NONE = "4",
}

@Entity()
export class HistoryMovimentation {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidV4();

  @Column({
    type: "enum",
    enum: HistoryMovimentationType,
    default: HistoryMovimentationType.NONE,
  })
  type: HistoryMovimentationType;

  @ManyToOne(() => Product, (product) => product.historyMovimentations)
  product: Product;

  @ManyToOne(() => User, (user) => user.historyMovimentations)
  user: User

  @Column()
  quantity: number;

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}