import type { RouteObject } from "react-router";
import HomePage from "@/pages/HomePage";
import RootLayout from "@/layouts/RootLayout";
import Dashboard from "@/pages/Dashboard";
import Tasks from "@/pages/Tasks";
import Task from "@/pages/Task";
import RegisterForm from "@/pages/Auth/RegisterForm";
import LoginForm from "@/pages/Auth/LoginForm";
import ProtectedRoute from "./ProtectedRoute";

export const routes: RouteObject[] = [
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: HomePage,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            Component: Tasks,
          },
          {
            path: "add-task",
            element: <Task edit={false} />,
          },
          {
            path: "edit-task/:taskId",
            element: <Task edit={true} />,
          },
        ],
      },
      {
        path: "register",
        Component: RegisterForm,
      },
      {
        path: "login",
        Component: LoginForm,
      },
    ],
  },
];
