import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Root";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
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
