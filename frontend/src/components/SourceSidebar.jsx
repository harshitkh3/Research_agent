import React from "react";
import { ExternalLink } from "lucide-react";

export function SourceSidebar({ sources }) {
  if (sources.length === 0) return null;

  return (
    <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-slate-800 pt-6 md:pt-0 md:pl-6 flex flex-col gap-6">
      <h4 className="text-sm font-bold tracking-wider text-slate-400 uppercase flex items-center gap-2">
        <ExternalLink className="w-4 h-4 text-indigo-400" />
        Sources & Grounding URLs ({sources.length})
      </h4>

      <div className="flex flex-col gap-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {sources.map((src, i) => (
          <a
            key={i}
            href={src.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-slate-900/40 hover:bg-slate-900/80 border border-slate-850 hover:border-slate-800 p-4 rounded-xl transition flex flex-col gap-1.5 group"
          >
            <div className="flex justify-between items-start gap-2">
              <span className="text-xs font-semibold text-slate-300 group-hover:text-indigo-400 transition line-clamp-1">
                {src.title || "Search Result"}
              </span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-indigo-400 flex-shrink-0" />
            </div>
            <p className="text-[10px] text-slate-500 truncate">{src.url}</p>
            {src.content && (
              <p className="text-[11px] text-slate-400 line-clamp-2 mt-1 leading-normal">
                {src.content}
              </p>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
