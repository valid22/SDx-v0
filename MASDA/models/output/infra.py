from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field
from enum import Enum

class InfraNodeType(str, Enum):
    compute = "compute"
    storage = "storage"
    database = "database"
    network = "network"
    security = "security"
    observability = "observability"
    messaging = "messaging"
    load_balancer = "load_balancer"
    cache = "cache"
    serverless = "serverless"
    other = "other"


class InfraEdgeType(str, Enum):
    network_flow = "network_flow"
    data_flow = "data_flow"
    dependency = "dependency"
    trust_boundary = "trust_boundary"
