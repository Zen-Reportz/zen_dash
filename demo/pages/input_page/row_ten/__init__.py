from fastapi import APIRouter, Request
from pages.input_page.row_ten import view as v
from zen_dash.objects import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_six"],
    responses={404: {"description": "Not found"}},
)


@router.post(v.Form.url(), response_model=i.ReturnData)
async def form():
    return v.Form.view()

@router.post(v.Form.server_url())
async def form_submit(req: Request):
    v.Form.server()
    