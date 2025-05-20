import { format } from "date-fns";
import type { Task } from "@/types/task.types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Clock, Eye } from "lucide-react";
import { priorityColors, statusStyles } from "@/lib/constants";
import { Badge } from "../ui/badge";

interface TaskDetailDialogProps {
  task: Task;
}

export const TaskDetailDialog = ({ task }: TaskDetailDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="cursor-pointer">
          <Eye size={16} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[550px] z-50">
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={priorityColors[task.priority]}>
              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}{" "}
              Priority
            </Badge>
            <Badge variant="outline" className={statusStyles[task.status]}>
              {task.status === "todo"
                ? "To Do"
                : task.status === "in-progress"
                ? "In Progress"
                : "Completed"}
            </Badge>
          </div>
          <DialogTitle className="text-xl">{task.title}</DialogTitle>
          {task.description && (
            <DialogDescription className="text-base mt-2">
              {task.description}
            </DialogDescription>
          )}
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Due Date */}
            {
              <div className="flex items-center gap-2 p-3 bg-muted/20 rounded-md">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Due Date</p>
                  <p className="text-sm text-muted-foreground">
                    {format(task.dueDate, "PPP")}
                  </p>
                </div>
              </div>
            }
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
