import type { Task } from "@/types/task.types";

import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CircleCheck,
  CircleDashed,
  Clock,
  Dot,
  SquarePen,
  Trash,
} from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useTask } from "@/providers/TaskProvider";
import { useNavigate } from "react-router";
import { BASE_URL, priorityColors, statusStyles } from "@/lib/constants";
import { TaskDetailDialog } from "./TaskDetails";
import { toast } from "sonner";

const cardStyles = {
  todo: "border-l-blue-500 bg-blue-50/30 dark:bg-blue-900/10",
  "in-progress": "border-l-purple-500 bg-purple-50/30 dark:bg-purple-900/10",
  completed: "border-l-green-500 bg-green-50/30 dark:bg-green-900/10",
};

const TaskCard = ({ task }: { task: Task }) => {
  const { setTaskState } = useTask();
  const navigate = useNavigate();

  const handleStatusChange = () => {
    const newStatus =
      task.status === "todo"
        ? "in-progress"
        : task.status === "in-progress"
        ? "completed"
        : "todo";

    setTaskState({
      type: "UPDATE_TASK",
      id: task.id,
      task: { status: newStatus },
    });
  };

  const handlePriorityChange = () => {
    const newPriority =
      task.priority === "low"
        ? "medium"
        : task.priority === "medium"
        ? "high"
        : "low";

    setTaskState({
      type: "UPDATE_TASK",
      id: task.id,
      task: { priority: newPriority },
    });
  };

  const handleTaskDelete = async () => {
    try {
      const response = await fetch(`${BASE_URL}/tasks/${task.id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await response.json();

      toast(data.message);

      if (response.ok) setTaskState({ type: "DELETE_TASK", id: task.id });
    } catch (error) {
      console.log(error);
      toast("Failed to task...");
    }
  };

  return (
    <Card
      className={cn(
        "shadow-xl w-full max-w-xl border-l-4 rounded-xl gap-3 py-3",
        cardStyles[task.status]
      )}
    >
      <CardHeader className="py-1 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePriorityChange}
            className={cn(
              "text-xs rounded-2xl cursor-pointer border py-1 px-3 font-semibold capitalize",
              priorityColors[task.priority]
            )}
          >
            {task.priority}
          </button>
          <button
            type="button"
            onClick={handleStatusChange}
            className={cn(
              "flex items-center cursor-pointer text-xs font-semibold rounded-2xl pr-3",
              statusStyles[task.status]
            )}
          >
            <span>
              <Dot className="stroke-[6]" />{" "}
            </span>
            {task.status === "todo"
              ? "To Do"
              : task.status === "in-progress"
              ? "In Progress"
              : "Completed"}
          </button>
        </div>
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={handleTaskDelete}
        >
          <Trash className="size-4" />
        </Button>
      </CardHeader>
      <CardContent
        className={cn(
          "px-4",
          cardStyles[task.status],
          task.status === "completed" && "opacity-50"
        )}
      >
        <div className="py-3 space-y-1">
          <h2
            className={`font-semibold ${
              task.status === "completed" && "line-through"
            }`}
          >
            {task.title}
          </h2>

          {task.description && (
            <p className="text-xs text-muted-foreground line-clamp-1">
              {task.description}
            </p>
          )}
        </div>
      </CardContent>
      <CardFooter className="px-4 flex justify-between">
        <div className="flex items-center gap-x-2 text-muted-foreground">
          {
            <>
              <span>
                <Clock size={14} />
              </span>
              <span className="text-xs">{format(task.dueDate, "PPP")}</span>
            </>
          }
        </div>

        <div className="space-x-2">
          <TaskDetailDialog task={task} />
          <Button
            variant="ghost"
            size="sm"
            className="cursor-pointer"
            onClick={() => {
              navigate(`/dashboard/edit-task/${task.id}`);
              setTaskState({ type: "EDIT", editTask: task });
            }}
          >
            <SquarePen size={16} />
          </Button>
          <Button
            onClick={handleStatusChange}
            variant="ghost"
            size="sm"
            className="cursor-pointer"
          >
            {task.status === "todo" ? (
              <CircleDashed size={16} />
            ) : task.status === "in-progress" ? (
              <CircleCheck size={16} />
            ) : (
              <Clock size={16} />
            )}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskCard;
