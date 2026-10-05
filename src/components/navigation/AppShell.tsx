import { ReactNode } from "react";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="km-shell min-h-screen bg-canvas text-ink">
      <DesktopNav />
      <div className="km-workspace">
        <MobileNav />
        <div className="km-page">{children}</div>
      </div>
    </div>
  );
}
