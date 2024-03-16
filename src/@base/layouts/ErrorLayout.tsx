import { HomeOutlined } from '@ant-design/icons';
import { paths } from '@lib/constant';
import { Button, Result } from 'antd';
import { ResultStatusType } from 'antd/es/result';
import { useNavigate, useRouteError } from 'react-router-dom';

interface IRouteError {
  status?: ResultStatusType;
  statusText?: string;
}

const ErrorLayout = () => {
  const { status, statusText }: IRouteError = useRouteError();
  const navigate = useNavigate();

  return (
    <Result
      status={status}
      title={status}
      subTitle={
        <div>
          <span>{statusText}</span>
          <p>An error has occurred!</p>
        </div>
      }
      extra={
        <Button icon={<HomeOutlined />} type="primary" onClick={() => navigate(paths.root, { replace: true })}>
          Back to Home
        </Button>
      }
    />
  );
};

export default ErrorLayout;
