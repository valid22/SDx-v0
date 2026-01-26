"""Vercel serverless entry point for MASDA API."""

import sys
import os

# Ensure MASDA package is importable
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from MASDA.api.main import app

# Vercel expects the app to be named 'app' or 'handler'
handler = app

