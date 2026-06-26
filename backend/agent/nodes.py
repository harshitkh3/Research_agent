import asyncio
from dotenv import load_dotenv
from langchain_google_genai import ChatGoogleGenerativeAI
from tavily import AsyncTavilyClient
from backend.agent.state import ResearchState, QueryList

load_dotenv()

llm = ChatGoogleGenerativeAI(model="gemini-2.5-flash", temperature=0)

# Enforce a strict structure for the planner's output
planner_llm = llm.with_structured_output(QueryList)

# Plan the queries 
def plan_queries_node(state: ResearchState):
    prompt = f"""You are an expert research planner. Given the topic: '{state['topic']}', 
    break it down into 3-5 distinct, targeted sub-queries to gather comprehensive web data."""
    
    response = planner_llm.invoke(prompt)
    return {"sub_queries": response.queries}

# Use Tavily to get search results
async def get_search_results_node(state: ResearchState):
    # Initialize the asynchronous client
    tavily_client = AsyncTavilyClient() 
    
    # Define a helper coroutine to execute an individual search
    async def fetch_query(query: str):
        try:
            response = await tavily_client.search(
                query=query,
                search_depth="advanced",
                max_results=3
            )
            return response.get("results", [])
        except Exception as e:
            print(f"Search failed for query '{query}': {e}")
            return []

    # Fire all search API calls at the exact same time
    tasks = [fetch_query(q) for q in state["sub_queries"]]
    search_responses = await asyncio.gather(*tasks)
    
    # Flatten out the list of lists into a single aggregated results array
    aggregated_results = [item for sublist in search_responses for item in sublist]
    
    print(f"Successfully retrieved {len(aggregated_results)} total sources concurrently.")
    return {'search_results': aggregated_results}

def analyze_sources_node(state: ResearchState):
   context = '\n'.join([f"Source : {r['url']}\n Content : {r['content']}\n---" for r in state['search_results']] )
   prompt=f"""You are a senior data analyst. Synthesize the following raw web data regarding '{state['topic']}'.
    Identify core patterns, conflicting viewpoints, and essential statistics. 
    Maintain source integrity.
    
    Raw Data:
    {context}"""
   response = llm.invoke(prompt)
   return {"analysis": response.content}

def write_report_node(state: ResearchState):
    prompt = f"""You are a professional technical writer. Transform the following analysis into a highly structured, comprehensive market/research report on '{state['topic']}'.
    
    Use markdown headings (##, ###), bullet points, and include a 'Sources' reference block at the bottom using urls from the initial phase.
    
    Analysis Draft:
    {state['analysis']}"""
    
    response = llm.invoke(prompt)
    return {"report": response.content}
