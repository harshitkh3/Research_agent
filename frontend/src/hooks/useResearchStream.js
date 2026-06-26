import { useState } from "react";

export function useResearchStream() {
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("idle"); // idle, running, completed, error
  const [error, setError] = useState(null);
  
  // Graph node execution tracking
  const [nodes, setNodes] = useState({
    planner: { state: "idle", data: null },
    searcher: { state: "idle", data: null },
    analyzer: { state: "idle", data: null },
    writer: { state: "idle", data: null }
  });

  const [report, setReport] = useState("");
  const [subQueries, setSubQueries] = useState([]);
  const [sources, setSources] = useState([]);

  const startResearch = (topic) => {
    if (!topic.trim()) return;

    // Reset state
    setLoading(true);
    setStatus("running");
    setError(null);
    setReport("");
    setSubQueries([]);
    setSources([]);
    setNodes({
      planner: { state: "running", data: null },
      searcher: { state: "idle", data: null },
      analyzer: { state: "idle", data: null },
      writer: { state: "idle", data: null }
    });

    const encodedTopic = encodeURIComponent(topic);
    const eventSource = new EventSource(`http://127.0.0.1:8000/api/research/stream?topic=${encodedTopic}`);

    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        
        if (data.error) {
          setError(data.error);
          setStatus("error");
          setLoading(false);
          eventSource.close();
          return;
        }

        if (data.status === "done") {
          setStatus("completed");
          setLoading(false);
          eventSource.close();
          return;
        }

        const { node, update } = data;
        
        if (node === "planner") {
          setSubQueries(update.sub_queries || []);
          setNodes(prev => ({
            ...prev,
            planner: { state: "completed", data: update.sub_queries },
            searcher: { state: "running", data: null }
          }));
        } else if (node === "searcher") {
          setSources(update.search_results || []);
          setNodes(prev => ({
            ...prev,
            searcher: { state: "completed", data: update.search_results },
            analyzer: { state: "running", data: null }
          }));
        } else if (node === "analyzer") {
          setNodes(prev => ({
            ...prev,
            analyzer: { state: "completed", data: update.analysis },
            writer: { state: "running", data: null }
          }));
        } else if (node === "writer") {
          setReport(update.report || "");
          setNodes(prev => ({
            ...prev,
            writer: { state: "completed", data: update.report }
          }));
        }

      } catch (err) {
        console.error("Failed to parse event:", err);
      }
    };

    eventSource.onerror = (err) => {
      console.error("EventSource error:", err);
      setError("Failed to connect to the research server. Make sure the FastAPI backend is running.");
      setStatus("error");
      setLoading(false);
      
      // Mark current active nodes as error
      setNodes(prev => {
        const updated = { ...prev };
        Object.keys(updated).forEach(k => {
          if (updated[k].state === "running") {
            updated[k].state = "error";
          }
        });
        return updated;
      });

      eventSource.close();
    };

    return eventSource;
  };

  const clearResearch = () => {
    setReport("");
    setSubQueries([]);
    setSources([]);
    setStatus("idle");
    setNodes({
      planner: { state: "idle", data: null },
      searcher: { state: "idle", data: null },
      analyzer: { state: "idle", data: null },
      writer: { state: "idle", data: null }
    });
  };

  return {
    loading,
    status,
    error,
    nodes,
    report,
    subQueries,
    sources,
    startResearch,
    clearResearch
  };
}
