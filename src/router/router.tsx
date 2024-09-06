import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorBoundary from "@/pages/error-boundary";
import { ComponentType, lazy, ReactNode, Suspense } from "react";
import useLoader from "@/hooks/use-loader";
import AuthPage from "@/pages/auth";
import PrivateRoute from "./private-route";
import Navbar from "@/components/custom/shared/navbar";
import Footer from "@/components/custom/shared/footer";

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
            <Loader width="60" height="60" />
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
const StorePage = Loadable(lazy(() => import("@/pages/store")));

const SecurePage = ({ children }: { children: ReactNode }) => {
  return (
    <PrivateRoute>
      <Navbar />
      {children}
      <Footer />
    </PrivateRoute>
  );
};

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
        {
          path: "/store",
          element: (
            <SecurePage>
              <StorePage />
            </SecurePage>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
