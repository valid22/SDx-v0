from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from MASDA.api.routes import router


# Create FastAPI application
app = FastAPI(
    title="MASDA API",
    description="""
    **Multi-Agent Infra Arch Solution Design Agent**

    MASDA is an AI-driven Infrastructure as a Service platform that converts
    user intent into secure, cost-optimized, deployable multi-cloud architecture.

    ## Features

    - **Multi-cloud support**: AWS, GCP, Azure
    - **Graph-native output**: Nodes and edges for UI visualization
    - **Per-node cost attribution**: Detailed cost breakdown
    - **Security-by-design**: Compliance mapping and controls
    - **Deterministic orchestration**: Bounded AI loops with audit logs

    ## Workflow

    1. Submit intent via `POST /api/v1/intent`
    2. Check status via `GET /api/v1/status/{id}`
    3. Get output via `GET /api/v1/output/{id}`
    4. Deploy via `POST /api/v1/deploy/{id}`
    """,
    version="0.1.0",
    docs_url="/docs",
    redoc_url="/redoc",
)

# Configure CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Configure for production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(router)


@app.get("/")
async def root():
    """Root endpoint with API info."""
    return {
        "name": "MASDA API",
        "version": "0.1.0",
        "description": "Multi-Agent Infra Arch Solution Design Agent",
        "docs": "/docs",
        "health": "/api/v1/health",
    }
