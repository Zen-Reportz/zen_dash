from fastapi import APIRouter
from pages.chart_page.row_two import view as v
from zen_dash import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_six"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.Chart.url(), response_model=i.ReturnData)
async def prf():
    return v.Chart.view()