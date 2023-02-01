from fastapi import APIRouter, Request
from pages.input_page.row_five import view as v
from zen_dash import instances as i


router = APIRouter(
    prefix=v.prefix,
    tags=["row_five"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.ButtonToggle.url(), response_model=i.ReturnData)
async def d3(req: Request):
    return await v.ButtonToggle.view(req.query_params)

@router.post(v.ButtonToggleMultiple.url(), response_model=i.ReturnData)
async def d3(req: Request):
    return await v.ButtonToggleMultiple.view(req.query_params)

@router.post(v.Toggle.url(), response_model=i.ReturnData)
async def d3(req: Request):
    return await v.Toggle.view(req.query_params)

@router.post(v.MultiRecords.url(), response_model=i.ReturnData)
async def d3():
    return await v.MultiRecords.view()