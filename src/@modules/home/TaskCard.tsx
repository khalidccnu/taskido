import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { messages } from '@lib/constant';
import { ITask } from '@lib/interfaces/tasks.interface';
import { useAppDispatch } from '@lib/redux/hooks';
import { removeTask, updateTask } from '@lib/redux/tasks/tasksSlice';
import { Button, Card, Popconfirm, Popover, message } from 'antd';
import React from 'react';

interface IProps {
  task: ITask;
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

const TaskCard: React.FC<IProps> = ({ task, setTask }) => {
  const [messageApi, messageHolder] = message.useMessage();
  const dispatch = useAppDispatch();

  return (
    <React.Fragment>
      {messageHolder}
      <Card
        cover={<img alt="" src="/images/home/to_do_list.svg" className="max-h-60" />}
        actions={[
          <EyeOutlined key="view" />,
          <EditOutlined key="edit" onClick={() => setTask(task)} />,
          <Popconfirm
            key="delete"
            title="Are you sure to delete it?"
            onConfirm={() => dispatch(removeTask(task?.id))}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <DeleteOutlined />
          </Popconfirm>,
          <Popover
            key="ellipsis"
            content={
              <div className="flex flex-col gap-2">
                {status?.map((elem, idx) => {
                  if (elem?.value === task?.status) return;

                  return (
                    <Button
                      key={idx}
                      type="text"
                      onClick={() => {
                        dispatch(updateTask({ id: task?.id, task: { status: elem?.value } }));
                        messageApi.success(messages.task.update);
                      }}
                    >
                      {elem?.label}
                    </Button>
                  );
                })}
              </div>
            }
          >
            <EllipsisOutlined />
          </Popover>,
        ]}
      >
        <Card.Meta title={task?.title} description={task?.description} />
      </Card>
    </React.Fragment>
  );
};

export default TaskCard;
