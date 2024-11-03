import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import CreateNotePage from "../pages/CreateNotePage";
import EditNotePage from "../pages/EditNotePage";
import NoteDetailPage from "../pages/NoteDetailPage";
import PrivateRoute from "../components/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <HomePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignUpPage />,
  },
  {
    path: "/create",
    element: (
      <PrivateRoute>
        <CreateNotePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/edit/:noteId",
    element: (
      <PrivateRoute>
        <EditNotePage />
      </PrivateRoute>
    ),
  },
  {
    path: "/notes/:noteId",
    element: (
      <PrivateRoute>
        <NoteDetailPage />
      </PrivateRoute>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
