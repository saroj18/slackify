import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ChevronDown } from "lucide-react";
import React from "react";

export default function ProjectCard() {
  return (
      <div className="mx-auto my-4 max-w-4xl rounded-lg bg-purple-50/95 p-6">
        <h1 className="mb-6 text-lg font-medium text-gray-900">
          Workspaces for sarojaryal2003@gmail.com
        </h1>
        <Card className="border-0 shadow-sm">
          <CardContent className="flex items-center justify-between p-4">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 overflow-hidden rounded">
                <div className="relative h-full w-full">
                  <div className="absolute bottom-0 left-0 h-1/2 w-full bg-teal-400" />
                  <div className="absolute left-0 top-0 h-1/2 w-full bg-emerald-500" />
                </div>
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-xl">Demo For Learning</h2>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Avatar className="h-5 w-5">
                    <AvatarFallback className="bg-gray-200 text-[10px]">
                      U1
                    </AvatarFallback>
                  </Avatar>
                  <span>1 member</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
             
              <Button >
                LAUNCH SLACK
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  );
}
