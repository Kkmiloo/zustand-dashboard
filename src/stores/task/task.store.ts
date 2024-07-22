import { create, StateCreator } from 'zustand';
import { Task } from '../../interfaces';
import { TaskStatus } from '../../interfaces/task.interface';
import { devtools, persist } from 'zustand/middleware';
import { v4 as uuidv4 } from 'uuid';

import { immer } from 'zustand/middleware/immer';
import { customSessionStorage } from '../storages/session-storage.store';

interface TaskState {
  tasks: Record<string, Task>;
  draggingTaskId?: string;

  getTaskByStatus: (status: TaskStatus) => Task[];
  addTask: (title: string, status: TaskStatus) => void;

  setDraggingTaskId: (id: string) => void;

  removeDraggingTaskId: () => void;

  changeTaskStatus: (taskId: string, taskStatus: TaskStatus) => void;

  onTaskDrop: (status: TaskStatus) => void;

  getTotalTasks: () => number;
}

export const storeApi: StateCreator<TaskState, [['zustand/immer', never]]> = (
  set,
  get
) => ({
  tasks: {
    abc2: { id: 'abc2', status: 'open', title: 'Task 2 ' },
    abc3: { id: 'abc3', status: 'in-progress', title: 'Task 3 ' },
    abc4: { id: 'abc4', status: 'open', title: 'Task 4 ' },
  },
  draggingTaskId: undefined,

  getTaskByStatus: (status: TaskStatus) =>
    Object.values(get().tasks).filter((task) => task.status === status),

  addTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), status, title };

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },

  setDraggingTaskId: (id: string) => set({ draggingTaskId: id }),

  removeDraggingTaskId: () => set({ draggingTaskId: undefined }),

  changeTaskStatus: (taskId: string, taskStatus: TaskStatus) => {
    set((state) => {
      state.tasks[taskId] = {
        ...state.tasks[taskId],
        status: taskStatus,
      };
    });

    // set(
    //   produce((state: TaskState) => {
    //     state.tasks[taskId] = task;
    //   })
    // );
    //set((state) => ({ tasks: { ...state.tasks, [taskId]: task } }));
  },

  onTaskDrop: (status: TaskStatus) => {
    const taskId = get().draggingTaskId!;
    get().changeTaskStatus(taskId, status);
    get().removeDraggingTaskId();
  },

  getTotalTasks: () => {
    return Object.keys(get().tasks).length;
  },
});

export const useTaskStore = create<TaskState>()(
  devtools(
    persist(immer(storeApi), {
      name: 'task-storage',
      storage: customSessionStorage,
    })
  )
);
