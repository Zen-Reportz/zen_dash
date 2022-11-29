from fastapi import APIRouter
from zen_dash import instances as i
from zen_dash.flex_data import FlexData
from jinja2 import Template

router = APIRouter(
    prefix="/backend/page_one/row_nine",
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
                                                "phone": "1-678-156-9674"}]), flex=flex)


@router.post("/iframe", response_model=i.ReturnData, response_model_exclude_none=True)
async def prf():
    return i.ReturnData(type=i.InstanceType.IFRAME, iframe_data=i.IframeData(url="https://pepy.tech/project/zen_dash"), flex=i.FlexData(fxFlex='50%', fxFlex_md='100%', fxFlex_sm='100%'))

@router.post("/custom_html", response_model=i.ReturnData, response_model_exclude_none=True)
async def prf():
    return i.ReturnData(type=i.InstanceType.CUSTOM_HTML, custom_html_data=i.CustomHTML(name="test", full_custom=False, html="""
    <mat-grid-list  cols="2" rowheight="3:1" class="mat-grid-list" ng-reflect-cols="2" ng-reflect-row-height="3:1" style="padding-bottom: calc(33.3333% + 0px); background-color: red">
        <div>
            <mat-grid-tile  class="mat-grid-tile" ng-reflect-colspan="1" ng-reflect-rowspan="2" style="left: 0px; width: calc(50% - 0.5px); margin-top: 0px; padding-top: calc(33.3333% + 0px);" rowspan="2" colspan="1">
                <div class="mat-grid-tile-content">
                    <mat-icon  role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" style="width: 50px;height: 50px; font-size: 60px"> attach_money </mat-icon>
                </div>
            </mat-grid-tile>
            <mat-grid-tile  class="mat-grid-tile" ng-reflect-colspan="1" ng-reflect-rowspan="1" style="left: calc(50% + 0.5px); width: calc(50% - 0.5px); margin-top: 0px; padding-top: calc(16.6667% - 0.5px);" rowspan="1" colspan="1">
                <div class="mat-grid-tile-content">
                    <div  style="font-size: 30px; text-align: right;"> $5000 </div>
                </div>
            </mat-grid-tile>
            <mat-grid-tile  class="mat-grid-tile" ng-reflect-colspan="1" ng-reflect-rowspan="1" style="left: calc(50% + 0.5px); width: calc(50% - 0.5px); margin-top: calc(16.6667% + 0.5px); padding-top: calc(16.6667% - 0.5px);" rowspan="1" colspan="1">
                <div class="mat-grid-tile-content">
                    <div  style="font-size: 12px; text-align: right;"> User Spent </div>
                </div>
            </mat-grid-tile>
        </div>
    </mat-grid-list>
    """))

@router.post("/full_custom_html", response_model=i.ReturnData, response_model_exclude_none=True)
async def prf():
      return i.ReturnData(type=i.InstanceType.CUSTOM_HTML, custom_html_data=i.CustomHTML(name="table", html="""

    <mat-card  class="mat-card mat-focus-indicator ng-star-inserted" style="background-color:red">
        <mat-card-content  class="mat-card-content">
            <div >
                <span  class="mat-tooltip-trigger">
                    <span  class="ng-star-inserted">
                        <div  >
                            <mat-grid-list   class="mat-grid-list"   style="padding-bottom: calc(33.3333% + 0px);">
                                <div>
                                    <mat-grid-tile  class="mat-grid-tile" style="left: 0px; width: calc(50% - 0.5px); margin-top: 0px; padding-top: calc(33.3333% + 0px);">
                                        <div class="mat-grid-tile-content">
                                            <mat-icon  role="img" class="mat-icon notranslate material-icons mat-ligature-font mat-icon-no-color" aria-hidden="true" data-mat-icon-type="font" style="width: 50px;height: 50px;font-size: 60px"> attach_money </mat-icon>
                                            </mat-icon>
                                        </div>
                                    </mat-grid-tile>
                                    <mat-grid-tile  class="mat-grid-tile" style="left: calc(50% + 0.5px); width: calc(50% - 0.5px); margin-top: 0px; padding-top: calc(16.6667% - 0.5px);">
                                        <div class="mat-grid-tile-content">
                                            <div  style="font-size: 30px; text-align: right;"> 5000 
                                            </div>
                                        </div>
                                    </mat-grid-tile>
                                    <mat-grid-tile  class="mat-grid-tile" style="left: calc(50% + 0.5px); width: calc(50% - 0.5px); margin-top: calc(16.6667% + 0.5px); padding-top: calc(16.6667% - 0.5px);">
                                        <div class="mat-grid-tile-content">
                                            <div  style="font-size: 12px; text-align: right;"> Users 
                                            </div>
                                        </div>
                                    </mat-grid-tile>
                                </div>
                            </mat-grid-list>
                        </div>
                    </span>
                    <br >
                </span>
            </div>
        </mat-card-content>
        <mat-card-footer  class="mat-card-footer ng-star-inserted" style="font-size: 10px; text-align: center;"> 5% increase compare to last week  
        </mat-card-footer>
</mat-card>""", full_custom=True))


@router.post("/data_table_html", response_model=i.ReturnData, response_model_exclude_none=True)
async def prf():
    with open("files/table.html", "r") as f:
        template = Template(f.read())
    
    return i.ReturnData(type=i.InstanceType.CUSTOM_HTML, custom_html_data=i.CustomHTML(name="test_custom", html=template.render(), full_custom=True, script="""
    $(document).ready(function () {
        $('#example').DataTable();
    });
    """))
