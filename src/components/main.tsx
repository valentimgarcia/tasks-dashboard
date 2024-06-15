import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import Page from "./table/page";
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
} from "./ui/dropdown-menu";
import { DropdownMenuShortcut } from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import React, { useEffect } from "react";
import { Theme, useTheme } from "@/components/theme-provider";

export default function Main() {
  const { theme, setTheme } = useTheme();
  const [dropdownTheme, setDropdownTheme] = React.useState(theme);

  useEffect(() => {
    setDropdownTheme(theme);
  }, [theme]);

  return (
    <>
      <div className="p-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-2xl font-semibold">Welcome back John!</p>
            <p className="text-muted-foreground">Here's a list of your taks</p>
          </div>
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
                <div>
                  <p className="">John Doe</p>
                  <p className="text-xs font-light">
                    johndoe@example.com
                  </p>
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
        </div>
        <div>
          <Page></Page>
        </div>
      </div>
    </>
  );
}
