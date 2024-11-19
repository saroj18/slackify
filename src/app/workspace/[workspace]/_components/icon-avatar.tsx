import React from "react";
import { twMerge } from "tailwind-merge";

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
    <div
      {...props}
      className={twMerge(
        "rounded-md flex flex-col my-3 items-center border-2 bg-gray-100  justify-center cursor-pointer",
        className
      )}
    >
      {children}
      <p className="text-xs opacity-70">{title}</p>
    </div>
  );
}
