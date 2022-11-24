from cgitb import reset
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
from pages.page_one import row_one as pro
from pages.page_one import row_three as prt
from pages.page_one import row_four as prf
from pages.page_one import row_five as prfi
from pages.page_one import row_two as prtw
from pages.page_one import row_six as prs
from pages.page_one import row_seven as pors
from pages.page_one import row_eight as pre
from pages.page_one import row_nine as prn

import filters as f
from zen_dash.flex_data import FlexData

BaseConfig.arbitrary_types_allowed = True  # change #1

app = FastAPI()

app.include_router(pro.router)
app.include_router(f.router)
app.include_router(prt.router)
app.include_router(prf.router)
app.include_router(prfi.router)
app.include_router(prtw.router)
app.include_router(prs.router)
app.include_router(pors.router)
app.include_router(pre.router)
app.include_router(prn.router)


app.add_middleware(GZipMiddleware, minimum_size=1000)


# Could be any dot-separated package/module name or a "Requirement"
# resource_package = 'zen_dash'
# resource_path = '/'.join(('templates', 'temp_file'))  # Do not use os.path.join()
# template = pkg_resources.resource_string(resource_package, resource_path)

folder = pkg_resources.resource_filename('zen_dash', 'static/')
templates = Jinja2Templates(directory=folder)


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request, "test": "test"})


@app.get("/backend/title")
async def title():
    return 'Demo'


@app.post("/backend/document")
async def save_doc(request: Request):
    print(await request.json())
    return "yes"


@app.post("/backend/scripts", response_model=sc.CustomScripts)
async def scripts(request: Request):
    return sc.CustomScripts(scripts=[
        sc.CustomScript(
            url="https://code.jquery.com/jquery-3.6.1.min.js", type=sc.Style.JS),
        sc.CustomScript(
            url="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.10.1/jszip.min.js", type=sc.Style.JS),
        sc.CustomScript(
            url="https://cdn.datatables.net/1.12.1/css/jquery.dataTables.min.css", type=sc.Style.STYLE),
        sc.CustomScript(
            url="https://cdn.datatables.net/1.12.1/js/jquery.dataTables.min.js", type=sc.Style.JS),
    ])


@app.get("/backend/sidebar", response_model=s.Sidebar)
async def sidebar():
    return s.Sidebar(tabs=[s.SidebarTab(label="First Page", icon='delete'),
                           s.SidebarTab(label="Last Page", icon='home')],
                     filters=[s.FilterInfo(url="/backend/filters/single_filter"),
                              s.FilterInfo(
                                  url="/backend/filters/multi_filter"),
                              s.FilterInfo(
                                  url="/backend/filters/single_filter_group"),
                              s.FilterInfo(
                                  url="/backend/filters/multi_filter_group"),
                              s.FilterInfo(
                                  url="/backend/page_one/row_six/multi_records_expanded")
                              ]
                     )


# fxFlex_md: Optional[str] = "40%"
# fxFlex_lt_md: Optional[str] = "100%"


@app.get("/backend/page_detail", response_model=p.Page)
async def page_detail(fragment: str):
    print(fragment)
    if fragment in ("page_0", "page_1"):
        p1 = p.Page(
            rows=[
                p.Row(data=[
                  p.Instance(url="/backend/page_one/row_one/date"),
                  p.Instance(url="/backend/page_one/row_one/single_date"),
                  p.Instance(url="/backend/page_one/row_one/first_box"),
                  p.Instance(url="/backend/page_one/row_one/second_box"),
                  p.Instance(url="/backend/page_one/row_one/third_box"),

                  ]),
                p.Row(data=[
                      p.Instance(url="/backend/page_one/row_two/table",
                                 ),
                      p.Instance(url="/backend/page_one/row_two/chart",
                                 ),

                  ]),
                p.Row(data=[
                      p.Instance(url="/backend/page_one/row_three/checkbox"),
                      p.Instance(
                          url="/backend/page_one/row_three/checkbox_vertical"),
                      p.Instance(url="/backend/page_one/row_three/radiobox"),
                      p.Instance(
                          url="/backend/page_one/row_three/radiobox_vertical"),
                  ]),
                p.Row(data=[
                      p.Instance(url="/backend/page_one/row_four/slider"),
                      p.Instance(
                          url="/backend/page_one/row_four/slider_inverted"),
                      p.Instance(
                          url="/backend/page_one/row_four/slider_vertical"),
                      p.Instance(
                          url="/backend/page_one/row_four/slider_vertical_inverted")
                  ]),
                p.Row(data=[
                      p.Instance(
                          url="/backend/page_one/row_five/button_toggle"),
                      p.Instance(
                          url="/backend/page_one/row_five/button_toggle_multiple"),
                      p.Instance(url="/backend/page_one/row_five/toggle"),
                      p.Instance(
                          url="/backend/page_one/row_five/multi_records"),

                  ]),
                p.Row(data=[
                      p.Instance(
                          url="/backend/page_one/row_five/multi_records"),
                      p.Instance(url="/backend/page_one/row_six/multi_records_tabs", flex=FlexData(
                          fxFlex="33%", fxFlex_md="33%", fxFlex_sm="110%", fxFlex_xs="110%")),
                      p.Instance(url="/backend/page_one/row_six/multi_records_expanded",  flex=FlexData(
                        fxFlex="33%", fxFlex_md="33%", fxFlex_sm="110%", fxFlex_xs="110%")),

                  ]),
                p.Row(data=[
                      p.Instance(url="/backend/filters/single_filter"),
                      p.Instance(url="/backend/filters/multi_filter"),
                      p.Instance(url="/backend/filters/single_filter_group"),
                      p.Instance(url="/backend/filters/multi_filter_group"),
                      p.Instance(url="/backend/page_one/row_seven/input"),

                  ]),
                p.Row(data=[
                      p.Instance(url="/backend/filters/single_filter_server"),
                      p.Instance(url="/backend/filters/multi_filter_server"),
                  ]),
                p.Row(data=[
                    p.Instance(url="/backend/page_one/row_seven/file_download"),
                              p.Instance(url="/backend/page_one/row_seven/upload"), ]),
                p.Row(data=[
                    p.Instance(url="/backend/page_one/row_eight/image"),
                              p.Instance(
                      url="/backend/page_one/row_eight/highchart"),

                  ]),
                p.Row(data=[p.Instance(url="/backend/page_one/row_nine/table"),
                            # p.Instance(url="/backend/page_one/row_nine/iframe")
                            ]),
                p.Row(data=[p.Instance(url="/backend/page_one/row_nine/custom_html")])
                  ])

        return p1


app.mount("/", StaticFiles(directory=folder), name="static")
