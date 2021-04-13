import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from './../task.model';
export class FilterTaskDto{
    @IsOptional()
    @IsIn([Object.values(TaskStatus)])
    status: TaskStatus;

    @IsOptional()
    @IsNotEmpty()
    filterText: string;
}