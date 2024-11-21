"use client";

import React from "react";
import { twMerge } from "tailwind-merge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface IconAvatarType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
  className?: string;
}

export default function IconAvatar({
  children,
  title,
  className,
  ...props
}: IconAvatarType) {
  return (
    <TooltipProvider>
      <Tooltip>
        <div {...props}>
          <TooltipTrigger
            className={twMerge(
              "rounded-md flex w-full hover:bg-gray-300 flex-col my-3  items-center border-2 bg-gray-100  justify-center cursor-pointer",
              className
            )}
          >
            {children}
            <p className="text-[10px] opacity-70">{title}</p>
          </TooltipTrigger>
        </div>
        <TooltipContent>
          <p>{title}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
