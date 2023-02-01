from fastapi import APIRouter
from pages.table_page.row_two import view as v
from zen_dash import instances as i
from zen_dash.flex_data import FlexData

router = APIRouter(
    prefix=v.prefix,
    tags=["row_six"],
    responses={404: {"description": "Not found"}},
)

flex=FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%")

@router.post(v.Table.url(), response_model=i.ReturnData)
async def prf():
    return v.Table.view()
