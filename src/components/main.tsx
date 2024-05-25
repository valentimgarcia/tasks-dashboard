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
import React from "react";
import { useTheme } from "@/components/theme-provider";

export default function Main() {
  const [position, setPosition] = React.useState("bottom");
  const { setTheme } = useTheme();

  return (
    <>
      <div className="p-10">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-xl font-semibold">Welcome back Valentim!</p>
            <p>Here's a list of your taks</p>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="rounded-full bg-slate-100 dark:bg-zinc-800 p-3">
                  <AvatarImage src="" />
                  <AvatarFallback>VG</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                <div>
                  <p className="">Valentim Garcia</p>
                  <p className="text-xs font-light">
                    valentimgarcia@example.com
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
                        value={position}
                        onValueChange={setPosition}
                      >
                        <DropdownMenuRadioItem
                          value="top"
                          onClick={() => setTheme("light")}
                        >
                          Light
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="bottom"
                          onClick={() => setTheme("dark")}
                        >
                          Dark
                        </DropdownMenuRadioItem>
                        <DropdownMenuRadioItem
                          value="right"
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
                <DropdownMenuItem>New Team</DropdownMenuItem>
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
