from pathlib import Path
import pathlib
from venv import create
import subprocess

create_project_code = """
from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import pkg_resources
from zen_dash import instances as i
from zen_dash import sidebar as s
from zen_dash import page as p
from zen_dash import scripts as sc
from pydantic import BaseConfig
from fastapi.middleware.gzip import GZipMiddleware
from app import global_filter as gf
from app import page 
from zen_dash.flex_data import FlexData

BaseConfig.arbitrary_types_allowed = True  # change #1

app = FastAPI()
app.include_router(gf.router)
app.include_router(page.router)

app.add_middleware(GZipMiddleware, minimum_size=1000)
folder = pkg_resources.resource_filename('zen_dash', 'static/')
templates = Jinja2Templates(directory=folder)


@app.get("/", response_class=HTMLResponse)
async def root(request: Request, response: Response):
    return templates.TemplateResponse("index.html", {"request": request, "test": "test"})


@app.get("/backend/title")
async def title():
    return 'Zen Dash Dashboard'


@app.post("/backend/document")
async def save_doc(request: Request):
    # TODO write saving functionality
    return "yes"


@app.post("/backend/scripts", response_model=sc.CustomScripts)
async def scripts(request: Request):
    return sc.CustomScripts(scripts=[])


@app.get("/backend/sidebar", response_model=s.Sidebar)
async def sidebar():
    return s.Sidebar(tabs=[ s.SidebarTab(label="First Page", icon='home') ],
                     filters=[ s.FilterInfo(url="/backend/global_filters/simple_filter") ]
                     )


@app.get("/backend/page_detail", response_model=p.Page)
async def page_detail(fragment: str):
    if fragment in ("page_0"):
        p1 = p.Page(
            rows=[
                p.Row(data=[
                    p.Instance(url="/backend/page/box"),
                ])
            ])

        return p1


app.mount("/", StaticFiles(directory=folder), name="static")

"""

page_data = """
from fastapi import APIRouter
from zen_dash import instances as i
from fastapi.responses import FileResponse


router = APIRouter(
    prefix="/backend/page",
    tags=["page"],
    responses={404: {"description": "Not found"}},
)

@router.post("/box", response_model=i.ReturnData)
async def d3():
    return i.ReturnData(type=i.InstanceType.BOX, box_data=i.BoxData(icon="percent", name="User Spent", value="$5000"), footer="10% increase compare to last week ")
    """

create_global_filter = """
from fastapi import APIRouter, Request
from zen_dash import instances as i

router = APIRouter(
    prefix="/backend/global_filters",
    tags=["filters"],
    responses={404: {"description": "Not found"}},
)


@router.post("/simple_filter", response_model=i.ReturnData)
async def single_filter():
    s = i.ReturnData(
        title="Simple Filter",
        type=i.InstanceType.SIMPLE_FILTER,
        simple_filter_data=i.SimpleFilterData(
            name="simple_filter",
            data=["Test 1", "My 2"],
            selected=['Test 1'])
    )

    return s

"""

qa_sh = """
uvicorn main:app --reload --reload-dir .
"""


prod_sh = """
uvicorn main:app --workers 10
"""


requirements ="""
zen_dash
uvicorn
"""



def create_project(location):
    if location == ".":
        build_location = pathlib.Path()
    elif location[0] == "/":
        build_location = pathlib.Path(location)
    else:
        build_location = pathlib.Path().joinpath(location)
    
    Path(build_location.joinpath("app").joinpath("global_filter")).mkdir(parents=True, exist_ok=True)
    Path(build_location.joinpath("app").joinpath("page")).mkdir(parents=True, exist_ok=True)
    Path(build_location.joinpath(".venv")).mkdir(parents=True, exist_ok=True)

    main_file_location = build_location.joinpath("main.py").absolute()

    with open(main_file_location, "w") as f:
        f.write(create_project_code)

    init_file = build_location.joinpath("app").joinpath("global_filter").joinpath("__init__.py")
    with open(init_file, "w") as f:
        f.write(create_global_filter)

    global_file = build_location.joinpath("app").joinpath("page").joinpath("__init__.py")
    with open(global_file, "w") as f:
        f.write(page_data)
    
    qa_file = build_location.joinpath("qa.sh")
    with open(qa_file, "w") as f:
        f.write(qa_sh)
    
    prod_file = build_location.joinpath("prod.sh")
    with open(prod_file, "w") as f:
        f.write(prod_sh)

    requirement_file = build_location.joinpath("requirements.txt")
    with open(requirement_file, "w") as f:
        f.write(requirements)

    venv_file = str(build_location.joinpath(".venv").absolute())
    create(venv_file, with_pip=True)
    

    requirement_file = str(requirement_file.absolute())
    pip_location = str(build_location.joinpath(".venv").joinpath("bin").joinpath("pip3").absolute())
    subprocess.run([pip_location, "install", "-r", requirement_file], capture_output=True)



