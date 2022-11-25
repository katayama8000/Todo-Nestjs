import { Controller, Get } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ContactInfo } from 'src/_tutorial/typeorm/contact-info.entity';
import { Employee } from 'src/_tutorial/typeorm/employee.entity';
import { Meeting } from 'src/_tutorial/typeorm/meeting.entiry';
import { Task } from 'src/_tutorial/typeorm/task.entity';
import { Repository } from 'typeorm';

@Controller('api')
export class ApiController {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    @InjectRepository(ContactInfo)
    private contactInfoRepository: Repository<ContactInfo>,
    @InjectRepository(Meeting) private meetingRepository: Repository<Meeting>,
    @InjectRepository(Task) private taskRepository: Repository<Task>,
  ) {}
  @Get('test1')
  test() {
    return 'test1';
  }

  @Get('test2')
  async test2() {
    console.log('test2');
    // Employee1 ceo
    const ceo = this.employeeRepository.create({ name: 'Mr.CEO' });
    await this.employeeRepository.save(ceo);
    const ceoContactInfo = this.contactInfoRepository.create({
      email: 'ceo@gmail.com',
    });
    ceoContactInfo.employee = ceo;
    await this.contactInfoRepository.save(ceoContactInfo);

    // Employee2 manager(Me)
    const manager = this.employeeRepository.create({
      name: 'Marius',
      manager: ceo,
    });

    const task1 = this.taskRepository.create({ name: 'Hire People' });
    await this.taskRepository.save(task1);
    const task2 = this.taskRepository.create({ name: 'Fire People' });
    await this.taskRepository.save(task2);

    manager.tasks = [task1, task2];

    const meeting1 = this.meetingRepository.create({
      zoomurl: 'https://zoom.us/j/1234567890',
    });
    meeting1.atenndees = [ceo];
    await this.meetingRepository.save(meeting1);

    await this.employeeRepository.save(manager);
  }

  @Get('test3')
  async getEmployeeById() {
    console.log('test3');
    // const id = 5;
    const employee = await this.employeeRepository.findOne({
      where: { id: 6 },
      relations: {
        manager: true,
        directReports: true,
        tasks: true,
        contactInfo: true,
        meetings: true,
      },
    });
    console.log(employee);
  }

  @Get('test4')
  async deleteEmployee() {
    console.log('test4');
    return this.employeeRepository.delete(6);
  }
}
