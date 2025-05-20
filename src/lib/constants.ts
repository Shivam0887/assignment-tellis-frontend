import type { Tab } from "@/types/task.types";
import {
  CircleCheck,
  CircleDashed,
  Clock,
  LayoutDashboard,
  type LucideIcon,
} from "lucide-react";

interface SidebarTabs {
  icon: LucideIcon;
  title: string;
  tab: Tab;
  theme: {
    icon: string;
    indicator: string;
  };
}

// REST API Endpoint
export const BASE_URL = "https://zxsmwnmb-5000.inc1.devtunnels.ms/api";

export const SIDEBAR_TABS: SidebarTabs[] = [
  {
    icon: LayoutDashboard,
    title: "All tasks",
    tab: "all",
    theme: {
      icon: "text-orange-500",
      indicator: "bg-orange-100 text-orange-700",
    },
  },
  {
    icon: Clock,
    title: "To Do",
    tab: "todo",
    theme: {
      icon: "text-blue-500",
      indicator: "bg-blue-100 text-blue-700",
    },
  },
  {
    icon: CircleDashed,
    title: "In Progress",
    tab: "in-progress",
    theme: {
      icon: "text-purple-500",
      indicator: "bg-purple-100 text-purple-700",
    },
  },
  {
    icon: CircleCheck,
    title: "Completed",
    tab: "completed",
    theme: {
      icon: "text-green-500",
      indicator: "bg-green-100 text-green-700",
    },
  },
];

// export const taskData: Task[] = [
//   {
//     id: "1",
//     title: "Create dashboard wireframe",
//     description: "Design the initial wireframe for the new dashboard",
//     status: "in-progress",
//     priority: "high",
//     dueDate: new Date(2025, 4, 20),
//     assignee: "John Doe",
//   },
//   {
//     id: "2",
//     title: "Review API specifications",
//     description: "Go through the API docs and check for potential issues",
//     status: "todo",
//     priority: "medium",
//     dueDate: new Date(2025, 4, 25),
//     assignee: "Jane Smith",
//   },
//   {
//     id: "3",
//     title: "Update documentation",
//     description: "Make sure all docs are up to date with the latest features",
//     status: "completed",
//     priority: "low",
//     dueDate: new Date(2025, 4, 25),
//     assignee: "Alex Johnson",
//   },
//   {
//     id: "4",
//     title: "Schedule team meeting",
//     description: "Discuss progress and upcoming milestones",
//     status: "todo",
//     priority: "medium",
//     dueDate: new Date(2025, 4, 19),
//     assignee: "Sarah Wilson",
//   },
// ];

export const priorityOptions = [
  { value: "low", label: "Low", color: "text-priority-low" },
  { value: "medium", label: "Medium", color: "text-priority-medium" },
  { value: "high", label: "High", color: "text-priority-high" },
];

export const statusOptions = [
  { value: "todo", label: "To Do", color: "text-blue-500" },
  { value: "in-progress", label: "In Progress", color: "text-purple-500" },
  { value: "completed", label: "Completed", color: "text-green-500" },
];

export const priorityColors = {
  low: "bg-priority-low/10 text-priority-low border-priority-low/30",
  medium:
    "bg-priority-medium/10 text-priority-medium border-priority-medium/30",
  high: "bg-priority-high/10 text-priority-high border-priority-high/30",
};

export const statusStyles = {
  todo: "bg-blue-100 text-blue-800 border-blue-200",
  "in-progress": "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
};
