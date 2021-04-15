import { TaskStatus } from '../task-status.enum';
import { BadRequestException, PipeTransform } from "@nestjs/common";

export class TaskStatusValidationPipe implements PipeTransform{
    
    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROGRESS,
        TaskStatus.IN_PROGRESS
    ];

    transform(value: any){
       value = value.toUpperCase();

       if(!this.allowedStatuses.includes(value)){
           throw new BadRequestException(`${value} is invalid status`);
       }

       return value;
    }
}