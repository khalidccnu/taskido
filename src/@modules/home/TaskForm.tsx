import { ITask, ITaskCreate } from '@lib/interfaces/tasks.interface';
import { Button, Col, DatePicker, Form, FormInstance, Input, Row, Select } from 'antd';
import { useEffect } from 'react';

interface IProps {
  loading: boolean;
  form: FormInstance;
  formType?: 'create' | 'update';
  initialValues?: Partial<ITask>;
  onFinish: (task: ITaskCreate) => void;
}

const taskStatus = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
];

const TaskForm: React.FC<IProps> = ({ loading, form, formType = 'create', initialValues, onFinish }) => {
  useEffect(() => {
    form?.resetFields();
  }, [form, initialValues]);

  return (
    <Form
      size="large"
      layout="vertical"
      form={form}
      initialValues={initialValues}
      onFinish={(values) => onFinish(values)}
    >
      <Row gutter={{ sm: 16, md: 20, lg: 32 }}>
        <Col xs={24}>
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: 'Title is required!',
              },
            ]}
          >
            <Input placeholder="Title" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Description"
            name="description"
            rules={[
              {
                required: true,
                message: 'Description is required!',
              },
            ]}
          >
            <Input.TextArea placeholder="Description" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Due date"
            name="due_date"
            rules={[
              {
                required: true,
                message: 'Due date is required!',
              },
            ]}
          >
            <DatePicker format="DD-MM-YYYY" placeholder="Due Date" className="w-full" />
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item
            label="Priority"
            name="priority"
            rules={[
              {
                required: true,
                message: 'Priority is required!',
              },
            ]}
          >
            <Select
              allowClear
              showSearch
              placeholder="Priority"
              filterOption={(input, option: any) => option?.value?.toLowerCase()?.includes(input?.toLowerCase())}
            >
              {taskStatus?.map((status, idx) => (
                <Select.Option key={idx} title={status?.label} value={status?.value} data={status}>
                  {status?.label}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item className="text-right">
            <Button loading={loading} type="primary" htmlType="submit">
              {formType === 'create' ? 'Submit' : 'Update'}
            </Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default TaskForm;
