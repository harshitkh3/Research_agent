from langgraph.graph import StateGraph, START, END
from backend.agent.state import ResearchState
from backend.agent.nodes import (
    plan_queries_node, 
    get_search_results_node, 
    analyze_sources_node, 
    write_report_node
)

workflow = StateGraph(ResearchState)

# Add defined functional nodes
workflow.add_node("planner", plan_queries_node)
workflow.add_node("searcher", get_search_results_node)
workflow.add_node("analyzer", analyze_sources_node)
workflow.add_node("writer", write_report_node)

# Map edge connections linearly
workflow.add_edge(START, "planner")
workflow.add_edge("planner", "searcher")
workflow.add_edge("searcher", "analyzer")
workflow.add_edge("analyzer", "writer")
workflow.add_edge("writer", END)

# Compile everything into an executable application
research_app = workflow.compile()
