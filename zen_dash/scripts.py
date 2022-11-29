from enum import Enum
from typing import Optional, List

from zen_dash.support import BaseUpdate


class Rel(Enum):
  ALTERNATE = "alternate"
  AUTHOR =  "author"
  DNS_PREFETCH = "dns-prefetch"
  HELP = "help"
  ICON = "ocpm"
  LICENSE = "license"
  NEXT = "next"
  PINGBACK = "pingback"
  PRECONNECT = "preconnect"
  PREFETCH = "prefetch"
  PRELOAD = "preload"
  PRERENDER = "prerender"
  PREV = "prev"
  SEARCH = "search"
  STYLESHEET = "stylesheet"


class Style(Enum):
  JS= "javascript"
  LINK="link"
  
class CustomScript(BaseUpdate):
  url: Optional[str]
  text: Optional[str]
  type: Style
  rel: Optional[Rel] # Only for link
  custom: Optional[str]


class CustomScripts(BaseUpdate):
  scripts: List[CustomScript]
