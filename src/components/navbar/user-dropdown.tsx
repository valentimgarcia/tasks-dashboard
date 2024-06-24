import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { DropdownMenuShortcut } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Theme, useTheme } from "@/components/theme-provider";
import { useEffect } from "react";
import React from "react";

export default function UserDropdown() {
  const { theme, setTheme } = useTheme();
  const [dropdownTheme, setDropdownTheme] = React.useState(theme);

  useEffect(() => {
    setDropdownTheme(theme);
  }, [theme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="rounded-full bg-slate-100 dark:bg-zinc-800 p-3">
            <AvatarImage src="" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>
          <div className="mr-4">
            <p className="">John Doe</p>
            <p className="text-xs font-light">johndoe@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Profile
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={dropdownTheme}
                  onValueChange={(value) => {
                    setDropdownTheme(value as Theme);
                    setTheme(value as Theme);
                  }}
                >
                  <DropdownMenuRadioItem
                    value="light"
                    onClick={() => setTheme("light")}
                  >
                    Light
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="dark"
                    onClick={() => setTheme("dark")}
                  >
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem
                    value="system"
                    onClick={() => setTheme("system")}
                  >
                    System
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            Billing
            <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuItem>
            Settings
            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            Log out
            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
