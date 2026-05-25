"use client";
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card";
import { ClipboardCheck, CheckCircle2, Circle, ArrowUpRight } from "lucide-react";

interface ChecklistItem {
  id: string;
  label: string;
  isRequiredFor: "APS" | "UNI-ASSIST" | "VISA";
  isCompleted: boolean;
}

export default function ApsChecklistCard() {
  const [tasks, setTasks] = useState<ChecklistItem[]>([
    { id: "task-1", label: "Notarized Degree/Transcript Copies", isRequiredFor: "UNI-ASSIST", isCompleted: false },
    { id: "task-2", label: "University Student Portal Login Credentials", isRequiredFor: "APS", isCompleted: false },
    { id: "task-3", label: "Certified German/English Translations", isRequiredFor: "VISA", isCompleted: false },
    { id: "task-4", label: "Biometric Passport Photos & Euro-formatting", isRequiredFor: "VISA", isCompleted: false },
  ]);

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, isCompleted: !t.isCompleted } : t));
  };

  const completedCount = tasks.filter(t => t.isCompleted).length;
  const progressPercent = Math.round((completedCount / tasks.length) * 100);

  return (
    /* OUTER FRAME: Now perfectly matches the glass effects, dimensions, and orange shadows of Cards 2 and 3 */
    <Card id="apsChecklist" className="max-w-xl w-full min-h-[30rem] flex flex-col justify-between p-10 border-white/20 border-[1px] bg-white/15 backdrop-blur-xl shadow-[0_20px_50px_rgba(180,60,0,0.2)] transition-all hover:bg-white/20">
      
      {/* HEADER ROW BLOCK */}
      <CardHeader className="p-0">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-x-2">
            <CardTitle className="text-2xl">APS Document Checklist</CardTitle>
            <ClipboardCheck className="text-zinc-700 dark:text-zinc-300 w-5 h-5" />
          </div>
          
          {/* Progress metric badge pill matching your design tokens */}
          <span className="text-[11px] font-bold px-2.5 py-1 rounded-full bg-[#ff7614]/10 text-[#ff7614] border border-[#ff7614]/20 shadow-[0_0_10px_rgba(255,118,20,0.05)]">
            {progressPercent}% Ready
          </span>
        </div>
        <CardDescription className="text-lg text-gray-600 mt-1">
          "Track and verify legal document formatting parameters before initiating formal submissions."
        </CardDescription>
      </CardHeader>

      {/* MID SECTION: RE-STYLED SECTIONS MATCHING THE MONTH MATRIX AND SELECT DROPDOWNS */}
      <CardContent className="p-0 mt-6 flex-1 flex flex-col justify-center space-y-3 w-full">
        {tasks.map((item) => (
          <div 
            key={item.id}
            onClick={() => toggleTask(item.id)}
            className="flex items-center justify-between p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 w-full cursor-pointer hover:border-zinc-300 dark:hover:border-zinc-700 transition-all select-none group"
          >
            <div className="flex items-center gap-x-3 max-w-[75%]">
              {item.isCompleted ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
              ) : (
                <Circle className="w-5 h-5 text-zinc-300 dark:text-zinc-700 group-hover:text-zinc-400 shrink-0" />
              )}
              <span className={`text-sm font-semibold tracking-tight truncate transition-colors ${
                item.isCompleted ? 'text-zinc-400 line-through' : 'text-zinc-800 dark:text-zinc-200'
              }`}>
                {item.label}
              </span>
            </div>

            {/* Authority Sub-badges */}
            <span className="text-[10px] tracking-wider px-2.5 py-0.5 font-bold rounded border border-zinc-200 dark:border-zinc-800 text-zinc-400 bg-white dark:bg-zinc-900 shrink-0 shadow-sm">
              {item.isRequiredFor}
            </span>
          </div>
        ))}
      </CardContent>

      {/* FOOTER ACTION ELEMENT */}
      <div className="mt-5 pt-4 border-t border-zinc-200/30 dark:border-zinc-800/30 flex justify-end">
        <button className="text-xs font-bold text-[#ff7614] hover:text-[#e0630f] transition-colors flex items-center gap-x-1 cursor-pointer group">
          <span>Launch Complete Verification Vault</span>
          <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      </div>

    </Card>
  );
}