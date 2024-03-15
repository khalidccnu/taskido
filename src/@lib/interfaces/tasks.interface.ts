import { TId } from '@base/interfaces';
import { Dayjs } from 'dayjs';

export interface ITask {
  id: TId;
  title: string;
  description: string;
  due_date: Dayjs;
  priority: string;
  status: string;
}

export interface ITaskCreate {
  title: string;
  description: string;
  due_date: Dayjs;
  priority: string;
  status: string;
}

export interface ITaskUpdate {
  id: TId;
  task: Partial<ITaskCreate>;
}
