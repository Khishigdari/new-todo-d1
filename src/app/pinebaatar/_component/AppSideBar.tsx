"use client";

import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function AppSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateClub = () => {
    router.push("/createClub");
  };

  const handleClub = () => {
    router.push("/pinebaatar");
  };

  return (
    <Sidebar className="px-4 ">
      <SidebarHeader />
      <div>
        <SidebarContent>
          <SidebarMenuItem
            className="flex justify-between items-center"
            onClick={() => setIsOpen(!isOpen)}
          >
            <p>Club</p>
            {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
          </SidebarMenuItem>
          {isOpen ? (
            ""
          ) : (
            <div className="text-xs flex flex-col gap-3 w-full ">
              <SidebarMenuItem
                className="hover:bg-gray-100 py-2 px-4 rounded-sm hover:cursor-pointer"
                onClick={handleClub}
              >
                Club
              </SidebarMenuItem>
              <SidebarMenuItem
                className="hover:bg-gray-100 py-2 px-4 rounded-sm hover:cursor-pointer"
                onClick={handleCreateClub}
              >
                Create Club
              </SidebarMenuItem>
            </div>
          )}
        </SidebarContent>
      </div>
    </Sidebar>
  );
}
