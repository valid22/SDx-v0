from typing import List, Optional, Dict, Literal
from pydantic import BaseModel, Field
from enum import Enum


class CloudProvider(str, Enum):
    aws = "aws"
    gcp = "gcp"
    azure = "azure"


class DataSensitivity(str, Enum):
    public = "public"
    internal = "internal"
    confidential = "confidential"
    restricted = "restricted"


class OptimizationPreference(str, Enum):
    cost = "cost"
    performance = "performance"
    balanced = "balanced"


class ExposureLevel(str, Enum):
    public = "public"
    private = "private"
    internal = "internal"