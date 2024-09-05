import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/pages/error-boundary";
import { ComponentType, lazy, Suspense } from "react";
import useLoader from "@/hooks/use-loader";
import AuthPage from "@/pages/auth";

type LoadableProps = {
  [key: string]: unknown;
};

const Loadable = <P extends LoadableProps>(Component: ComponentType<P>) => {
  const LoadableComponent = (props: P) => {
    const { Loader } = useLoader();

    return (
      <Suspense
        fallback={
          <div className="w-full h-screen flex justify-center items-center">
            <Loader color="background: #1E99F5" width="60" height="60" />
          </div>
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };

  return LoadableComponent;
};

const App = Loadable(lazy(() => import("../App")));

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorBoundary />,
      children: [
        {
          index: true,
          element: <AuthPage />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
