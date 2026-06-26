import React from "react";
import { Layers, CheckCircle, Loader } from "lucide-react";

export function PipelineFlow({ nodes, subQueries, sources }) {
  return (
    <section className="bg-slate-900/30 border border-slate-900/60 p-6 rounded-2xl backdrop-blur-sm shadow-md">
      <h3 className="text-sm font-semibold tracking-wider text-slate-400 uppercase mb-6 flex items-center gap-2">
        <Layers className="w-4 h-4 text-indigo-400" />
        Pipeline Node Execution Stream
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Planner Node */}
        <div className={`p-4 rounded-xl border transition duration-300 ${
          nodes.planner.state === "completed" ? "bg-indigo-950/20 border-indigo-500/50" :
          nodes.planner.state === "running" ? "bg-amber-950/10 border-amber-500/60 animate-pulse" :
          "bg-slate-900/40 border-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Node 1: Planner</span>
            {nodes.planner.state === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
            {nodes.planner.state === "running" && <Loader className="w-4 h-4 text-amber-500 animate-spin" />}
          </div>
          <h4 className="font-medium text-sm text-slate-200 mb-1">Formulate Sub-queries</h4>
          <p className="text-xs text-slate-500">Deconstructs topics into 3-5 distinct keywords.</p>
          {subQueries.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800/60 flex flex-col gap-1">
              {subQueries.map((q, i) => (
                <span key={i} className="text-[10px] bg-slate-900 text-indigo-300 px-2 py-1 rounded border border-indigo-900/30 truncate">
                  {q}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Searcher Node */}
        <div className={`p-4 rounded-xl border transition duration-300 ${
          nodes.searcher.state === "completed" ? "bg-indigo-950/20 border-indigo-500/50" :
          nodes.searcher.state === "running" ? "bg-amber-950/10 border-amber-500/60 animate-pulse" :
          "bg-slate-900/40 border-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Node 2: Searcher</span>
            {nodes.searcher.state === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
            {nodes.searcher.state === "running" && <Loader className="w-4 h-4 text-amber-500 animate-spin" />}
          </div>
          <h4 className="font-medium text-sm text-slate-200 mb-1">Tavily Web Search</h4>
          <p className="text-xs text-slate-500">Queries APIs and gathers top relevant source links.</p>
          {sources.length > 0 && (
            <div className="mt-3 pt-3 border-t border-slate-800/60">
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/30 border border-emerald-900/40 px-2.5 py-1 rounded-full">
                {sources.length} Sources Found
              </span>
            </div>
          )}
        </div>

        {/* Analyzer Node */}
        <div className={`p-4 rounded-xl border transition duration-300 ${
          nodes.analyzer.state === "completed" ? "bg-indigo-950/20 border-indigo-500/50" :
          nodes.analyzer.state === "running" ? "bg-amber-950/10 border-amber-500/60 animate-pulse" :
          "bg-slate-900/40 border-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Node 3: Analyzer</span>
            {nodes.analyzer.state === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
            {nodes.analyzer.state === "running" && <Loader className="w-4 h-4 text-amber-500 animate-spin" />}
          </div>
          <h4 className="font-medium text-sm text-slate-200 mb-1">Data Synthesis</h4>
          <p className="text-xs text-slate-500">Identifies patterns, trends and conflicting claims.</p>
        </div>

        {/* Writer Node */}
        <div className={`p-4 rounded-xl border transition duration-300 ${
          nodes.writer.state === "completed" ? "bg-indigo-950/20 border-indigo-500/50" :
          nodes.writer.state === "running" ? "bg-amber-950/10 border-amber-500/60 animate-pulse" :
          "bg-slate-900/40 border-slate-800"
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400">Node 4: Writer</span>
            {nodes.writer.state === "completed" && <CheckCircle className="w-4 h-4 text-emerald-500" />}
            {nodes.writer.state === "running" && <Loader className="w-4 h-4 text-amber-500 animate-spin" />}
          </div>
          <h4 className="font-medium text-sm text-slate-200 mb-1">Markdown Compiler</h4>
          <p className="text-xs text-slate-500">Formats structured reports with citations.</p>
        </div>
      </div>
    </section>
  );
}
