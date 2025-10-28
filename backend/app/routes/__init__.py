from .aiml import router as aiml_router
from .contact import router as contact_router
from .dsa import router as dsa_router
from .os import router as os_router
from .sql import router as sql_router

__all__ = ['aiml_router', 'contact_router', 'dsa_router', 'os_router', 'sql_router']