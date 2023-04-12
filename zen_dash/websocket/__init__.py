import asyncio
import json
from typing import List, Type

from fastapi import WebSocket
from pydantic import BaseModel, root_validator
from zen_dash import ZenPage
from zen_dash.support.encoder import JsonEncoder


async def send_data(websocket: WebSocket, pages: List[ZenPage], myencoder=JsonEncoder):
    page_dict = {}
    for p in pages:
        if p.tab_number is None:
            raise Exception("Tab number is not define in Zen Page")
        
        if p.subtab_number is None:
            page_name = f"page_{p.tab_number}"
        else:
            page_name = f"page_{p.tab_number}_{p.subtab_number}"
        page_dict[page_name] = p
        
    data = await websocket.receive_json()
    PAGE = page_dict.get(data["page"])
    if PAGE:
        async for key, value in run_websocket_data(PAGE, data):
            v = value.dict()
            v1 = json.dumps(v, cls=myencoder)
            await websocket.send_json({key: v1})

async def run_func(d, wc,p):
    if d is None:
        v = await wc.view()
    else:
        v = await wc.view(d)
    return f"{wc.full_url()}$ZenLookup${p}", v

async def run_websocket_data(page:Type[ZenPage], data:dict):
    p = data["page"]
    if page.pydantic_class is None:
        calls = [ run_func(None, wc, p) for wc in page.websocket_calls]
    else:    
        d = page.pydantic_class(**data)
        calls = [ run_func(d, wc, p) for wc in page.websocket_calls]
    
    for coro in asyncio.as_completed(calls):
        result = await coro
        yield result
