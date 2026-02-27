import { Link, useLocation } from "wouter";
import { LayoutDashboard, MessageSquare, Map as MapIcon, Settings, Compass, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/advise", label: "AI Advisor", icon: MessageSquare },
  { href: "/roadmap", label: "Career Map", icon: MapIcon },
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [location] = useLocation();

  return (
    <aside className="w-64 h-full glass-panel border-r border-y-0 border-l-0 flex flex-col z-20">
      <div className="p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-lg shadow-primary/20">
          <Compass className="text-white w-6 h-6" />
        </div>
        <div>
          <h1 className="text-xl font-bold font-mono tracking-tight text-gradient">Entresst</h1>
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-secondary" /> AI Powered
          </p>
        </div>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href}>
              <a
                data-testid={`nav-${item.label.toLowerCase().replace(' ', '-')}`}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                <item.icon className={cn(
                  "w-5 h-5 transition-transform duration-300",
                  isActive ? "scale-110" : "group-hover:scale-110"
                )} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}
              </a>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mt-auto">
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
          <h3 className="text-sm font-semibold mb-1">Pro Plan</h3>
          <p className="text-xs text-muted-foreground mb-3">Unlock advanced AI models and deep skill analysis.</p>
          <button className="w-full py-2 bg-gradient-to-r from-primary to-secondary text-white text-xs font-semibold rounded-lg shadow-lg hover:shadow-primary/25 transition-all">
            Upgrade
          </button>
        </div>
      </div>
    </aside>
  );
}