import { useEffect, useState } from "react";

import TaskProvider from "@/providers/TaskProvider";

import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router";
import { BASE_URL } from "@/lib/constants";
import type { Task } from "@/types/task.types";

const Dashboard = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setTasks(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);

  return (
    <TaskProvider tasks={tasks}>
      <div className="h-full w-full flex">
        <div className="h-full hidden md:block">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 sm:p-6 h-full flex flex-col">
          <Outlet />
        </main>
      </div>
    </TaskProvider>
  );
};

export default Dashboard;
