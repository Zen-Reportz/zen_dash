from enum import Enum
from typing import Optional, List

from zen_dash.support import BaseUpdate




class Style(Enum):
  JS= "javascript"
  STYLE ="css"

class CustomScript(BaseUpdate):
  url: Optional[str]
  text: Optional[str]
  type: Style


class CustomScripts(BaseUpdate):
  scripts: List[CustomScript]
