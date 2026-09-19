import { ReactNode } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-ink flex flex-col lg:flex-row selection:bg-ink selection:text-canvas">
      {/* Desktop Sidebar Navigation */}
      <DesktopNav />

      {/* Mobile Top Navigation & Content Container */}
      <div className="flex-1 flex flex-col min-w-0">
        <MobileNav />

        {/* Main Application Workspace */}
        <div className="flex-1 min-w-0">
          {children}
        </div>
      </div>
    </div>
  );
}
