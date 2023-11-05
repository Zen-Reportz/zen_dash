from fastapi import APIRouter, Request, Response, status
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

@router.post(v.Form.server_url(), response_model=i.UpdateReturnData)
async def form_submit(req: Request, response: Response):
    data = await req.json()
    return v.Form.server(data)
    # return i.UpdateReturnData(
    #     type=i.UpdateInstanceType.FORM,
    #     display=i.Display(duration=10, message="Failed to save", status=i.DisplayStatus.ERROR)
    # )
    