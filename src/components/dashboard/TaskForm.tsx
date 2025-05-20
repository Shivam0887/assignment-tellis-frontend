import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarIcon, Dot } from "lucide-react";
import { BASE_URL, priorityOptions, statusOptions } from "@/lib/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useTask } from "@/providers/TaskProvider";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const taskSchema = z.object({
  title: z.string().min(3, "Title must contain at least 3 characters"),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["todo", "in-progress", "completed"]),
  dueDate: z.coerce.date(),
  assignee: z.string().optional(),
});

type TaskValues = z.infer<typeof taskSchema>;

const TaskForm = ({ edit }: { edit: boolean }) => {
  const { taskState, setTaskState } = useTask();
  const navigate = useNavigate();
  const { taskId } = useParams<{ taskId: string }>();

  const { editTask } = taskState;

  const shouldEdit = edit && !!taskId && editTask !== null;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<TaskValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      priority: shouldEdit ? editTask.priority : "medium",
      status: shouldEdit ? editTask.status : "todo",
      assignee: shouldEdit ? editTask.assignee || "" : "",
      description: shouldEdit ? editTask.description || "" : "",
      dueDate: shouldEdit ? editTask.dueDate : new Date(),
      title: shouldEdit ? editTask.title || "" : "",
    },
  });

  if (edit && !taskId) return null;

  const onSubmit = async (values: TaskValues) => {
    if (shouldEdit) {
      try {
        await fetch(`${BASE_URL}/tasks/${taskId}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        toast("Task updated successfully!");
        setTaskState({ type: "UPDATE_TASK", id: taskId!, task: values });
      } catch (error: unknown) {
        console.log("Task update error:", error);
        toast("Task update error");
      }
    } else {
      try {
        const response = await fetch(`${BASE_URL}/tasks`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const data = await response.json();

        toast("Task created successfully!");
        setTaskState({
          type: "ADD_TASK",
          tasks: [{ ...values, id: data.data }],
        });
      } catch (error) {
        console.log("Task create error:", error);
        toast("Task create error");
      }
    }

    navigate("/dashboard");
  };

  const title = !edit ? "Create New Task" : "Edit Task";
  const submitButtonText = !edit ? "Create Task" : "Update Task";
  const description = !edit
    ? "Add a new task to your dashboard."
    : "Update the details of your task.";

  return (
    <div className="max-w-2xl w-full mx-auto flex flex-col justify-evenly h-full">
      <div className="space-y-3">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center">
          {title}
        </h1>
        <p className="text-center text-muted-foreground">{description}</p>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5 gap-3 grid grid-cols-2"
      >
        <div className="space-y-4 col-span-2">
          <div className="space-y-4">
            <Label htmlFor="title">Title</Label>
            <Input
              type="text"
              id="title"
              {...register("title", { required: true })}
              placeholder="Task title"
              className={cn(
                "text-sm",
                errors.title &&
                  "focus-visible:ring-destructive focus-visible:border-transparent"
              )}
            />
            {errors.title && (
              <p className="text-destructive text-xs">{errors.title.message}</p>
            )}
          </div>
          <div className="space-y-4">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description")}
              placeholder="Add a description"
              className="text-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="priority">Priority</Label>
          <Controller
            control={control}
            name="priority"
            rules={{ required: true }}
            render={({ field }) => (
              <Select
                value={field.value}
                onValueChange={field.onChange}
                name={field.name}
              >
                <SelectTrigger id="priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {priorityOptions.map(({ color, label, value }) => (
                    <SelectItem key={value} value={value}>
                      <div className="flex items-center gap-x-2">
                        <Dot className={`stroke-[10] ${color}`} /> {label}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {shouldEdit && (
          <div className="space-y-4">
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select
                  value={field.value}
                  onValueChange={field.onChange}
                  name={field.name}
                >
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map(({ color, label, value }) => (
                      <SelectItem key={value} value={value}>
                        <div className="flex items-center gap-x-2">
                          <Dot className={`stroke-[10] ${color}`} />
                          {label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>
        )}

        <div className="space-y-4">
          <Label htmlFor="due-date">Due Date</Label>
          <Controller
            control={control}
            name="dueDate"
            render={({ field }) => (
              <Popover>
                <PopoverTrigger className="w-full" id="due-date" asChild>
                  <div className="space-y-4">
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {format(field.value, "PPP")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent>
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={(date) => {
                      if (date) field.onChange(date);
                    }}
                    disabled={(date) =>
                      date.getTime() <
                      new Date().getTime() - 60 * 60 * 24 * 1000
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          />
        </div>
        <div className="space-y-4">
          <Label htmlFor="assignee">Assignee</Label>
          <Input
            type="text"
            id="assignee"
            placeholder="Who's responsible?"
            className="text-sm"
          />
        </div>

        <div className="col-span-2 justify-self-end space-x-2">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </Button>
          <Button type="submit" variant="secondary">
            {submitButtonText}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TaskForm;
