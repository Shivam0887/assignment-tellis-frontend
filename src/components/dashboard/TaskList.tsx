import { useTask } from "@/providers/TaskProvider";
import TaskCard from "./TaskCard";
import { Button } from "../ui/button";
import { useNavigate } from "react-router";

const TaskList = () => {
  const navigate = useNavigate();
  const { taskState } = useTask();

  const tasks =
    taskState.activeTab === "all"
      ? taskState.tasks
      : taskState.tasks.filter(({ status }) => status === taskState.activeTab);

  return (
    <div className="w-full h-full">
      {tasks.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        <div className="h-full grid place-content-center gap-2">
          <h1 className="text-2xl font-semibold text-center">No task found</h1>
          <p className="text-muted-foreground">
            Create a new task to get started!
          </p>
          <Button
            type="button"
            variant="secondary"
            className="cursor-pointer"
            onClick={() => navigate("/dashboard/add-task")}
          >
            Create a new Task
          </Button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
