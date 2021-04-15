import { FilterTaskDto } from './dto/filter-task.dto';
import { CreateTaskDto } from './dto/create-task.dto';
import { EntityRepository, Repository } from 'typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './task-status.enum';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getAllTasks(filterTaskDto: FilterTaskDto): Promise<Task[]> {
    const { status, filterText } = filterTaskDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (filterText) {
      query.andWhere(
        '(task.title LIKE :filterText OR task.description LIKE :filterText)',
        { filterText: `%${filterText}%` },
      );
    }

    return await query.getMany();
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;

    await task.save();
    return task;
  }
}
