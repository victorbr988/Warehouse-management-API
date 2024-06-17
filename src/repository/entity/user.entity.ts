import { Entity, Column, PrimaryGeneratedColumn, OneToMany, } from 'typeorm';
import { HistoryMovimentation } from './history-movimentation.entity';
import { v4 as uuidV4 } from 'uuid';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string = uuidV4();

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => User, (user) => user.historyMovimentations)
  historyMovimentations: HistoryMovimentation[];

  @Column({ type: "timestamptz", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamptz" })
  updatedAt: Date;

  @Column({ type: "timestamptz" })
  deletedAt: Date;
}