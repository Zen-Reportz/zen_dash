from fastapi import APIRouter
from zen_dash import instances as i
from zen_dash.flex_data import FlexData


router = APIRouter(
    prefix="/backend/page_one/row_two",
    tags=["row_two"],
    responses={404: {"description": "Not found"}},
)

flex=FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%")

@router.post("/table", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.TABLE,
                        table_data=i.TableData(name="table_1",
                                         columns=[i.TableColumn(columnDef="name", header="Name"),
                                                  i.TableColumn(
                                             columnDef="date", header="Date"),
                                             i.TableColumn(
                                             columnDef="company", header="company"),
                                             i.TableColumn(
                                             columnDef="country", header="Country"),
                                             i.TableColumn(
                                             columnDef="city", header="City"),
                                             i.TableColumn(columnDef="phone", header="Phone")],
                                         data=[{"name": "Molly Pope",
                                                "date": "Jul 27, 2021",
                                                "company": "Faucibus Orci Institute",
                                                "country": "New Zealand",
                                                "city": "Campinas",
                                                "phone": "1-403-634-0276"},
                                               {"name": "Alfonso Vinson",
                                                "date": "May 11, 2021",
                                                "company": "Non Ante Corp.",
                                                "country": "United Kingdom",
                                                "city": "Redlands",
                                                "phone": "1-405-411-6336"},
                                               {"name": "Camden David",
                                                "date": "Aug 6, 2022",
                                                "company": "Cursus Et LLP",
                                                "country": "Nigeria",
                                                "city": "Iguala",
                                                "phone": "(415) 628-6853"},
                                               {"name": "Levi Goff",
                                                "date": "Nov 3, 2021",
                                                "company": "Vitae Incorporated",
                                                "country": "Sweden",
                                                "city": "Manavgat",
                                                "phone": "1-545-823-7985"},
                                               {"name": "Madaline Leach",
                                                "date": "Jun 13, 2022",
                                                "company": "Erat Volutpat Corp.",
                                                "country": "Chile",
                                                "city": "Niterói",
                                                "phone": "1-678-156-9674"},
                                               {"name": "Camden David",
                                                "date": "Aug 6, 2022",
                                                "company": "Cursus Et LLP",
                                                "country": "Nigeria",
                                                "city": "Iguala",
                                                "phone": "(415) 628-6853"},
                                               {"name": "Levi Goff",
                                                "date": "Nov 3, 2021",
                                                "company": "Vitae Incorporated",
                                                "country": "Sweden",
                                                "city": "Manavgat",
                                                "phone": "1-545-823-7985"},
                                               {"name": "Madaline Leach",
                                                "date": "Jun 13, 2022",
                                                "company": "Erat Volutpat Corp.",
                                                "country": "Chile",
                                                "city": "Niterói",
                                                "phone": "1-678-156-9674"},
                                               {"name": "Molly Pope",
                                                "date": "Jul 27, 2021",
                                                "company": "Faucibus Orci Institute",
                                                "country": "New Zealand",
                                                "city": "Campinas",
                                                "phone": "1-403-634-0276"},
                                               {"name": "Alfonso Vinson",
                                                "date": "May 11, 2021",
                                                "company": "Non Ante Corp.",
                                                "country": "United Kingdom",
                                                "city": "Redlands",
                                                "phone": "1-405-411-6336"},
                                               {"name": "Camden David",
                                                "date": "Aug 6, 2022",
                                                "company": "Cursus Et LLP",
                                                "country": "Nigeria",
                                                "city": "Iguala",
                                                "phone": "(415) 628-6853"},
                                               {"name": "Levi Goff",
                                                "date": "Nov 3, 2021",
                                                "company": "Vitae Incorporated",
                                                "country": "Sweden",
                                                "city": "Manavgat",
                                                "phone": "1-545-823-7985"},
                                               {"name": "Madaline Leach",
                                                "date": "Jun 13, 2022",
                                                "company": "Erat Volutpat Corp.",
                                                "country": "Chile",
                                                "city": "Niterói",
                                                "phone": "1-678-156-9674"},
                                               {"name": "Camden David",
                                                "date": "Aug 6, 2022",
                                                "company": "Cursus Et LLP",
                                                "country": "Nigeria",
                                                "city": "Iguala",
                                                "phone": "(415) 628-6853"},
                                               {"name": "Levi Goff",
                                                "date": "Nov 3, 2021",
                                                "company": "Vitae Incorporated",
                                                "country": "Sweden",
                                                "city": "Manavgat",
                                                "phone": "1-545-823-7985"},
                                               {"name": "Madaline Leach",
                                                "date": "Jun 13, 2022",
                                                "company": "Erat Volutpat Corp.",
                                                "country": "Chile",
                                                "city": "Niterói",
                                                "phone": "1-678-156-9674"}]), flex=flex
                        
                        )


@router.post("/chart", response_model=i.ReturnData)
async def prf():
    return i.ReturnData(type=i.InstanceType.CHART,
                        chart_data=i.ChartData(name='chart_data', data={
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
                                        "label": {"show": False},
                                        "data": [{"xAxis": 1}, {"xAxis": 3}, {"xAxis": 4}, {"xAxis": 7}]
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
                        }), flex=flex
                        
                        )
