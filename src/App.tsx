import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LandingLayout from "./@base/layouts/LandingLayout";
import { Providers } from "./@lib/context";

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

  return (
    <Providers>
      <RouterProvider router={router} />
    </Providers>
  );
};

export default App;
