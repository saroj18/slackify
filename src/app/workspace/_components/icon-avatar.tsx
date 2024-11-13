import React from "react";

interface IconAvatarType extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title: string;
}

export default function IconAvatar({
  children,
  title,
  ...props
}: IconAvatarType) {
  return (
    <div
      {...props}
      className="rounded-md flex flex-col my-3 items-center border-2 bg-gray-100  justify-center cursor-pointer"
    >
      {children}
      <p className="text-xs opacity-70">{title}</p>
    </div>
  );
}
