import { DeleteOutlined, EditOutlined, EllipsisOutlined, EyeOutlined } from '@ant-design/icons';
import { ITask } from '@lib/interfaces/tasks.interface';
import { useAppDispatch } from '@lib/redux/hooks';
import { removeTask } from '@lib/redux/tasks/tasksSlice';
import { Card, Popconfirm } from 'antd';

interface IProps {
  task: ITask;
  setTask: (task: ITask) => void;
}

const TaskCard: React.FC<IProps> = ({ task, setTask }) => {
  const dispatch = useAppDispatch();

  return (
    <Card
      cover={<img alt="" src="/images/home/to_do_list.svg" className="max-h-60" />}
      actions={[
        <EyeOutlined key="view" />,
        <EditOutlined key="edit" onClick={() => setTask(task)} />,
        <Popconfirm
          key="delete"
          title="Are you sure to delete it?"
          onConfirm={() => dispatch(removeTask({ id: task?.id }))}
          okText="Yes"
          cancelText="No"
          okButtonProps={{ danger: true }}
        >
          <DeleteOutlined />
        </Popconfirm>,
        <EllipsisOutlined key="ellipsis" />,
      ]}
    >
      <Card.Meta title={task?.title} description={task?.description} />
    </Card>
  );
};

export default TaskCard;
