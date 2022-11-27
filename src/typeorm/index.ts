import { User } from './User';
import { Todo } from './Todo';
import { ContactInfo } from 'src/_tutorial/typeorm/contact-info.entity';
import { Employee } from 'src/_tutorial/typeorm/employee.entity';
import { Meeting } from 'src/_tutorial/typeorm/meeting.entiry';
import { Task } from 'src/_tutorial/typeorm/task.entity';
export { User, Todo };

const entities = [User, Todo, ContactInfo, Employee, Meeting, Task];
export default entities;
