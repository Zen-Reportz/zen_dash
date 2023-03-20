from fastapi import APIRouter, Request
from fastapi.websockets import WebSocket
from pages.box_page.row_one import view as v
from zen_dash import instances as i
from zen_dash import page as p
router = APIRouter(
    prefix=v.prefix,
    tags=["row_one"],
    responses={404: {"description": "Not found"}},
)

# @router.get(v.FirstBox.url_websocket())
# async def websocket_get():
#     pass

@router.get(v.FirstBox.websocket_url())
async def websocket_endpoint(websocket: WebSocket):
    await v.FirstBox.websocket(websocket)


@router.post(v.FirstBox.url(), response_model=i.ReturnData)
async def d3(res: Request):
    return v.FirstBox.view()



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
