import type {
  TaskAction,
  TaskContextType,
  TaskState,
} from "@/types/task.types";
import {
  createContext,
  useContext,
  useMemo,
  useReducer,
  type PropsWithChildren,
} from "react";

const TaskContext = createContext<TaskContextType>({
  taskState: { tasks: [], activeTab: "all", editTask: null },
  setTaskState: () => {},
});

const initialTaskState: TaskState = {
  tasks: [],
  activeTab: "all",
  editTask: null,
};

const reducer = (state: TaskState, action: TaskAction): TaskState => {
  switch (action.type) {
    case "REMOVE_ALL":
      return initialTaskState;
    case "EDIT":
      return { ...state, editTask: action.editTask };
    case "CHANGE_TAB":
      return { ...state, activeTab: action.tab };
    case "ADD_TASK":
      return {
        ...state,
        tasks: state.tasks.concat(action.tasks),
      };
    case "UPDATE_TASK":
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.id ? { ...task, ...action.task } : task
        ),
      };
    case "DELETE_TASK":
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    default:
      return state;
  }
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error("useTask must be used within a TaskProvider");
  }

  return context;
};

const TaskProvider = ({ children }: PropsWithChildren) => {
  const [taskState, setTaskState] = useReducer(reducer, initialTaskState);

  const value = useMemo(() => ({ taskState, setTaskState }), [taskState]);

  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
};

export default TaskProvider;
