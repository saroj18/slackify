"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SearchIcon } from "lucide-react";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import React from "react";

export default function SearchBox() {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <div onClick={() => setOpen(true)} className="flex items-center gap-x-2 cursor-pointer">
        <CommandShortcut className="text-lg">Ctrl+K</CommandShortcut>
        <SearchIcon />
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Your Projects</DialogTitle>
          <DialogDescription>
            <Command className="max-w-2xl">
              <CommandInput placeholder="Type a command or search..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Suggestions">
                  <CommandItem>Calendar</CommandItem>
                  <CommandItem>Search Emoji</CommandItem>
                  <CommandItem>Calculator</CommandItem>
                </CommandGroup>
                <CommandSeparator />
              </CommandList>
            </Command>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
