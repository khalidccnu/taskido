import { BorderRightOutlined } from '@ant-design/icons';
import { messages } from '@lib/constant';
import { ITask } from '@lib/interfaces/tasks.interface';
import { useAppDispatch } from '@lib/redux/hooks';
import { updateTask } from '@lib/redux/tasks/tasksSlice';
import { Form, Modal, message } from 'antd';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './TaskForm';

interface IProps {
  isArchive?: boolean;
  tasks: ITask[];
}

const TasksList: React.FC<IProps> = ({ isArchive = false, tasks }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const dispatch = useAppDispatch();
  const [viewTask, setViewTask] = useState<Partial<ITask>>(null);
  const [task, setTask] = useState<ITask>(null);

  return (
    <div className="tasks_list">
      {messageHolder}
      <div className="wrapper">
        {tasks?.map((task) => (
          <TaskCard
            key={task?.id}
            isArchive={isArchive}
            task={task}
            setViewTask={(task) => setViewTask(task)}
            setTask={(task) => setTask(task)}
          />
        ))}
      </div>
      <Modal width={420} open={!!viewTask?.id} onCancel={() => setViewTask(null)} footer={null}>
        <div className="flex flex-col gap-2 mt-8">
          <h3 className="space-x-1.5 text-lg font-semibold title">
            <BorderRightOutlined />
            <span>{viewTask?.title}</span>
          </h3>
          {viewTask?.description && <p className="description">{viewTask?.description}</p>}
        </div>
      </Modal>
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
    </div>
  );
};

export default TasksList;
