import { TaskStatus } from "../task/task-status.enum";

export const mockTasks = [
  {
    id: 'eaf1a1e0-9abe-11eb-9b4a-e34daa97f41e',
    title: 'Stops query Ticket',
    description: 'complete the performace ticket of stops query ',
    status: TaskStatus.OPEN,
  },
  {
    id: '08744240-9abf-11eb-9b4a-e34daa97f41e',
    title: 'nest js',
    description: 'complete the nest js course ',
    status: TaskStatus.OPEN,
  },
  {
    id: '2be8a4f0-9abf-11eb-9b4a-e34daa97f41e',
    title: 'Task 1',
    description: 'Demo task description',
    status: TaskStatus.IN_PROGRESS,
  },
  {
    id: '45c6a750-9abf-11eb-9b4a-e34daa97f41e',
    title: 'Task 2',
    description: 'Demo task description which is done',
    status: TaskStatus.DONE,
  },
];
