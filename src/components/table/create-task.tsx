import { Input } from "@/components/ui/input";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Task, taskPrioritys, taskStatus, taskTypes } from "./columns";
import { Switch } from "../ui/switch";

interface CreateTaskProps {
  addTask: (task: Task) => void;
}

export default function CreateTask({ addTask }: CreateTaskProps) {
  const [createTaskForm, setCreateTaskForm] = useState<Partial<Task>>({
    id: undefined,
    type: undefined,
    title: undefined,
    status: undefined,
    priority: undefined,
    favorite: false,
  });
  const [isOpen, setIsOpen] = useState(false);
  
  const handleFormChange = (field: keyof Task, value: string | boolean) => {
    setCreateTaskForm((prevForm) => ({
      ...prevForm,
      [field]: value,
    }));
  };

  const clearFormState = () => {
    setCreateTaskForm({
      id: undefined,
      type: undefined,
      title: undefined,
      status: undefined,
      priority: undefined,
      favorite: false,
    });
  };

  const isFormValid = () => {
    return (
      createTaskForm.type !== undefined &&
      createTaskForm.title !== undefined &&
      createTaskForm.title.trim() !== "" &&
      createTaskForm.status !== undefined &&
      createTaskForm.priority !== undefined
    );
  };

  const createTask = () => {
    const randomId = Math.floor(Math.random() * 90000) + 10000;
    createTaskForm.id = randomId.toString();
    const newTask: Task = {
      ...createTaskForm,
    } as Task;
    addTask(newTask);
    clearFormState();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <PlusCircle className="w-4 h-4 mr-2" />
          Create task
        </Button>
      </DialogTrigger>
      <DialogContent onClose={clearFormState}>
        <DialogHeader>
          <DialogTitle>Create task</DialogTitle>
          <DialogDescription>
            Fill the form to create a new task
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-between items-end pt-4">
          <div className="w-[15.5rem] sm:w-[18.9rem]">
            <p className="mb-1">Title</p>
            <Input
              placeholder="Type your task title"
              value={createTaskForm.title || ""}
              onChange={(e) => handleFormChange("title", e.target.value)}
            />
          </div>
          <div className="flex items-center mb-[0.4rem] mr-[2.4rem]">
            <p className="mr-3">Favorite</p>
            <Switch
              onCheckedChange={(value) => handleFormChange("favorite", value)}
            />
          </div>
        </div>

        <div className="flex justify-between pt-2 pb-6">
          <div>
            <p className="mb-1">Type</p>
            <Select onValueChange={(value) => handleFormChange("type", value)}>
              <SelectTrigger className="w-36 text-muted-foreground">
                <SelectValue placeholder="Select a type" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {taskTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-1">Status</p>
            <Select
              onValueChange={(value) => handleFormChange("status", value)}
            >
              <SelectTrigger className="w-36 text-muted-foreground">
                <SelectValue placeholder="Select a status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {taskStatus.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div>
            <p className="mb-1">Priority</p>
            <Select
              onValueChange={(value) => handleFormChange("priority", value)}
            >
              <SelectTrigger className="w-36 text-muted-foreground">
                <SelectValue placeholder="Select a priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {taskPrioritys.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="button"
              variant="outline"
              className="mr-3"
              onClick={() => clearFormState()}
            >
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="submit"
            disabled={!isFormValid()}
            onClick={() => createTask()}
          >
            Create task
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
