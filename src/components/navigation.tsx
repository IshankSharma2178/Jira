"use client";

import { cn } from "@/lib/utils";
import { Settings } from "lucide-react";
import Link from "next/link";
import {
  GoHome,
  GoHomeFill,
  GoCheckCircle,
  GoCheckCircleFill,
  GoPeople,
} from "react-icons/go";
import { useWorkspaceId } from "@/features/workspaces/hooks/use-workspace-id";

const routes = [
  {
    href: "/",
    label: "Home",
    icon: GoHome,
    activeIcon: GoHomeFill,
  },
  {
    href: "/tasks",
    label: "My Tasks",
    icon: GoCheckCircle,
    activeIcon: GoCheckCircleFill,
  },
  {
    href: "/members",
    label: "Members",
    icon: GoPeople,
    activeIcon: GoPeople,
  },
  {
    href: "/settings",
    label: "Settings",
    icon: Settings,
    activeIcon: Settings,
  },
];

export const Navigation = () => {
  const workspaceId = useWorkspaceId();

  return (
    <ul>
      {routes.map((route) => {
        const fullHref = `/workspaces/${workspaceId}${route.href}`;
        const isActive = false;
        const Icon = isActive ? route.activeIcon : route.icon;
        return (
          <Link href={fullHref} key={route.href}>
            <div
              className={cn(
                "flex items-center gap-2.5 p-2.5 rounded-md font-medium hover:text-primary transition text-neutral-500",
                isActive && "bg-white shadow-sm hover:opacity-100 text-primary"
              )}
            >
              <Icon className="size-5 text-neutral-500" />
              {route.label}
            </div>
          </Link>
        );
      })}
    </ul>
  );
};
