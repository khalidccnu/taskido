import { cn } from '@lib/utils';
import { ClassValue } from 'clsx';
import React from 'react';
import TaskCard from './TaskCard';

interface IProps {
  className?: ClassValue;
}

const TasksSection: React.FC<IProps> = ({ className }) => {
  return (
    <section className={cn('tasks_section', className)}>
      <div className="container">
        <div className="wrapper">{[...Array(8)]?.map((_, idx) => <TaskCard key={idx} />)}</div>
      </div>
    </section>
  );
};

export default TasksSection;
