import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import entities from './typeorm';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { TodoModule } from './todo/todo.module';
import { ContactInfo } from './_tutorial/typeorm/contact-info.entity';
import { Employee } from './_tutorial/typeorm/employee.entity';
import { Meeting } from './_tutorial/typeorm/meeting.entiry';
import { Task } from './_tutorial/typeorm/task.entity';
import { ApiModule } from './_tutorial/api/api/api.module';

@Module({
  imports: [
    UsersModule,
    AuthModule,
    TodoModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '109609Akg',
      database: 'todo_db',
      entities: entities,
      synchronize: true,
      logging: true, // SQLログ
    }),
    ApiModule,
    //TypeOrmModule.forFeature([ContactInfo, Employee, Meeting, Task]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
