import { PlusOutlined } from '@ant-design/icons';
import BaseFilter from '@base/components/BaseFilter';
import { messages } from '@lib/constant';
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks';
import { addTask } from '@lib/redux/tasks/tasksSlice';
import { $$, cn } from '@lib/utils';
import { Empty, FloatButton, Form, Modal, Spin, message } from 'antd';
import { ClassValue } from 'clsx';
import qs from 'query-string';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TaskForm from './TaskForm';
import TasksList from './TasksList';

interface IProps {
  className?: ClassValue;
}

const TasksSection: React.FC<IProps> = ({ className }) => {
  const location = useLocation();
  const [isLoading, setLoading] = useState(true);
  const [purifiedTasks, setPurifiedTasks] = useState([]);
  const { tasks } = useAppSelector((store) => store.tasksSlice);
  const [messageApi, messageHolder] = message.useMessage();
  const [formInstance] = Form.useForm();
  const dispatch = useAppDispatch();
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const { priority, sort } = qs.parse(location.search);
    let arr = tasks;

    if (priority) arr = tasks?.filter((task) => task?.priority === priority);
    if (sort && (sort === 'ASC' || sort === 'DESC')) arr = $$.sort([...arr], 'due_date', sort);

    setPurifiedTasks(arr);
    setLoading(false);
  }, [tasks, location.search]);

  return (
    <section className={cn('tasks_section', className)}>
      {messageHolder}
      <BaseFilter className="mb-5" />
      <div className="container">
        {isLoading ? (
          <Spin size="large" className="!spinner" />
        ) : purifiedTasks?.length ? (
          <TasksList tasks={purifiedTasks} />
        ) : (
          <Empty description="No Task Available" />
        )}
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
