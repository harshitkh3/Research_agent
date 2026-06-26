import React, { useState } from "react";
import { AlertCircle } from "lucide-react";
import { Header } from "./components/Header.jsx";
import { ResearchForm } from "./components/ResearchForm.jsx";
import { PipelineFlow } from "./components/PipelineFlow.jsx";
import { ReportView } from "./components/ReportView.jsx";
import { SourceSidebar } from "./components/SourceSidebar.jsx";
import { useResearchStream } from "./hooks/useResearchStream.js";
import { handleDownloadPDF } from "./utils/pdfExporter.js";

function App() {
  const [topic, setTopic] = useState("The emergence of Solid-State Batteries in EV markets by 2026");
  
  const {
    loading,
    status,
    error,
    nodes,
    report,
    subQueries,
    sources,
    startResearch,
    clearResearch
  } = useResearchStream();

  const presets = [
    "The emergence of Solid-State Batteries in EV markets by 2026",
    "Latest breakthroughs in Nuclear Fusion energy production",
    "SpaceX Starship orbital launches and Mars colonization timeline",
    "Impact of generative AI agents on software engineering by 2027",
    'New'
  ];

  const handleSearch = () => {
    startResearch(topic);
  };

  const handleExportPDF = () => {
    const reportHtml = document.getElementById("report-content-body")?.innerHTML || "";
    handleDownloadPDF(reportHtml);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-indigo-500 selection:text-white">
      {/* Background radial glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      <Header status={status} />

      {/* Content wrapper */}
      <main className="flex-grow max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col gap-8 relative z-10">
        
        {/* Search input container */}
        <ResearchForm 
          topic={topic}
          setTopic={setTopic}
          loading={loading}
          onSearch={handleSearch}
          presets={presets}
        />

        {/* Pipeline Execution Flow */}
        {(status !== "idle" || loading) && (
          <PipelineFlow 
            nodes={nodes}
            subQueries={subQueries}
            sources={sources}
          />
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-950/20 border border-red-900/50 p-4 rounded-xl flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-red-400 text-sm">Failed to generate report</h4>
              <p className="text-xs text-red-300 mt-1">{error}</p>
            </div>
          </div>
        )}

        {/* Report Output Panel */}
        {report && (
          <section className="bg-slate-900/20 border border-slate-900 p-6 md:p-10 rounded-2xl shadow-2xl flex flex-col md:flex-row gap-8">
            <ReportView 
              report={report}
              onClear={clearResearch}
              onDownloadPDF={handleExportPDF}
            />
            <SourceSidebar sources={sources} />
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 mt-12 text-center text-xs text-slate-600 bg-slate-950">
        <p>© 2026 Built with LangGraph, FastAPI, and React.</p>
      </footer>
    </div>
  );
}

export default App;
