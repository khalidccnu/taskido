import { DeleteOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Card } from 'antd';

const TaskCard = () => {
  return (
    <Card
      cover={<img alt="" src="/images/home/to_do_list.svg" className="max-h-60" />}
      actions={[<DeleteOutlined key="delete" />, <EditOutlined key="edit" />, <EllipsisOutlined key="ellipsis" />]}
    >
      <Card.Meta title="Task Title" description="Task Description" />
    </Card>
  );
};

export default TaskCard;
