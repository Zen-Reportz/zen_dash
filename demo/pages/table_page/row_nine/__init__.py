from fastapi import APIRouter
from pages.table_page.row_nine import view as v
from zen_dash.objects import instances as i

router = APIRouter(
    prefix=v.prefix,
    tags=["row_nine"],
    responses={404: {"description": "Not found"}},
)

@router.post(v.Table.url(), response_model=i.ReturnData)
async def d3():
    return await v.Table.view()


@router.post(v.DataTable.url(), response_model=i.ReturnData)
async def d3():
    return v.DataTable.view()
