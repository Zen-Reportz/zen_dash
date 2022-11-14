from typing import List
from fastapi import APIRouter
from zen_dash import instances as i
from fastapi.responses import FileResponse

from fastapi import UploadFile


router = APIRouter(
    prefix="/backend/page_one/row_seven",
    tags=["row_seven"],
    responses={404: {"description": "Not found"}},
)

@router.post("/input", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.INPUT,
                        title="Input",
                       input_data= i.InputData(label="Input Data", name="myInput", value='test'))



@router.post("/file_download", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.DOWNLOAD,
                        title="Download Option",
                       download_data= i.DownloadData(url="/backend/page_one/row_seven/download_data", name="download", label="Report"))

@router.post("/download_data")
async def d3():
    import time
    time.sleep(2)
    file_path = "files/Home - ZenReportz.pdf"
    from datetime import datetime
    file_name = datetime.now().strftime("%Y%m%d-%H:%M:%S_") + "test.pdf"
    return FileResponse(path=file_path, filename=file_name)

@router.post("/upload", response_model=i.ReturnData)
async def d3():

    return i.ReturnData(type=i.InstanceType.UPLOAD, title="upload file", upload_data=i.UploadData(url="/backend/page_one/row_seven/upload_data", multi=True, name="download_data"))


@router.post("/upload_data")
async def data(files: List[UploadFile]):
    import time
    time.sleep(2)
    t = {"filenames": [file.filename for file in files]}  
    for file_ in files:
        dd = file_.filename.split("/")[-1]
        with open(f"files/{dd}" , "wb") as f:
            content = await file_.read()  # async read
            f.write(content)  # async write

    return t


