import { useEffect } from "react";

import { useTask } from "@/providers/TaskProvider";

import Sidebar from "@/components/dashboard/Sidebar";
import { Outlet } from "react-router";
import { BASE_URL } from "@/lib/constants";
import type { Task } from "@/types/task.types";

const Dashboard = () => {
  const { setTaskState } = useTask();

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await fetch(`${BASE_URL}/tasks`, {
          method: "GET",
          credentials: "include",
        });
        const data = await response.json();

        if (response.ok) {
          setTaskState({ type: "ADD_TASK", tasks: data.data as Task[] });
        }
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();

    return () => setTaskState({ type: "REMOVE_ALL" });
  }, [setTaskState]);

  return (
    <div className="h-full w-full flex">
      <div className="h-full hidden md:block">
        <Sidebar />
      </div>
      <main className="flex-1 p-4 sm:p-6 h-full flex flex-col">
        <Outlet />
      </main>
    </div>
  );
};

export default Dashboard;
