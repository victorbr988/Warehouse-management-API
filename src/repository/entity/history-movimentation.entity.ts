import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./user.entity";
import { Product } from "./product.entity";

export enum HistoryMovimentationType {
  ENTRANCE = 1,
  EXIT = 2,
  NONE = 3,
}

@Entity()
export class HistoryMovimentation {
  @PrimaryGeneratedColumn('uuid')
  id: string;

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

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}