from fastapi import APIRouter, Depends, Request, HTTPException
from fastapi.websockets import WebSocket
from pages.box_page.row_one import view as v
from zen_dash.auth import auth_required
from zen_dash.objects import instances as i
from zen_dash import page as p

router = APIRouter(
    prefix=v.prefix,
    tags=["row_one"],
    dependencies=[Depends(auth_required)],
    responses={404: {"description": "Not found"}},
)

# @router.get(v.FirstBox.url_websocket())
# async def websocket_get():
#     pass

@router.post(v.FirstBox.url())
async def d3(b: v.BoxInput):
    # x==3
    # raise HTTPException(status_code=401, detail="failed to authenticate")

    return await v.FirstBox.view(b)



@router.post(v.FirstBoxDialog.url(), response_model=p.Page)
async def d3(b: v.BoxInput):
    return await v.FirstBoxDialog.view(b)


@router.post(v.SecondBox.url(), response_model=i.ReturnData)
async def d3(b: v.BoxInput):
    return await v.SecondBox.view(b)

@router.post(v.ThirdBox.url(), response_model=i.ReturnData)
async def d3(b: v.BoxInput):
    return await v.ThirdBox.view(b)


@router.post(v.ForthBox.url(), response_model=i.ReturnData)
async def d3(b: v.BoxInput):
    return await v.ForthBox.view(b)
