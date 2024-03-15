import LandingLayout from '@base/layouts/LandingLayout';
import { Providers } from '@lib/context';
import TasksSection from '@modules/home/TasksSection';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <LandingLayout />,
      errorElement: <></>,
      children: [
        {
          index: true,
          element: <TasksSection className="py-10" />,
        },
      ],
    },
  ]);

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
