import { mockTasks } from './../mockData/mockData';
import { FilterTaskDto } from './dto/filter-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import { v1 as uuid } from 'uuid';


@Injectable()
export class TaskService {
  private tasks: Task[] = mockTasks;

  getAllTask(): Task[] {
    return this.tasks;
  }

  getTasksWithFilters(filterTaskDto: FilterTaskDto): Task[] {
    let tasks: Task[] = this.tasks;
    const { status, filterText } = filterTaskDto;

    if (status) {
      tasks = tasks.filter((task) => task.status === status);
    }

    if (filterText) {
      tasks = tasks.filter(
        (task) =>
          task.title.includes(filterText) ||
          task.description.includes(filterText),
      );
    }

    return tasks;
  }

  getTaskById(id: string): Task {
    const result = this.tasks.find((task) => task.id === id);

    if(!result){
      throw new NotFoundException(`task with id: ${id} not found`);
    }

    return result;
  }

  createTask(createtaskDto: CreateTaskDto): Task {
    const { title, description } = createtaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };
    this.tasks.push(task);
    return task;
  }

  updateTaskStatus(
    id: string,
    status: TaskStatus,
  ): Task {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`task with id: ${id} not found`);
    }
    this.tasks[index].status = status;
    return this.tasks[index];
  }

  deleteTask(id: string): boolean {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new NotFoundException(`task with id: ${id} not found`);
    }
    this.tasks.splice(index, 1);
    return true;
  }
}
