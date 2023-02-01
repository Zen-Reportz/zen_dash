from fastapi import APIRouter, Request
from pages.input_page.row_one import view as v
from zen_dash import instances as i
from zen_dash import page as p
router = APIRouter(
    prefix=v.prefix,
    tags=["row_one"],
    responses={404: {"description": "Not found"}},
)



@router.post(v.Date.url(), response_model=i.ReturnData)
async def d3(req: Request):
    data = await req.json()
    return v.Date.view(data.get("single_toggle_data", ''))

@router.post(v.SingleDate.url(), response_model=i.ReturnData)
async def d3():
    return v.SingleDate.view()


@router.post(v.DateReactive.url(), response_model=i.ReturnData)
async def d3():
    return v.DateReactive.view()

    