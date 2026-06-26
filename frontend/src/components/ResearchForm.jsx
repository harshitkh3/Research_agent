import React from "react";
import { Search, Sparkles, Loader, ArrowRight, Compass } from "lucide-react";

export function ResearchForm({ topic, setTopic, loading, onSearch, presets }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;
    onSearch();
  };

  return (
    <section className="bg-slate-900/40 border border-slate-900 p-6 md:p-8 rounded-2xl backdrop-blur-sm shadow-xl flex flex-col gap-6">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-indigo-400 mt-1 flex-shrink-0" />
        <div>
          <h2 className="text-lg font-semibold text-slate-200">What would you like to research today?</h2>
          <p className="text-sm text-slate-400">Our LangGraph agent will formulate queries, execute searches, filter sources, analyze findings, and write a full report.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-grow">
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-500" />
          <input
            type="text"
            placeholder="Describe your research topic or query..."
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={loading}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-12 pr-4 py-3.5 text-slate-100 placeholder-slate-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition disabled:opacity-50"
          />
        </div>
        <button
          type="submit"
          disabled={loading || !topic.trim()}
          className="bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-8 py-3.5 rounded-xl transition duration-200 shadow-lg shadow-indigo-600/20 disabled:opacity-50 disabled:pointer-events-none flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader className="w-5 h-5 animate-spin" />
              Running...
            </>
          ) : (
            <>
              Launch Agent
              <ArrowRight className="w-5 h-5" />
            </>
          )}
        </button>
      </form>

      {/* Presets */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs text-slate-500 flex items-center gap-1">
          <Compass className="w-3.5 h-3.5" />
          Suggested topics:
        </span>
        {presets.map((preset, idx) => (
          <button
            key={idx}
            onClick={() => setTopic(preset)}
            disabled={loading}
            className="text-xs bg-slate-900 border border-slate-800/80 hover:border-slate-700 text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg transition disabled:opacity-40"
          >
            {preset.length > 50 ? `${preset.substring(0, 50)}...` : preset}
          </button>
        ))}
      </div>
    </section>
  );
}
