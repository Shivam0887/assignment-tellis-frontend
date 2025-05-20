import TaskCard from "@/components/dashboard/TaskCard";
import { useState } from "react";
import type { TaskStatus } from "@/types/task.types";
import { useTask } from "@/providers/TaskProvider";
import { BASE_URL } from "@/lib/constants";
import { toast } from "sonner";

const KanbanBoard = () => {
  const { setTaskState, taskState } = useTask();
  const [draggingTaskId, setDraggingTaskId] = useState<string | null>(null);

  const handleDragStart = (taskId: string) => {
    setDraggingTaskId(taskId);
  };

  const handleDrop = async (status: TaskStatus) => {
    if (draggingTaskId) {
      try {
        await fetch(`${BASE_URL}/tasks/${draggingTaskId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status }),
        });

        setTaskState({
          type: "UPDATE_TASK",
          id: draggingTaskId,
          task: { status },
        });
        setDraggingTaskId(null);
      } catch (error: unknown) {
        console.log("Task update error:", error);
        toast("Task update error");
      }
    }
  };

  const todoTasks = taskState.tasks.filter((task) => task.status === "todo");
  const inProgressTasks = taskState.tasks.filter(
    (task) => task.status === "in-progress"
  );
  const completedTasks = taskState.tasks.filter(
    (task) => task.status === "completed"
  );

  const columnBaseClass =
    "flex-1 min-w-[300px] p-4 rounded-lg h-[calc(100vh-200px)] overflow-auto";

  return (
    <div className="flex gap-4 flex-wrap md:flex-nowrap">
      {/* To Do Column */}
      <div
        className={`${columnBaseClass} bg-blue-50/50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop("todo")}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
            To Do
            <span className="ml-2 text-xs bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-100 rounded-full px-2 py-0.5">
              {todoTasks.length}
            </span>
          </h3>
        </div>

        <div className="space-y-3">
          {todoTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task.id)}
              className="cursor-move"
            >
              <TaskCard task={task} />
            </div>
          ))}
          {todoTasks.length === 0 && (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
              No tasks to do
            </div>
          )}
        </div>
      </div>

      {/* In Progress Column */}
      <div
        className={`${columnBaseClass} bg-purple-50/50 dark:bg-purple-900/10 border border-purple-100 dark:border-purple-900/20`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop("in-progress")}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center">
            <div className="w-3 h-3 rounded-full bg-purple-500 mr-2"></div>
            In Progress
            <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-100 rounded-full px-2 py-0.5">
              {inProgressTasks.length}
            </span>
          </h3>
        </div>

        <div className="space-y-3">
          {inProgressTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task.id)}
              className="cursor-move"
            >
              <TaskCard task={task} />
            </div>
          ))}
          {inProgressTasks.length === 0 && (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
              No tasks in progress
            </div>
          )}
        </div>
      </div>

      {/* Completed Column */}
      <div
        className={`${columnBaseClass} bg-green-50/50 dark:bg-green-900/10 border border-green-100 dark:border-green-900/20`}
        onDragOver={(e) => e.preventDefault()}
        onDrop={() => handleDrop("completed")}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            Completed
            <span className="ml-2 text-xs bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-100 rounded-full px-2 py-0.5">
              {completedTasks.length}
            </span>
          </h3>
        </div>

        <div className="space-y-3">
          {completedTasks.map((task) => (
            <div
              key={task.id}
              draggable
              onDragStart={() => handleDragStart(task.id)}
              className="cursor-move"
            >
              <TaskCard task={task} />
            </div>
          ))}
          {completedTasks.length === 0 && (
            <div className="text-center p-4 text-gray-500 dark:text-gray-400 text-sm border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
              No completed tasks
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
