import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ContactInfo } from './contact-info.entity';
import { Meeting } from './meeting.entiry';
import { Task } from './task.entity';

@Entity()
export class Employee {
  [x: string]: any;
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Employee, (employee) => employee.directReports, {
    onDelete: 'SET NULL',
  })
  manager: Employee;

  @OneToMany(() => Employee, (employee) => employee.manager)
  directReports: Employee[];

  @OneToOne(() => ContactInfo, (contactInfo) => contactInfo.employee)
  contactInfo: ContactInfo;

  @OneToMany(() => Task, (task) => task.employee)
  tasks: Task[];

  @ManyToMany(() => Meeting, (meeting) => meeting.atenndees)
  @JoinTable()
  meetings: Meeting[];
}
