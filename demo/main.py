from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from zen_dash import instances as i
from zen_dash import sidebar as s
from zen_dash import page as p
from pydantic import BaseConfig
from fastapi.middleware.gzip import GZipMiddleware
from pages.page_one import row_one as pro
from pages.page_one import row_three as prt
from pages.page_one import row_four as prf
from pages.page_one import row_five as prfi
from pages.page_one import row_two as prtw
import filters as f

BaseConfig.arbitrary_types_allowed = True  # change #1

app = FastAPI()

app.include_router(pro.router)
app.include_router(f.router)
app.include_router(prt.router)
app.include_router(prf.router)
app.include_router(prfi.router)
app.include_router(prtw.router)


app.add_middleware(GZipMiddleware, minimum_size=1000)


# Could be any dot-separated package/module name or a "Requirement"
# resource_package = 'zen_dash'
# resource_path = '/'.join(('templates', 'temp_file'))  # Do not use os.path.join()
# template = pkg_resources.resource_string(resource_package, resource_path)


templates = Jinja2Templates(directory="../static")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/backend/title")
async def title(request: Request):
    return 'Demo'


@app.get("/backend/sidebar", response_model=s.Sidebar)
async def sidebar(request: Request):
    return s.Sidebar(tabs=[s.SidebarTab(label="First Page", icon='delete', fragment="/backend/first_page"),
                           s.SidebarTab(label="Last Page", icon='home', fragment="/backend/last_page")],
                     filters=[s.FilterInfo(url="/backend/filters/single_filter"),
                              s.FilterInfo(url="/backend/filters/multi_filter"),
                              s.FilterInfo(url="/backend/filters/single_filter_group"),
                                s.FilterInfo(url="/backend/filters/multi_filter_group")
                              ]
                     )


# fxFlex_md: Optional[str] = "40%"
# fxFlex_lt_md: Optional[str] = "100%"


@app.get("/backend/page_detail", response_model=p.Page)
async def page_detail(fragment: str):
    if fragment in ("/", "/backend/first_page", "/backend/last_page"):
        p1 = p.Page(
              rows=[p.Row(data=[
            p.Instance(url="/backend/page_one/row_one/date"),
            p.Instance(url="/backend/page_one/row_one/single_date"),
            p.Instance(url="/backend/page_one/row_one/first_box"),
            p.Instance(url="/backend/page_one/row_one/second_box"),
            p.Instance(url="/backend/page_one/row_one/third_box"),
        ]),
            p.Row(data=[
                p.Instance(url="/backend/page_one/row_one/single_date"),
                p.Instance(url="/backend/page_one/row_one/first_box"),
                p.Instance(url="/backend/page_one/row_one/second_box"),
                p.Instance(url="/backend/page_one/row_one/third_box"),
                p.Instance(url="/backend/page_one/row_one/forth_box"),
            ]),
            p.Row(data=[
                p.Instance(url="/backend/page_one/row_two/table",
                           fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%"),
                p.Instance(url="/backend/page_one/row_two/chart",
                           fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%"),

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
                p.Instance(url="/backend/page_one/row_four/slider_inverted"),
                p.Instance(url="/backend/page_one/row_four/slider_vertical"),
                p.Instance(
                    url="/backend/page_one/row_four/slider_vertical_inverted")
            ]),
            p.Row(data=[
                p.Instance(url="/backend/page_one/row_five/button_toggle"),
                p.Instance(url="/backend/page_one/row_five/button_toggle_multiple"),
                p.Instance(url="/backend/page_one/row_five/toggle"),
                p.Instance(url="/backend/page_one/row_five/multi_records"),

            ])
        ])
        return p1



app.mount("/", StaticFiles(directory="../static"), name="static")
