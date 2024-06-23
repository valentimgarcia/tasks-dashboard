import { useEffect, useState } from "react";
import { Task, columns } from "./columns";
import { DataTable } from "./data-table";
import { tasks } from "../data/tasks-mock";

async function getTasks(): Promise<Task[]> {
  return tasks;
}

export default function Page() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [originalTask, setOriginalTask] = useState<Task | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const tasks = await getTasks();
    setTasks(tasks);
  };

  const toggleEdit = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === id) {
          const isEditing = !task.isEditing;
          setIsEditing(isEditing);
          if (isEditing) {
            setOriginalTask({ ...task });
          } else {
            setOriginalTask(null);
          }
          return { ...task, isEditing };
        }
        return { ...task, isEditing: false };
      })
    );
  };

  const toggleFavorite = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, favorite: !task.favorite } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const saveTask = (id: string) => {
    setIsEditing(false);
    toggleEdit(id);
  };

  const updateTaskTitle = (id: string, newTitle: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, title: newTitle } : task
      )
    );
  };

  const rollbackTask = (id: string) => {
    if (originalTask) {
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? { ...originalTask, isEditing: false } : task
        )
      );
      setIsEditing(false);
      setOriginalTask(null);
    }
  };

  const addTask = (newTask: Task) => {
    setTasks((prevTasks) => [newTask, ...prevTasks]);
  };

  return (
    <div className="mx-auto pt-6">
      <DataTable
        columns={columns(
          toggleEdit,
          toggleFavorite,
          deleteTask,
          saveTask,
          rollbackTask,
          isEditing,
          updateTaskTitle
        )}
        data={tasks}
        addTask={addTask}
      />
    </div>
  );
}
