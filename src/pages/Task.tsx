import TaskForm from "@/components/dashboard/TaskForm";

const Task = ({ edit }: { edit: boolean }) => {
  return (
    <div className="w-full h-full">
      <TaskForm edit={edit} />
    </div>
  );
};

export default Task;
