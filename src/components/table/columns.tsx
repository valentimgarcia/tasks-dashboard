import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import {
  MoveUp,
  MoveRight,
  MoveDown,
  AlarmClock,
  CircleHelp,
  Circle,
  CircleX,
  CircleCheck,
  CircleDashed,
  Star,
  StarOff,
  Copy,
  SquarePen,
  ChevronDown,
  Check,
  X,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";
import { Checkbox } from "../ui/checkbox";
import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import SortableHeader from "./column-sortable-header";

export type Task = {
  id: string;
  type: TaskType;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  favorite: boolean;
  isEditing: boolean;
};

export type TaskType = "Feature" | "Bug" | "Documentation" | "Improvement";
export type TaskStatus =
  | "In Progress"
  | "Backlog"
  | "Todo"
  | "Canceled"
  | "Done"
  | "Testing";
export type TaskPriority = "High" | "Medium" | "Low";

const taskTypes: TaskType[] = [
  "Feature",
  "Bug",
  "Documentation",
  "Improvement",
];
const taskStatus: TaskStatus[] = [
  "In Progress",
  "Backlog",
  "Todo",
  "Canceled",
  "Done",
  "Testing",
];
const taskPrioritys: TaskPriority[] = ["High", "Medium", "Low"];

const priorityIcons = {
  High: MoveUp,
  Medium: MoveRight,
  Low: MoveDown,
};

const statusIcons = {
  "In Progress": AlarmClock,
  Backlog: CircleHelp,
  Todo: Circle,
  Canceled: CircleX,
  Done: CircleCheck,
  Testing: CircleDashed,
};

export const columns = (
  toggleEdit: (id: string) => void,
  toggleFavorite: (id: string) => void,
  deleteTask: (id: string) => void,
  saveTask: (id: string) => void,
  rollbackTask: (id: string) => void,
  isEditing: boolean,
  updateTaskTitle: (id: string, newTitle: string) => void
): ColumnDef<Task>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        className={`border ${
          table.getIsAllPageRowsSelected() ? "border-green-500" : "border-white"
        }`}
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className={`border ${
          row.getIsSelected() ? "border-green-500" : "border-white"
        }`}
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "id",
    header: "Task",
    cell: (info: any) => (
      <div className="flex items-center">
        TASK-{info.getValue()}{" "}
        {info.row.original.favorite && <Star className="ml-2 w-5 h-5" />}
      </div>
    ),
  },
  {
    accessorKey: "title",
    header: ({ column }) => <SortableHeader column={column} label="Title" />,
    cell: (info) => {
      const task = info.row.original;
      const inputRef = useRef<HTMLInputElement | null>(null);
      const [selectedType, setSelectedType] = useState(task.type);

      useEffect(() => {
        if (task.isEditing && inputRef.current) {
          inputRef.current.focus();
        }
      }, [task.isEditing]);

      let badgeVariant: "default" | "secondary" | "destructive" | "outline" =
        "default";

      switch (task.type) {
        case "Documentation":
        case "Improvement":
          badgeVariant = "secondary";
          break;
        case "Bug":
          badgeVariant = "destructive";
          break;
        default:
          break;
      }

      return (
        <div className="flex items-center">
          {task.isEditing ? (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant={badgeVariant}
                    className="mr-2 focus-visible:ring-transparent"
                  >
                    {selectedType}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuRadioGroup
                    value={selectedType}
                    onValueChange={(value) => {
                      const newValue = value as TaskType;
                      task.type = newValue;
                      setSelectedType(newValue);
                    }}
                  >
                    {taskTypes.map((type) => (
                      <DropdownMenuRadioItem key={type} value={type}>
                        {type}
                      </DropdownMenuRadioItem>
                    ))}
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Input
                ref={inputRef}
                id="title"
                value={task.title}
                onChange={(event) =>
                  updateTaskTitle(task.id, event.target.value)
                }
              />
            </>
          ) : (
            <>
              <Badge variant={badgeVariant} className="mr-2 h-fit">
                {task.type}
              </Badge>{" "}
              {task.title}
            </>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <SortableHeader column={column} label="Status" />,
    cell: (info) => {
      const task = info.row.original;
      const IconComponent = statusIcons[task.status];
      const [selectedStatus, setSelectedStatus] = useState(task.status);

      return (
        <div className="flex items-center">
          <>
            {task.isEditing ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="focus-visible:ring-transparent"
                    >
                      {selectedStatus}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={selectedStatus}
                      onValueChange={(value) => {
                        const newValue = value as TaskStatus;
                        task.status = newValue;
                        setSelectedStatus(newValue);
                      }}
                    >
                      {taskStatus.map((status) => (
                        <DropdownMenuRadioItem key={status} value={status}>
                          {status}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <IconComponent className="h-4 w-4 mr-2" />
                {task.status}
              </>
            )}
          </>
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: ({ column }) => <SortableHeader column={column} label="Priority" />,
    cell: (info) => {
      const task = info.row.original;
      const IconComponent = priorityIcons[task.priority];
      const [selectedPriority, setSelectedPriority] = useState(task.priority);

      return (
        <div className="flex items-center">
          <>
            {task.isEditing ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="secondary"
                      className="focus-visible:ring-transparent"
                    >
                      {selectedPriority}
                      <ChevronDown className="h-4 w-4 ml-2" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuRadioGroup
                      value={selectedPriority}
                      onValueChange={(value) => {
                        const newValue = value as TaskPriority;
                        task.priority = newValue;
                        setSelectedPriority(newValue);
                      }}
                    >
                      {taskPrioritys.map((priority) => (
                        <DropdownMenuRadioItem key={priority} value={priority}>
                          {priority}
                        </DropdownMenuRadioItem>
                      ))}
                    </DropdownMenuRadioGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <IconComponent className="h-4 w-4 mr-2" />
                {task.priority}
              </>
            )}
          </>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: (info) => {
      const task = info.row.original;

      return (
        <>
          {task.isEditing ? (
            <div className="flex justify-center">
              <Button
                size="icon"
                className="mr-3"
                onClick={() => saveTask(task.id)}
              >
                <Check className="h-4 w-4" />
              </Button>
              <Button
                size="icon"
                variant="destructive"
                onClick={() => rollbackTask(task.id)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : !isEditing ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="rounded-full">
                  <Ellipsis className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => toggleEdit(task.id)}>
                    Edit
                    <DropdownMenuShortcut>
                      <SquarePen className="w-4 h-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => {
                      navigator.clipboard.writeText(task.id);
                      toast(`Task ID (${task.id}) copied to your system`, {
                        action: {
                          label: "Close",
                          onClick: () => {},
                        },
                      });
                    }}
                  >
                    Copy task ID
                    <DropdownMenuShortcut>
                      <Copy className="ml-6 w-4 h-4" />
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => toggleFavorite(task.id)}>
                    {task.favorite ? "Unfavorite" : "Favorite"}
                    <DropdownMenuShortcut>
                      {task.favorite ? (
                        <StarOff className="w-4 h-4" />
                      ) : (
                        <Star className="w-4 h-4" />
                      )}
                    </DropdownMenuShortcut>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => {
                      deleteTask(task.id);
                      toast(`Task ID (${task.id}) deleted from dashboard`, {
                        style: { borderColor: "hsl(var(--destructive))" },
                        action: {
                          label: "Close",
                          onClick: () => {},
                        },
                      });
                    }}
                  >
                    Delete
                    <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="h-9"></div>
          )}
        </>
      );
    },
  },
];
