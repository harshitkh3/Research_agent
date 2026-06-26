import React from "react";
import { Cpu } from "lucide-react";

export function Header({ status }) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-900 bg-slate-950/80 backdrop-blur-md px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-purple-600 to-indigo-600 p-2.5 rounded-xl shadow-lg shadow-indigo-500/25">
          <Cpu className="w-6 h-6 text-white animate-pulse" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-purple-400 via-indigo-300 to-blue-400 bg-clip-text text-transparent">
            AI Research Agent
          </h1>
          <p className="text-xs text-slate-500">Autonomous Web Synthesis & Report Compiler</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${status === "running" ? "bg-amber-500 animate-ping" : status === "completed" ? "bg-emerald-500" : "bg-indigo-500"}`}></span>
        <span className="text-xs text-slate-400 font-medium">
          {status === "idle" && "Ready"}
          {status === "running" && "Executing Graph..."}
          {status === "completed" && "Execution Finished"}
          {status === "error" && "Error Encountered"}
        </span>
      </div>
    </header>
  );
}
