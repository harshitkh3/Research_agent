import sys
from pathlib import Path

# Add project root to sys.path to allow running this script directly
sys.path.append(str(Path(__file__).resolve().parents[2]))

import asyncio
import json
import logging
from fastapi import FastAPI, Query
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from backend.agent.graph import research_app

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("server")

app = FastAPI(title="Research Agent API")

# Enable CORS for the React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/research/stream")
async def stream_research(topic: str = Query(..., description="The research topic to analyze")):
    logger.info(f"Received research request for topic: {topic}")
    
    async def event_generator():
        try:
            inputs = {"topic": topic}
            # Stream the graph updates asynchronously
            async for event in research_app.astream(inputs, stream_mode="updates"):
                # event is a dictionary containing the node output: e.g. {"planner": {"sub_queries": [...]}}
                for node_name, state_update in event.items():
                    logger.info(f"Node '{node_name}' finished. Sending updates...")
                    yield f"data: {json.dumps({'node': node_name, 'update': state_update})}\n\n"
                    # Small delay to ensure chunk delivery is smooth
                    await asyncio.sleep(0.05)
            
            yield f"data: {json.dumps({'status': 'done'})}\n\n"
        except Exception as e:
            logger.error(f"Error during graph execution: {e}", exc_info=True)
            yield f"data: {json.dumps({'error': str(e)})}\n\n"

    return StreamingResponse(event_generator(), media_type="text/event-stream")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.app.main:app", host="127.0.0.1", port=8000, reload=True)
