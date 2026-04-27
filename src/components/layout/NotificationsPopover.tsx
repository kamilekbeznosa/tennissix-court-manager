import { Bell, Check, X, CheckCheck, Info, AlertTriangle, CircleAlert, CircleCheck } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useNotifications, AppNotification } from "@/contexts/NotificationsContext";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const toneIcon: Record<AppNotification["tone"], { icon: React.ComponentType<{ className?: string }>; cls: string }> = {
  info: { icon: Info, cls: "bg-court-hard/15 text-court-hard" },
  success: { icon: CircleCheck, cls: "bg-success/15 text-success" },
  warning: { icon: AlertTriangle, cls: "bg-warning/15 text-warning" },
  danger: { icon: CircleAlert, cls: "bg-destructive/15 text-destructive" },
};

export const NotificationsPopover = () => {
  const { items, unread, markAllRead, markRead, remove } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative" aria-label="Powiadomienia">
          <Bell className="h-5 w-5" />
          {unread > 0 && (
            <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] px-1 rounded-full bg-accent text-[10px] font-bold text-accent-foreground flex items-center justify-center shadow-soft">
              {unread}
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[380px] p-0 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div>
            <div className="font-semibold text-sm">Powiadomienia</div>
            <div className="text-xs text-muted-foreground">{unread} nieprzeczytanych</div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              markAllRead();
              toast.success("Wszystkie oznaczone jako przeczytane");
            }}
            disabled={unread === 0}
          >
            <CheckCheck className="h-4 w-4" /> Oznacz wszystkie
          </Button>
        </div>

        <div className="max-h-[420px] overflow-y-auto divide-y divide-border">
          {items.length === 0 && (
            <div className="px-4 py-12 text-center text-sm text-muted-foreground">
              Brak powiadomień
            </div>
          )}
          {items.map((n) => {
            const T = toneIcon[n.tone];
            const Icon = T.icon;
            return (
              <div
                key={n.id}
                className={cn(
                  "group flex items-start gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors cursor-pointer",
                  !n.read && "bg-primary/5",
                )}
                onClick={() => markRead(n.id)}
              >
                <div className={cn("h-9 w-9 rounded-lg flex items-center justify-center shrink-0", T.cls)}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <div className="font-semibold text-sm truncate">{n.title}</div>
                    {!n.read && <span className="h-2 w-2 rounded-full bg-primary shrink-0" />}
                  </div>
                  <div className="text-xs text-muted-foreground truncate">{n.desc}</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">{n.time}</div>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  {!n.read && (
                    <button
                      onClick={(e) => { e.stopPropagation(); markRead(n.id); }}
                      className="h-6 w-6 rounded-md hover:bg-primary/10 text-primary flex items-center justify-center"
                      aria-label="Oznacz jako przeczytane"
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>
                  )}
                  <button
                    onClick={(e) => { e.stopPropagation(); remove(n.id); }}
                    className="h-6 w-6 rounded-md hover:bg-destructive/10 text-destructive flex items-center justify-center"
                    aria-label="Usuń"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="border-t border-border px-4 py-2 bg-secondary/30">
          <Button variant="ghost" size="sm" className="w-full text-xs">
            Zobacz wszystkie powiadomienia
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};
