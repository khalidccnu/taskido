import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingLayout from "./@base/layouts/LandingLayout";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <LandingLayout />,
      errorElement: <></>,
      children: [
        {
          index: true,
          element: <></>,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
