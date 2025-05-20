import { ListTodo, Menu, Plus, X } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import { SIDEBAR_TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import ToggleTheme from "../ToggleTheme";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useTask } from "@/providers/TaskProvider";
import { Link, useNavigate } from "react-router";

const Sidebar = ({ className }: { className?: string }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { taskState, setTaskState } = useTask();

  const navigate = useNavigate();

  const count = useMemo(
    () => ({
      all: taskState.tasks.length,
      todo: taskState.tasks.filter(({ status }) => status === "todo").length,
      "in-progress": taskState.tasks.filter(
        ({ status }) => status === "in-progress"
      ).length,
      completed: taskState.tasks.filter(({ status }) => status === "completed")
        .length,
    }),
    [taskState.tasks]
  );

  return (
    <div
      className={cn(
        "bg-sidebar-background h-full transition-[width] flex flex-col border-r",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex justify-between items-center p-4 border-b">
        {!collapsed && (
          <Link to="/" className="flex items-center gap-3">
            <ListTodo className="text-sidebar-primary" />
            <h1 className="font-bold text-sidebar-foreground">TaskMaster</h1>
          </Link>
        )}
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden md:inline-flex cursor-pointer ${
            collapsed && "-ml-1"
          }`}
        >
          {collapsed ? <Menu className="size-6" /> : <X className="size-4" />}
        </Button>
      </div>

      <div className="flex-1 space-y-2 p-2">
        <TooltipProvider>
          {SIDEBAR_TABS.map(({ icon: Icon, title, tab, theme }) => (
            <Tooltip key={tab}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  onClick={() => setTaskState({ type: "CHANGE_TAB", tab })}
                  className={cn(
                    "w-full p-3 transition-colors hover:text-sidebar-accent-foreground hover:bg-sidebar-accent flex justify-start items-center gap-3 rounded-lg cursor-pointer",
                    {
                      "bg-sidebar-accent text-sidebar-accent-foreground":
                        taskState.activeTab === tab,
                      "justify-center": collapsed,
                    }
                  )}
                >
                  <div>
                    <Icon className={`size-5 ${theme.icon}`} />
                  </div>
                  {!collapsed && (
                    <div className="flex justify-between items-center flex-1">
                      <span className="text-sm text-nowrap font-medium">
                        {title}
                      </span>
                      {count[tab] > 0 && (
                        <span
                          className={`inline-block text-xs px-2 py-1 rounded-full ${theme.indicator}`}
                        >
                          {count[tab]}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right">{title}</TooltipContent>
              )}
            </Tooltip>
          ))}
        </TooltipProvider>

        <Button
          onClick={() => navigate("/dashboard/add-task")}
          variant="secondary"
          size="lg"
          className={cn(
            "w-full p-3 rounded-lg transition-colors hover:text-sidebar-accent-foreground hover:bg-sidebar-accent flex justify-start items-center gap-3 cursor-pointer mt-5",

            collapsed && "justify-center"
          )}
        >
          <div>
            <Plus className="size-4" />
          </div>
          {!collapsed && (
            <span className="text-sm text-sidebar-foreground">
              Create new task
            </span>
          )}
        </Button>
      </div>

      <div className="pb-8 pl-4">
        <ToggleTheme />
      </div>
    </div>
  );
};

export default Sidebar;
