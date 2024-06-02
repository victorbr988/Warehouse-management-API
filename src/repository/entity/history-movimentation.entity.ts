import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

export enum HistoryMovimentationType {
  ENTRANCE = 1,
  EXIT = 2,
  QUANTITY_STOCK = 3,
  NONE = 4,
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

  @Column()
  product: string;

  @Column()
  quantity: string;

  @ManyToOne(() => User, (user) => user.historyMovimentations)
  user: User
}