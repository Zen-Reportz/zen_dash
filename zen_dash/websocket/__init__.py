import asyncio
import json
from typing import List, Type

from fastapi import WebSocket
from pydantic import BaseModel, root_validator
from zen_dash import ZenPage
from zen_dash.encoder import JsonEncoder

async def consumer(queue):
    
    while True:
        item = await queue.get()
        if item is None:
            break
        

class PageW(BaseModel):
    page: ZenPage
    page_name: str

    @root_validator
    def validator_type_match(cls, field_values):
        if ('page' not in field_values["page_name"]):
            raise ValueError("You have selected InstanceType.BOX, and box_data is missing")
        
        return field_values

class PageInfo(BaseModel):
    info: List[PageW]


async def send_data(websocket: WebSocket, pages: List[ZenPage], myencoder=JsonEncoder):
    page_dict = {}
    for p in pages:
        if p.subtab_number is None:
            page_name = f"page_{p.tab_number}"
        else:
            page_name = f"page_{p.tab_number}_{p.subtab_number}"
        page_dict[page_name] = p
        
    data = await websocket.receive_json()
    print(data)
    PAGE = page_dict.get(data["page"])
    if PAGE:
        async for key, value in run_websocket_data(PAGE, data):
            v = value.dict()
            v1 = json.dumps(v, cls=myencoder)
            await websocket.send_json({key: v1})

async def run_func(d, wc,p):
    v = await wc.view(d)
    return f"{wc.full_url()}$ZenLookup${p}", v

async def run_websocket_data(page:Type[ZenPage], data:dict):
    p = data["page"]
    d = page.pydantic_class(**data)
    

    calls = [ run_func(d, wc, p) for wc in page.websocket_calls]
    for coro in asyncio.as_completed(calls):
        result = await coro
        yield result
