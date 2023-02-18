from fastapi import APIRouter, Request, WebSocket
from pages.box_page.row_one import view as v
from zen_dash import instances as i
from zen_dash import page as p
router = APIRouter(
    prefix=v.prefix,
    tags=["row_one"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.FirstBox.url(), response_model=i.ReturnData)
async def d3(res: Request):
    return v.FirstBox.view()

@router.websocket(v.FirstBox.url())
async def d3(websocket: WebSocket):
    await websocket.accept()
    while True:
        # data = await websocket.receive_text()
        await websocket.send_text(v.FirstBox.websocket())

@router.post(v.FirstBoxDialog.url(), response_model=p.Page)
async def d3(res: Request):
    return v.FirstBoxDialog.view()


@router.post(v.SecondBox.url(), response_model=i.ReturnData)
async def d3():
    return v.SecondBox.view()

@router.post(v.ThirdBox.url(), response_model=i.ReturnData)
async def d3():
    return v.ThirdBox.view()


@router.post(v.ForthBox.url(), response_model=i.ReturnData)
async def d3():
    return v.ForthBox.view()
