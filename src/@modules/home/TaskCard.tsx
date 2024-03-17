import { CalendarOutlined, DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { TId } from '@base/interfaces';
import { messages } from '@lib/constant';
import { ITask } from '@lib/interfaces/tasks.interface';
import { useAppDispatch } from '@lib/redux/hooks';
import { removeTask, updateTask } from '@lib/redux/tasks/tasksSlice';
import { cn } from '@lib/utils';
import { Badge, Button, Card, Popconfirm, Popover, Tag, message } from 'antd';
import dayjs from 'dayjs';
import React from 'react';

interface IProps {
  isArchive?: boolean;
  task: ITask;
  setViewTask: (task: Partial<ITask>) => void;
  setTask: (task: ITask) => void;
}

const status = [
  {
    label: 'Todo',
    value: 'todo',
  },
  {
    label: 'Progress',
    value: 'progress',
  },
  {
    label: 'Done',
    value: 'done',
  },
  {
    label: 'Archive',
    value: 'archive',
  },
];

const TaskCard: React.FC<IProps> = ({ isArchive = false, task, setViewTask, setTask }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  const updateFn = (id: TId, status: string) => {
    dispatch(updateTask({ id, task: { status } }));
    messageApi.success(messages.task.update);
  };

  const deleteFn = (id: TId) => {
    dispatch(removeTask(id));
    messageApi.success(messages.task.remove);
  };

  return (
    <React.Fragment>
      {messageHolder}
      <Badge.Ribbon
        className={cn({
          'bg-[var(--color-green-600)]': task?.priority === 'low',
          'bg-[var(--color-warning-600)]': task?.priority === 'medium',
          'bg-[var(--color-red-600)]': task?.priority === 'high',
        })}
        text={task?.priority?.toUpperCase()}
        placement="start"
      >
        <Card
          className={cn('border', {
            'border-[var(--color-green-600)]': task?.priority === 'low',
            'border-[var(--color-warning-600)]': task?.priority === 'medium',
            'border-[var(--color-red-600)]': task?.priority === 'high',
          })}
          // cover={<img alt="" src="/images/home/to_do_list.svg" className="max-h-60" />}
          actions={[
            <EyeOutlined
              key="view"
              onClick={() => setViewTask({ id: task?.id, title: task?.title, description: task?.description })}
            />,
            <EditOutlined key="edit" onClick={isArchive ? null : () => setTask(task)} />,
            <Popconfirm
              key="delete"
              title="Are you sure to delete it?"
              onConfirm={() => deleteFn(task?.id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <DeleteOutlined />
            </Popconfirm>,
            <Popover
              key="ellipsis"
              content={
                isArchive ? null : (
                  <div className="flex flex-col gap-2">
                    {status?.map((elem, idx) => {
                      if (elem?.value === task?.status) return;

                      return (
                        <Button key={idx} type="text" onClick={() => updateFn(task?.id, elem?.value)}>
                          {elem?.label}
                        </Button>
                      );
                    })}
                  </div>
                )
              }
            >
              <EllipsisOutlined />
            </Popover>,
          ]}
        >
          <div className="flex justify-end mb-4">
            {isArchive || (
              <div className="flex items-center gap-2">
                <Popover content={<p>Due: {dayjs(task?.due_date)?.format('DD-MM-YYYY')}</p>}>
                  <CalendarOutlined className="text-gray-500 cursor-pointer" />
                </Popover>
                <Tag>{task?.status?.toUpperCase()}</Tag>
              </div>
            )}
          </div>
          <Card.Meta title={task?.title} description={task?.description} />
        </Card>
      </Badge.Ribbon>
    </React.Fragment>
  );
};

export default TaskCard;
