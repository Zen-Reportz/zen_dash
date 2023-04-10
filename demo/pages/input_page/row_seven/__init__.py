from fastapi import APIRouter, Request
from pages.input_page.row_seven import view as v
from zen_dash.objects import instances as i
from fastapi import UploadFile
from typing import List

router = APIRouter(
    prefix=v.prefix,
    tags=["row_seven"],
    responses={404: {"description": "Not found"}},
)



@router.post(v.Input.url(), response_model=i.ReturnData)
async def d3():
    return v.Input.view()

@router.post(v.FileDownload.url(), response_model=i.ReturnData)
async def d3():
    return v.FileDownload.view()

@router.post(v.FileDownload.server_url())
async def d3():
    return v.FileDownload.server()

@router.post(v.UploadData.url(), response_model=i.ReturnData)
async def d3():
    return v.UploadData.view()

@router.post(v.UploadData.server_url())
async def d3(files: List[UploadFile]):
    return await v.UploadData.server(files)


@router.post(v.Button.url(), response_model=i.ReturnData)
async def d3():
    return v.Button.view()


@router.post(v.Button.server_url(), response_model=i.ReturnData)
async def d3():
    return v.Button.server()