import { ArrowUp, ArrowDown, ChevronsUpDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Task } from "./columns";
import { Column } from "@tanstack/react-table";

interface SortableHeaderProps {
  column: Column<Task, unknown>
  label: string;
}

const SortableHeader = ({ column, label }: SortableHeaderProps) => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost">
        {label}
        {column.getIsSorted() === "asc" ? (
          <ArrowUp className="ml-2 w-4 h-4 text-muted-foreground" />
        ) : column.getIsSorted() === "desc" ? (
          <ArrowDown className="ml-2 w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronsUpDown className="ml-2 w-4 h-4 text-muted-foreground" />
        )}
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent>
      <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
        Asc
        <ArrowUp className="ml-2 w-4 h-4 text-muted-foreground" />
      </DropdownMenuItem>
      <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
        Desc
        <ArrowDown className="ml-2 w-4 h-4 text-muted-foreground" />
      </DropdownMenuItem>
      <DropdownMenuSeparator />
      <DropdownMenuItem onClick={() => column.clearSorting()}>
        Reset
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default SortableHeader;
