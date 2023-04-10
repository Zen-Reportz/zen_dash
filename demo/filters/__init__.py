from fastapi import APIRouter, Request
from zen_dash.objects import instances as i
from filters import view as v


router = APIRouter(
    prefix=v.prefix,
    tags=["filters"],
    responses={404: {"description": "Not found"}},
)


@router.post(v.SingleFilter.url(), response_model=i.ReturnData)
async def single_filter():
    return v.SingleFilter.view()


@router.post(v.SingleFilterServer.url(), response_model=i.ReturnData)
async def single_filter():
    return v.SingleFilterServer.view()

@router.post(v.SingleFilterServer.server_url())
async def single_filter():
    return v.SingleFilterServer.server()

@router.post(v.MultiFilter.url(), response_model=i.ReturnData)
async def multi_filter():
    return v.MultiFilter.view()


@router.post(v.MultiFilterServer.url(), response_model=i.ReturnData)
async def multi_filter():
    return v.MultiFilterServer.view()

@router.post(v.MultiFilterServer.server_url())
async def multi_filter():
    return v.MultiFilterServer.server()

@router.post(v.SingleFilterGroup.url(), response_model=i.ReturnData)
async def single_filter_group():
    return v.SingleFilterGroup.view()

@router.post(v.MultiFilterGroup.url(), response_model=i.ReturnData)
async def multi_filter_group():
    return v.MultiFilterGroup.view()


@router.post(v.SingleFilterGlobal.url(), response_model=i.ReturnData)
async def single_filter():
    return v.SingleFilterGlobal.view()


@router.post(v.SingleFilterServerGlobal.url(), response_model=i.ReturnData)
async def df(req: Request):
    t = await req.json()
    return v.SingleFilterServerGlobal.view(t.get("simple_filter_global"))
