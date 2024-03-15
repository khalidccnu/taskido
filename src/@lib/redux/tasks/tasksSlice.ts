import { TId } from '@base/interfaces';
import { ITask } from '@lib/interfaces/tasks.interface';
import { $$, storage } from '@lib/utils';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ITaskModification {
  id?: TId;
  task?: ITask;
}

interface IState {
  tasks: ITask[];
}

const getTasks = storage.getData('tasks');

const initialState: IState = {
  tasks: getTasks ? JSON.parse(getTasks) : [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: (state, action) => {
      action.payload.id = $$.generateKey(8, 'lower');
      action.payload.status = 'todo';

      state.tasks.push(action.payload);
      storage.setData('tasks', JSON.stringify(state.tasks));
    },
    updateTask: (state, action: PayloadAction<ITaskModification>) => {
      const itemIdx = state.tasks.findIndex((item) => item.id === action.payload.id);

      state.tasks[itemIdx] = { ...state.tasks[itemIdx], ...action.payload.task };
      storage.setData('tasks', JSON.stringify(state.tasks));
    },
    removeTask: (state, action: PayloadAction<ITaskModification>) => {
      const itemIdx = state.tasks.findIndex((item) => item.id === action.payload.id);

      state.tasks.splice(itemIdx, 1);
      storage.setData('tasks', JSON.stringify(state.tasks));
    },
  },
});

export const { addTask, updateTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
