import { Observable } from 'rxjs';

export type Task = {
  id: string;
  title: string;
  isActive: boolean;
  isDone: boolean;
};

export interface TasksState {
  tasks: Array<Task>;
}

export interface ITasksService {
  addTask: (taskTitle: Task['title']) => void;
  removeTask: (taskId: Task['id']) => void;
  getTasksState: () => Observable<TasksState>;
  addExmapleData: () => void;
  setTaskTitle: (taskId: Task['id'], taskTitle: Task['title']) => void;
  setTaskIsDone: (taskId: Task['id'], value: Task['isDone']) => void;
  setTaskIsActive: (taskId: Task['id'], value: Task['isActive']) => void;
  resetAllTasksIsActive: () => void;
  resetAllTasksIsDone: () => void;
  clearAllTasks: () => void;
}
