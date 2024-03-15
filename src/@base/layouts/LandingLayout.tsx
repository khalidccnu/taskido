import Header from '@base/components/Header';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';

const LandingLayout = () => {
  const styles = {
    content: {
      minHeight: 120,
      backgroundColor: 'var(--color-gray-25)',
    },
    footer: {
      textAlign: 'center',
      color: 'var(--color-white)',
      backgroundColor: 'var(--color-primary-alter)',
    },
  };

  return (
    <Layout>
      <Header />
      <Layout.Content style={styles.content as any}>
        <Outlet />
      </Layout.Content>
      <Layout.Footer style={styles.footer as any}>
        <p>Copyright &copy; 2024 Taskido. All rights reserved.</p>
      </Layout.Footer>
    </Layout>
  );
};

export default LandingLayout;
