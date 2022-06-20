from fastapi import FastAPI, Request, Response
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from zen_dash.instances import BoxData, DateTimeData, TableColumn, TableData
from zen_dash.filter import DataInstance, Filter, GroupData, SimpleData
from zen_dash.page import Instance, Page, Row
from zen_dash.sidebar import SidebarTab, Sidebar
from pydantic import BaseConfig
from random import choice
from fastapi.middleware.gzip import GZipMiddleware
from fastapi.responses import JSONResponse
BaseConfig.arbitrary_types_allowed = True  # change #1

app = FastAPI()

app.add_middleware(GZipMiddleware, minimum_size=1000)
templates = Jinja2Templates(directory="../static")


@app.get("/", response_class=HTMLResponse)
async def root(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/backend/title")
async def title(request: Request):
    return 'Demo'


@app.get("/backend/sidebar", response_model=Sidebar)
async def sidebar(request: Request):
    return Sidebar(tabs=[SidebarTab(name="First Page", icon='delete', url="/backend/first_page"),
                         SidebarTab(name="Last Page", icon='home', url="/backend/last_page")],
                   filters=[Filter(label="Single Filter", name="sigle_filter",url="/backend/single_filter"),
                           Filter(label="Multi Filter",name="multi_filter", url="/backend/multi_filter", single=False),
                           Filter(label="Single Filter With Group", name="single_filter_with_group", url="/backend/single_filter_group", grouped=True),
                           Filter(label="Multi Filter With Group", name="mfwd", url="/backend/multi_filter_group", single=False, grouped=True)])


@app.get("/backend/single_filter", response_model=SimpleData)
async def single_filter(request: Request):
     s = SimpleData(data= ["hi", "hi2"])
     return s

@app.get("/backend/multi_filter", response_model=SimpleData)
async def multi_filter(request: Request):
    return SimpleData(data= ["hi", "hi2"])

@app.get("/backend/single_filter_group", response_model=GroupData)
async def single_filter_group(request: Request):
    return GroupData(data = [
                            DataInstance(name = "group", group_data= ["test1", "test2"]),
                            DataInstance(name = "group2", group_data= ["test3", "test4"]), 
                            DataInstance(name = "group3", group_data= ["test5", "test6"])])

@app.get("/backend/multi_filter_group", response_model=GroupData)
async def multi_filter_group(request: Request):
    return GroupData(data = [
                            DataInstance(name = "group", group_data= ["test1", "test2"]),
                            DataInstance(name = "group2", group_data= ["test3", "test4"]), 
                            DataInstance(name = "group3", group_data= ["test5", "test6"])])
# fxFlex: Optional[str] = "20%" 
# fxFlex_md: Optional[str] = "40%"
# fxFlex_lt_md: Optional[str] = "100%" 
@app.get("/backend/page_detail", response_model=Page)
async def page_detail(fragment: str):
    if fragment in ("/", "/backend/first_page", "/backend/last_page"):
        p = Page(rows=[Row(data=[
                                Instance(type="date", url="/backend/page_one/row_one/date"),
                                Instance(type="date", url="/backend/page_one/row_one/single_date"),
                                Instance(type="box", url="/backend/page_one/row_one/first_box"), 
                                Instance(type="box", url="/backend/page_one/row_one/second_box"), 
                                Instance(type="box", url="/backend/page_one/row_one/third_box"), 
                                # Instance(type="box", url="/backend/page_one/row_one/forth_box"),
                               ]),
                        Row(data=[
                                Instance(type="date", url="/backend/page_one/row_one/single_date"),
                                Instance(type="box", url="/backend/page_one/row_one/first_box"), 
                                Instance(type="box", url="/backend/page_one/row_one/second_box"), 
                                Instance(type="box", url="/backend/page_one/row_one/third_box"), 
                                Instance(type="box", url="/backend/page_one/row_one/forth_box"),
                               ]),
                        Row(data=[
                                Instance(type="table", url="/backend/page_one/row_two/table", fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%"),
                                Instance(type="chart", url="/backend/page_one/row_two/chart", fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%"),

                               ]),
                             ])
        return p
    
@app.post("/backend/page_one/row_one/first_box", response_model=BoxData)
async def prf():
    return choice([BoxData(icon="person", name="Users", value="5,000", additional_info="10% increase compare to last week " ),
    BoxData(icon="person", name="Users", value="4,000", additional_info="10% decrease compare to last week " )])

@app.post("/backend/page_one/row_one/second_box", response_model=BoxData)
async def prf():
    return  BoxData(icon="attach_money", name="User Spent", value="$5000", additional_info="10% increase compare to last week " )
    
@app.post("/backend/page_one/row_one/third_box", response_model=BoxData)
async def prf():
    return BoxData(icon="attach_money", name="User Spent (last hour)", value="$400", additional_info=" ")

@app.post("/backend/page_one/row_one/forth_box", response_model=BoxData)
async def prf():
    return BoxData(icon="person", name="User (last hour)", value="100", additional_info="")


@app.post("/backend/page_one/row_one/date", response_model=DateTimeData)
async def prf():
    return DateTimeData(label="Select Date Range", name="multi_date",first_date="2020-11-24", second_date="2022-11-24")

@app.post("/backend/page_one/row_one/single_date", response_model=DateTimeData)
async def prf():
    return DateTimeData(label="Select Date", name="single_date",first_date="2020-11-24")

@app.post("/backend/page_one/row_two/table", response_model=TableData)
async def prf():
    return TableData(columns=[TableColumn(columnDef ="name", header="Name"),
    TableColumn(columnDef ="date", header="Date"),
    TableColumn(columnDef ="company", header="company"),
    TableColumn(columnDef ="country", header="Country"),
    TableColumn(columnDef ="city", header="City"),
    TableColumn(columnDef ="phone", header="Phone")
    ], data=[{
        "name": "Molly Pope",
        "date": "Jul 27, 2021",
        "company": "Faucibus Orci Institute",
        "country": "New Zealand",
        "city": "Campinas",
        "phone": "1-403-634-0276"
      },
      {
        "name": "Alfonso Vinson",
        "date": "May 11, 2021",
        "company": "Non Ante Corp.",
        "country": "United Kingdom",
        "city": "Redlands",
        "phone": "1-405-411-6336"
      },
      {
        "name": "Camden David",
        "date": "Aug 6, 2022",
        "company": "Cursus Et LLP",
        "country": "Nigeria",
        "city": "Iguala",
        "phone": "(415) 628-6853"
      },
      {
        "name": "Levi Goff",
        "date": "Nov 3, 2021",
        "company": "Vitae Incorporated",
        "country": "Sweden",
        "city": "Manavgat",
        "phone": "1-545-823-7985"
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674"
      },
      {
        "name": "Camden David",
        "date": "Aug 6, 2022",
        "company": "Cursus Et LLP",
        "country": "Nigeria",
        "city": "Iguala",
        "phone": "(415) 628-6853"
      },
      {
        "name": "Levi Goff",
        "date": "Nov 3, 2021",
        "company": "Vitae Incorporated",
        "country": "Sweden",
        "city": "Manavgat",
        "phone": "1-545-823-7985"
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674"
      }, {
        "name": "Molly Pope",
        "date": "Jul 27, 2021",
        "company": "Faucibus Orci Institute",
        "country": "New Zealand",
        "city": "Campinas",
        "phone": "1-403-634-0276"
      },
      {
        "name": "Alfonso Vinson",
        "date": "May 11, 2021",
        "company": "Non Ante Corp.",
        "country": "United Kingdom",
        "city": "Redlands",
        "phone": "1-405-411-6336"
      },
      {
        "name": "Camden David",
        "date": "Aug 6, 2022",
        "company": "Cursus Et LLP",
        "country": "Nigeria",
        "city": "Iguala",
        "phone": "(415) 628-6853"
      },
      {
        "name": "Levi Goff",
        "date": "Nov 3, 2021",
        "company": "Vitae Incorporated",
        "country": "Sweden",
        "city": "Manavgat",
        "phone": "1-545-823-7985"
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674"
      },
      {
        "name": "Camden David",
        "date": "Aug 6, 2022",
        "company": "Cursus Et LLP",
        "country": "Nigeria",
        "city": "Iguala",
        "phone": "(415) 628-6853"
      },
      {
        "name": "Levi Goff",
        "date": "Nov 3, 2021",
        "company": "Vitae Incorporated",
        "country": "Sweden",
        "city": "Manavgat",
        "phone": "1-545-823-7985"
      },
      {
        "name": "Madaline Leach",
        "date": "Jun 13, 2022",
        "company": "Erat Volutpat Corp.",
        "country": "Chile",
        "city": "Niterói",
        "phone": "1-678-156-9674"
      }])

@app.post("/backend/page_one/row_two/chart")
async def prf():
    return JSONResponse({
    "xAxis": {
      "type": 'category',
      "boundaryGap": False
    },
    "yAxis": {
      "type": 'value',
      "boundaryGap": [0, '30%']
    },
    "visualMap": {
      "type": 'piecewise',
      "show": False,
      "dimension": 0,
      "seriesIndex": 0,
      "pieces": [
        {
          "gt": 1,
          "lt": 3,
          "color": 'rgba(0, 0, 180, 0.4)'
        },
        {
          "gt": 4,
          "lt": 7,
          "color": 'rgba(0, 0, 180, 0.4)'
        }
      ]
    },
    "series": [
      {
        "type": 'line',
        "smooth": 0.6,
        "symbol": 'none',
        "lineStyle": {
          "color": '#5470C6',
          "width": 5
        },
        "markLine": {
          "symbol": ['none', 'none'],
          "label": { "show": False },
          "data": [{ "xAxis": 1 }, { "xAxis": 3 }, { "xAxis": 4 }, { "xAxis": 7 }]
        },
        "areaStyle": {},
        "data": [
          ['2019-10-10', 200],
          ['2019-10-11', 560],
          ['2019-10-12', 750],
          ['2019-10-13', 580],
          ['2019-10-14', 250],
          ['2019-10-15', 300],
          ['2019-10-16', 450],
          ['2019-10-17', 300],
          ['2019-10-18', 100]
        ]
      }
    ]
  });

app.mount("/", StaticFiles(directory="../static"), name="static")
