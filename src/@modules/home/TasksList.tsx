import { messages } from '@lib/constant';
import { ITask } from '@lib/interfaces/tasks.interface';
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks';
import { updateTask } from '@lib/redux/tasks/tasksSlice';
import { Form, Modal, message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

const TasksList = () => {
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const dispatch = useAppDispatch();
  const { tasks } = useAppSelector((store) => store.tasksSlice);
  const [task, setTask] = useState<ITask>(null);

  return (
    <React.Fragment>
      {messageHolder}
      <div className="wrapper">
        {tasks?.map((task) => <TaskCard key={task?.id} task={task} setTask={(task) => setTask(task)} />)}
      </div>
      <Modal width={420} open={!!task?.id} onCancel={() => setTask(null)} footer={null}>
        <TaskForm
          formType="update"
          form={formInstance}
          initialValues={{ ...task, due_date: dayjs(task?.due_date) }}
          loading={false}
          onFinish={(values) => {
            dispatch(updateTask({ id: task?.id, task: values }));
            setTask(null);
            messageApi.success(messages.task.update);
          }}
        />
      </Modal>
    </React.Fragment>
  );
};

export default TasksList;
