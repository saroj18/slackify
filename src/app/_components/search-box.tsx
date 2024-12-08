"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Router, SearchIcon } from "lucide-react";
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
import React, { useEffect } from "react";
import { useDebounce } from "use-debounce";
import { useRouter } from "next/navigation";

export default function SearchBox() {
  const [open, setOpen] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [workspaceList, setWorkspaceList] = React.useState<any[]>([]);
  const router = useRouter();

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

  const [deboundedSearchText] = useDebounce(searchText, 500);

  const changeHandler = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchText(e.currentTarget.value);
  };

  useEffect(() => {
    const searchWorkspace = async () => {
      const resp = await fetch(`/api/workspace?search=${deboundedSearchText}`);
      const data = await resp.json();
      setWorkspaceList(data.data);
    };
    if (searchText) {
      searchWorkspace();
    }
  }, [deboundedSearchText]);

  const clickHandler = (id: string) => {
    router.push(`/workspace/${id}`);
  };
  console.log("workspaceList", workspaceList);
  return (
    <Dialog open={open} onOpenChange={() => setOpen(false)}>
      <div
        onClick={() => setOpen(true)}
        className="flex items-center gap-x-2 cursor-pointer"
      >
        <CommandShortcut className="text-lg">Ctrl+K</CommandShortcut>
        <SearchIcon />
      </div>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Search Your Projects</DialogTitle>
          <DialogDescription>
            <Command className="max-w-2xl">
              <CommandInput
                onChangeCapture={changeHandler}
                placeholder="Type a command or search..."
              />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                {workspaceList.length > 0 && (
                  <CommandGroup heading="Suggestions">
                    {workspaceList.map((workspace) => (
                      <CommandItem
                        className="cursor-pointer"
                        key={workspace.id}
                        onSelect={() => clickHandler(workspace.id)}
                      >
                        {workspace.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
                <CommandSeparator />
              </CommandList>
            </Command>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
