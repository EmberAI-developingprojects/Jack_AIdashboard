"use client";

import { usePathname, useRouter } from "next/navigation";
import { Menu, LogOut, Sun, Moon, ChevronRight } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import { MobileSidebar } from "@/components/ui/sidebar";

const pageTitles: Record<string, string> = {
  "/dashboard": "Хянах самбар",
  "/analytics": "Аналитик",
  "/settings": "Тохиргоо",
  "/profile": "Профайл",
};

function Breadcrumb({ pathname }: { pathname: string }) {
  const title = pageTitles[pathname];
  if (!title) return null;

  return (
    <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
      <span>Нүүр</span>
      <ChevronRight size={14} />
      <span className="text-foreground font-medium">{title}</span>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const title = pageTitles[pathname] || "Хянах самбар";

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-14 px-4 border-b border-border bg-background/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger
            render={
              <Button variant="ghost" size="icon" className="md:hidden" />
            }
          >
            <Menu size={20} />
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 pt-10">
            <SheetTitle className="px-4 pb-2 text-lg font-semibold">
              Цэс
            </SheetTitle>
            <MobileSidebar />
          </SheetContent>
        </Sheet>
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold leading-tight">{title}</h1>
          <Breadcrumb pathname={pathname} />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="text-muted-foreground"
        >
          <Sun size={18} className="dark:hidden" />
          <Moon size={18} className="hidden dark:block" />
        </Button>
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium text-primary">
          A
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/login")}
          className="text-muted-foreground"
        >
          <LogOut size={18} />
        </Button>
      </div>
    </header>
  );
}
