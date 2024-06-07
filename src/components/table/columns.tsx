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
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { toast } from "sonner";

export type Task = {
  id: string;
  type: "Feature" | "Bug" | "Documentation" | "Improvement";
  title: string;
  status: "In Progress" | "Backlog" | "Todo" | "Canceled" | "Done" | "Testing";
  priority: "High" | "Medium" | "Low";
};

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
  deleteTask: (id: string) => void
): ColumnDef<Task>[] => [
  {
    accessorKey: "id",
    header: "Task",
    cell: (info) => `TASK-${info.getValue()}`,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: (info) => {
      const taskTitle = info.row.original;
      let badgeVariant: "default" | "secondary" | "destructive" | "outline" =
        "default";

      switch (taskTitle.type) {
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
        <>
          <Badge variant={badgeVariant} className="mr-2">
            {taskTitle.type}
          </Badge>{" "}
          {taskTitle.title}
        </>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: (info) => {
      const task = info.row.original;
      const IconComponent = statusIcons[task.status];

      return (
        <div className="flex items-center">
          <IconComponent className="h-4 w-4 mr-2" />
          {task.status}
        </div>
      );
    },
  },
  {
    accessorKey: "priority",
    header: "Priority",
    cell: (info) => {
      const task = info.row.original;
      const IconComponent = priorityIcons[task.priority];

      return (
        <div className="flex items-center">
          <IconComponent className="h-4 w-4 mr-2" />
          {task.priority}
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: (info) => {
      const task = info.row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full">
              <Ellipsis className="h-4 w-4"></Ellipsis>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuItem>Edit</DropdownMenuItem>
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
              </DropdownMenuItem>
              <DropdownMenuItem>Favorite</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => deleteTask(task.id)}>
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
