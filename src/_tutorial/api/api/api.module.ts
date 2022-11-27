import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactInfo } from 'src/_tutorial/typeorm/contact-info.entity';
import { Employee } from 'src/_tutorial/typeorm/employee.entity';
import { Meeting } from 'src/_tutorial/typeorm/meeting.entiry';
import { Task } from 'src/_tutorial/typeorm/task.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ContactInfo, Employee, Meeting, Task])],
  providers: [ApiService],
  controllers: [ApiController],
})
export class ApiModule {}
