import { TaskRepository } from './task.repository';
import { FilterTaskDto } from './dto/filter-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';
import { User } from 'src/auth/user.entity';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskRepository)
    private taskRepository: TaskRepository,
  ) {}

  async getAllTasks(filterTaskDto: FilterTaskDto, user:User):Promise<Task[]> {
    return this.taskRepository.getAllTasks(filterTaskDto,user);
  }

  async getTaskByID(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne(id);
    if (!task) {
      throw new NotFoundException(`task with id : ${id} not found`);
    }

    return task;
  }

  async createTask(createTaskDto: CreateTaskDto,user: User): Promise<Task> {
    return this.taskRepository.createTask(createTaskDto,user);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskByID(id);
    task.status = status;
    task.save();
    return task;
  }

  async deleteTask(id: number): Promise<Boolean> {
    const result = await this.taskRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`task with id : ${id} not found`);
    }

    return true;
  }
}
