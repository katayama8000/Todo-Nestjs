import {
  Column,
  Entity,
  JoinColumn,
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

  @Column('bool')
  completed: boolean;

  // userとの関連付け
  // cascadeを設定
  @ManyToOne(() => User, (user) => user.todos, { onDelete: 'CASCADE' })
  user: User;
  //   () => User,
  //   (user) => user.todos,
  //   { nullable: true },
  //   { cascade: true },
  // )
  // @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  // user: User;
}
