import { Input } from '@/components/ui/input';
import React from 'react'

export default function ProjectName() {
  return (
    <div className="max-w-2xl space-y-6 mx-auto w-full border-2 rounded-md shadow-md p-3">
      <h1 className="text-5xl font-bold">
        What’s your team working on right now?
      </h1>
      <p>
        This name will be the first thing your team sees in reference to your
        template.
      </p>
      <Input className="h-[50px]" placeholder="Ex:Meeting" />
    </div>
  );
}
