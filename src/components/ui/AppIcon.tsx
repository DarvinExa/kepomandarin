import type { ReactNode, SVGProps } from "react";

export type AppIconName =
  | "home"
  | "map"
  | "headphones"
  | "message"
  | "book"
  | "trophy"
  | "settings"
  | "menu"
  | "close"
  | "arrow"
  | "check"
  | "star"
  | "lock"
  | "gift"
  | "play"
  | "speaker";

const paths: Record<AppIconName, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M9 20v-6h6v6"/></>,
  map: <><path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3Z"/><path d="M9 3v15M15 6v15"/></>,
  headphones: <><path d="M4 14v-2a8 8 0 0 1 16 0v2"/><path d="M4 14h4v7H6a2 2 0 0 1-2-2ZM20 14h-4v7h2a2 2 0 0 0 2-2Z"/></>,
  message: <><path d="M4 5h16v11H9l-5 4Z"/><path d="M8 9h8M8 12h5"/></>,
  book: <><path d="M4 4h11a3 3 0 0 1 3 3v13H7a3 3 0 0 1-3-3Z"/><path d="M7 4v16M18 7h2v13h-5"/></>,
  trophy: <><path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H4v2a4 4 0 0 0 4 4M16 6h4v2a4 4 0 0 1-4 4M12 13v5M8 21h8M9 18h6"/></>,
  settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a2 2 0 0 0 .4 2.2l.1.1-2.8 2.8-.1-.1a2 2 0 0 0-2.2-.4 2 2 0 0 0-1.2 1.8V22H10v-.2A2 2 0 0 0 8.8 20a2 2 0 0 0-2.2.4l-.1.1-2.8-2.8.1-.1A2 2 0 0 0 4.2 15a2 2 0 0 0-1.8-1.2H2V10h.4A2 2 0 0 0 4.2 8.8a2 2 0 0 0-.4-2.2l-.1-.1 2.8-2.8.1.1A2 2 0 0 0 8.8 4.2 2 2 0 0 0 10 2.4V2h4v.4a2 2 0 0 0 1.2 1.8 2 2 0 0 0 2.2-.4l.1-.1 2.8 2.8-.1.1a2 2 0 0 0-.4 2.2A2 2 0 0 0 21.6 10h.4v4h-.4a2 2 0 0 0-2.2 1Z"/></>,
  menu: <><path d="M4 6h16M4 12h16M4 18h16"/></>,
  close: <><path d="m6 6 12 12M18 6 6 18"/></>,
  arrow: <><path d="M5 12h14M14 7l5 5-5 5"/></>,
  check: <path d="m5 12 4 4L19 6"/>,
  star: <path d="m12 2 3 6 7 .9-5 4.8 1.3 6.8L12 17l-6.3 3.5L7 13.7 2 9l7-.9Z"/>,
  lock: <><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>,
  gift: <><rect x="3" y="9" width="18" height="12" rx="1"/><path d="M12 9v12M3 13h18M12 9H8a3 3 0 1 1 4-3Zm0 0h4a3 3 0 1 0-4-3Z"/></>,
  play: <path d="m8 5 11 7-11 7Z"/>,
  speaker: <><path d="M11 5 6 9H3v6h3l5 4Z"/><path d="M15 9a4 4 0 0 1 0 6M18 6a8 8 0 0 1 0 12"/></>,
};

export function AppIcon({ name, ...props }: { name: AppIconName } & SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>
      {paths[name]}
    </svg>
  );
}