"use client";

import { Separator } from "@radix-ui/react-separator";
import { useAuth } from "@clerk/nextjs";
import { dataAdminSlidebar, dataGeneralSlidebar } from "./SidebarRoutes.data";
import { SidebarItem } from "./SidebarItem";
import { isAdministrator } from "@/lib/isAdministrator";

export function SidebarRoutes() {
  const { userId } = useAuth();

  return (
    <div className="flex flex-col h-full">
      <div className="p-2 md:p-6">
        <p className="mb-2 text-slate-500">GENERAL</p>
        {dataGeneralSlidebar.map((item) => (
          <SidebarItem key={item.label} item={item} />
        ))}
      </div>

      <div className="px-6">
        <Separator className="w-full h-[1px] bg-slate-200 rounded-md" />
      </div>
      
      {isAdministrator(userId) && (
        <div className="p-2 md:p-6">
          <p className="mb-2 text-slate-500">ADMIN</p>
          {dataAdminSlidebar.map((item) => (
            <SidebarItem key={item.label} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
