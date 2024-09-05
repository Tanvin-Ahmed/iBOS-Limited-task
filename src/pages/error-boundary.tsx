import { useRouteError, isRouteErrorResponse } from "react-router-dom";

const ErrorBoundary = () => {
  const error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (
      <div
        style={{ height: "100vh" }}
        className="w-full min-h-screen flex flex-col justify-center items-center"
      >
        <h1 className="text-4xl">Oops!</h1>
        <h2>{error.status}</h2>
        <p>{error.statusText}</p>
        {error.data?.message && <p>{error.data.message}</p>}
      </div>
    );
  } else {
    return (
      <div
        style={{ height: "100vh" }}
        className="w-full min-h-screen flex flex-col items-center justify-center"
      >
        <h1 className="text-4xl">Oops!</h1>
        <p>{(error as Error).message}</p>
      </div>
    );
  }
};

export default ErrorBoundary;
