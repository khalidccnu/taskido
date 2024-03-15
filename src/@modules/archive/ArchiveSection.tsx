import { paths } from '@lib/constant';
import { ITask } from '@lib/interfaces/tasks.interface';
import { useAppSelector } from '@lib/redux/hooks';
import { cn } from '@lib/utils';
import TasksList from '@modules/home/TasksList';
import { Button, Empty, Spin } from 'antd';
import { ClassValue } from 'clsx';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface IProps {
  className?: ClassValue;
}

const ArchiveSection: React.FC<IProps> = ({ className }) => {
  const navigate = useNavigate();
  const [isLoading, setLoading] = useState(true);
  const [purifiedTasks, setPurifiedTasks] = useState<ITask[]>([]);
  const { tasks } = useAppSelector((store) => store.tasksSlice);

  useEffect(() => {
    const arr = tasks?.filter((task) => task?.status === 'archive');

    setPurifiedTasks(arr);
    setLoading(false);
  }, [tasks]);

  return (
    <section className={cn('archive_section', className)}>
      <div className="container">
        <div className="flex justify-end mb-5">
          <Button onClick={() => navigate(paths.root)}>Home</Button>
        </div>
        {isLoading ? (
          <Spin size="large" className="!spinner" />
        ) : purifiedTasks?.length ? (
          <TasksList isArchive tasks={purifiedTasks} />
        ) : (
          <Empty description="No Archive Task Available!" />
        )}
      </div>
    </section>
  );
};

export default ArchiveSection;
