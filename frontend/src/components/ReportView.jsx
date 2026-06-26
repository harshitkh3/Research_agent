import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { BookOpen, Copy, Check, FileDown, RotateCcw } from "lucide-react";

export function ReportView({ report, onClear, onDownloadPDF }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(report);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex-grow md:w-2/3">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
        <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-400" />
          Research Compilation Report
        </h3>
        <div className="flex items-center gap-3">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition bg-slate-900/60 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copy Markdown</span>
              </>
            )}
          </button>
          <button
            onClick={onDownloadPDF}
            className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-indigo-400 transition bg-slate-900/60 border border-slate-800 hover:border-slate-700 px-3 py-1.5 rounded-lg"
          >
            <FileDown className="w-3.5 h-3.5" />
            <span>Download PDF</span>
          </button>
          <button
            onClick={onClear}
            className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-300 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear Result
          </button>
        </div>
      </div>

      {/* Render Markdown with beautiful styles */}
      <div id="report-content-body" className="prose prose-invert prose-indigo max-w-none text-slate-300 leading-relaxed space-y-6">
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <h1 className="text-3xl font-extrabold text-white mt-8 mb-4 border-b border-slate-850 pb-2" {...props} />,
            h2: ({node, ...props}) => <h2 className="text-2xl font-bold text-slate-100 mt-8 mb-3" {...props} />,
            h3: ({node, ...props}) => <h3 className="text-xl font-semibold text-slate-200 mt-6 mb-2" {...props} />,
            ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-2 my-4" {...props} />,
            ol: ({node, ...props}) => <ol className="list-decimal pl-5 space-y-2 my-4" {...props} />,
            li: ({node, ...props}) => <li className="text-slate-300 text-sm md:text-base" {...props} />,
            p: ({node, ...props}) => <p className="text-slate-300 text-sm md:text-base leading-relaxed my-4" {...props} />,
            code: ({node, ...props}) => <code className="bg-slate-950 text-indigo-300 px-1.5 py-0.5 rounded font-mono text-sm" {...props} />,
            a: ({node, ...props}) => <a className="text-indigo-400 hover:underline inline-flex items-center gap-0.5" target="_blank" rel="noopener noreferrer" {...props} />
          }}
        >
          {report}
        </ReactMarkdown>
      </div>
    </div>
  );
}
