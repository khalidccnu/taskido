import { PlusOutlined } from '@ant-design/icons';
import { messages } from '@lib/constant';
import { useAppDispatch } from '@lib/redux/hooks';
import { addTask } from '@lib/redux/tasks/tasksSlice';
import { cn } from '@lib/utils';
import { FloatButton, Form, Modal, message } from 'antd';
import { ClassValue } from 'clsx';
import React, { useState } from 'react';
import TaskForm from './TaskForm';
import TasksList from './TasksList';

interface IProps {
  className?: ClassValue;
}

const TasksSection: React.FC<IProps> = ({ className }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  return (
    <section className={cn('tasks_section', className)}>
      {messageHolder}
      <div className="container">
        <TasksList />
      </div>
      <FloatButton icon={<PlusOutlined />} tooltip={<p>New Task</p>} onClick={() => setDrawerOpen(true)} />
      <Modal width={420} open={isDrawerOpen} onCancel={() => setDrawerOpen(false)} footer={null}>
        <TaskForm
          form={formInstance}
          loading={false}
          onFinish={(values) => {
            dispatch(addTask(values));
            setDrawerOpen(false);
            formInstance.resetFields();
            messageApi.success(messages.task.add);
          }}
        />
      </Modal>
    </section>
  );
};

export default TasksSection;
