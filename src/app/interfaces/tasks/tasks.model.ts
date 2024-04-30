import { Observable } from 'rxjs';

export type Task = {
  id: string;
  title: string;
  isActive: boolean;
  isDone: boolean;
};

export interface TasksState {
  isAllTasksDone: boolean;
  tasks: Array<Task>;
}

export interface ITasksService {
  getTasksState: () => Observable<TasksState>;
  addTask: (taskTitle: Task['title']) => void;
  removeTask: (taskId: Task['id']) => void;
  addExmapleData: () => void;
  setIsAllTasksDone: (done: TasksState['isAllTasksDone']) => void;
  setTaskTitle: (taskId: Task['id'], taskTitle: Task['title']) => void;
  setTaskIsDone: (taskId: Task['id'], value: Task['isDone']) => void;
  setTaskIsActive: (taskId: Task['id'], value: Task['isActive']) => void;
  resetAllTasksIsActive: () => void;
  resetAllTasksIsDone: () => void;
  clearAllTasks: () => void;
}
