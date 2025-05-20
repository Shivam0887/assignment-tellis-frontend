export type TaskPriority = "low" | "medium" | "high";

export type TaskStatus = "todo" | "in-progress" | "completed";

export type Tab = "all" | TaskStatus;

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: Date;
  assignee?: string;
}

export type TaskAction =
  | { type: "CHANGE_TAB"; tab: Tab }
  | {
      type: "ADD_TASK";
      tasks: Task[];
    }
  | {
      type: "UPDATE_TASK";
      id: string;
      task: Partial<Task>;
    }
  | {
      type: "DELETE_TASK";
      id: string;
    }
  | {
      type: "EDIT";
      editTask: Task;
    }
  | { type: "REMOVE_ALL" };

export interface TaskState {
  tasks: Task[];
  activeTab: Tab;
  editTask: Task | null;
}

export interface TaskContextType {
  taskState: TaskState;
  setTaskState: React.Dispatch<TaskAction>;
}
