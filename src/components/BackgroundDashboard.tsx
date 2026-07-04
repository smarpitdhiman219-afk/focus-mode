import { CheckCircle2, Circle, Clock, Zap, MoreHorizontal } from "lucide-react";

interface Task {
  id: number;
  title: string;
  time: string;
  completed: boolean;
  category: string;
  categoryColor: string;
}

const tasks: Task[] = [
  { id: 1, title: "Morning Standup", time: "9:00 AM", completed: true, category: "Meeting", categoryColor: "bg-emerald-500/20 text-emerald-400" },
  { id: 2, title: "Review Pull Requests", time: "9:30 AM", completed: true, category: "Dev", categoryColor: "bg-blue-500/20 text-blue-400" },
  { id: 3, title: "Designing UI Mockups", time: "10:00 AM", completed: false, category: "Design", categoryColor: "bg-violet-500/20 text-violet-400" },
  { id: 4, title: "Client Presentation", time: "1:00 PM", completed: false, category: "Meeting", categoryColor: "bg-emerald-500/20 text-emerald-400" },
  { id: 5, title: "Code Review Session", time: "2:30 PM", completed: false, category: "Dev", categoryColor: "bg-blue-500/20 text-blue-400" },
  { id: 6, title: "Write Documentation", time: "4:00 PM", completed: false, category: "Writing", categoryColor: "bg-amber-500/20 text-amber-400" },
];

const stats = [
  { label: "Focus", value: "3.5h", icon: Zap, color: "text-yellow-400" },
  { label: "Tasks", value: "8/12", icon: CheckCircle2, color: "text-emerald-400" },
  { label: "Time", value: "6h", icon: Clock, color: "text-blue-400" },
];

export default function BackgroundDashboard() {
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="h-full w-full bg-zinc-950 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-5 pt-6 pb-4">
        <div className="flex items-center justify-between mb-1">
          <h1 className="text-zinc-100 text-xl font-bold">Today</h1>
          <button className="p-2 rounded-full bg-zinc-900 hover:bg-zinc-800 transition-colors">
            <MoreHorizontal className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
        <p className="text-zinc-500 text-sm">{dateStr}</p>
      </div>

      {/* Stats Row */}
      <div className="px-5 pb-4">
        <div className="flex gap-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex-1 bg-zinc-900/80 rounded-2xl p-3 flex flex-col items-center gap-1.5"
            >
              <stat.icon className={`w-4 h-4 ${stat.color}`} />
              <span className="text-zinc-100 text-lg font-bold">{stat.value}</span>
              <span className="text-zinc-600 text-xs">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div className="flex-1 px-5 pb-6 overflow-y-auto">
        <h2 className="text-zinc-400 text-xs font-semibold uppercase tracking-wider mb-3">
          Your Tasks
        </h2>
        <div className="space-y-2.5">
          {tasks.map((task) => (
            <div
              key={task.id}
              className={`flex items-center gap-3 p-3.5 rounded-2xl transition-all ${
                task.completed
                  ? "bg-zinc-900/40 opacity-50"
                  : task.title === "Designing UI Mockups"
                  ? "bg-zinc-900/80 border border-violet-500/20"
                  : "bg-zinc-900/60"
              }`}
            >
              {task.completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-600 shrink-0" />
              )}
              <div className="flex-1 min-w-0">
                <p
                  className={`text-sm font-medium truncate ${
                    task.completed ? "text-zinc-600 line-through" : "text-zinc-200"
                  }`}
                >
                  {task.title}
                </p>
                <p className="text-zinc-600 text-xs mt-0.5">{task.time}</p>
              </div>
              <span
                className={`text-[10px] font-medium px-2 py-1 rounded-full shrink-0 ${task.categoryColor}`}
              >
                {task.category}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Tab Bar */}
      <div className="px-5 py-3 bg-zinc-900/90 border-t border-zinc-800/50 flex justify-around items-center">
        {[
          { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", active: false },
          { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", active: true },
          { icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4", active: false },
          { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", active: false },
        ].map((item, i) => (
          <button
            key={i}
            className={`p-2 rounded-xl transition-colors ${
              item.active ? "bg-violet-500/20" : "hover:bg-zinc-800"
            }`}
          >
            <svg
              className={`w-5 h-5 ${item.active ? "text-violet-400" : "text-zinc-500"}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}
