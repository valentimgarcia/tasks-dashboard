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
import { Checkbox } from "../ui/checkbox";

export type Task = {
  id: string;
  type: "Feature" | "Bug" | "Documentation" | "Improvement";
  title: string;
  status: "In Progress" | "Backlog" | "Todo" | "Canceled" | "Done" | "Testing";
  priority: "High" | "Medium" | "Low";
  favorite: boolean;
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
  toggleFavorite: (id: string) => void,
  deleteTask: (id: string) => void
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
              <DropdownMenuItem>
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
      );
    },
  },
];
