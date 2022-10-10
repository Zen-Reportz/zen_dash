from enum import Enum
from pydantic import BaseModel
from typing import Optional, List




class Style(Enum):
  JS= "javascript"
  style ="css"

class CustomScript(BaseModel):
  url: Optional[str]
  text: Optional[str]
  type: Style


class CustomScripts(BaseModel):
  scripts: List[CustomScript]
