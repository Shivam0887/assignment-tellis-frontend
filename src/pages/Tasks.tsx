import { useState } from "react";
import { Kanban, LayoutList } from "lucide-react";

import { useTask } from "@/providers/TaskProvider";

import KanbanBoard from "@/components/KanbanBoard";
import { Button } from "@/components/ui/button";
import TaskList from "@/components/dashboard/TaskList";

type ListLayout = "list" | "board";

const Tasks = () => {
  const [listLayout, setListLayout] = useState<ListLayout>("list");
  const { taskState } = useTask();

  return (
    <>
      <div>
        <h1 className="text-2xl md:text-3xl font-semibold">
          {taskState.activeTab === "all"
            ? "All"
            : taskState.activeTab === "todo"
            ? "To Do"
            : taskState.activeTab === "in-progress"
            ? "In Progress"
            : "Completed"}{" "}
          Tasks
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage and organize your tasks efficiently
        </p>
      </div>

      <div className="my-5 flex gap-2 justify-end">
        <Button
          variant={listLayout === "list" ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => setListLayout("list")}
        >
          <LayoutList /> List
        </Button>
        <Button
          variant={listLayout === "board" ? "default" : "secondary"}
          className="cursor-pointer"
          onClick={() => setListLayout("board")}
        >
          <Kanban onClick={() => setListLayout("list")} /> Board
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto pr-2">
        {listLayout === "list" ? <TaskList /> : <KanbanBoard />}
      </div>
    </>
  );
};

export default Tasks;
