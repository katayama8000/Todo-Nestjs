import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './User';

@Entity({ name: 'todos' })
export class Todo {
  @PrimaryGeneratedColumn({ type: 'bigint', name: 'todo_id' })
  id: number;

  @Column({
    nullable: false,
    default: '',
  })
  title: string;

  @Column({
    nullable: false,
    default: '',
  })
  description: string;

  @Column({
    nullable: false,
    default: false,
  })
  completed: boolean;

  // userとの関連付け
  @ManyToOne(() => User, (user) => user.todos)
  @JoinColumn({ name: 'user_id' })
  user: User;
}
