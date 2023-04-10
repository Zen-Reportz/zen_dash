
from pages.chart_page.row_two.chart import ChartData
from pages.table_page.row_two import table
from zen_dash import Zen
from zen_dash.objects.flex_data import FlexData
from zen_dash.objects import instances as i


prefix="/backend/chart_page/row_two"
flex=FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%")



class Chart(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/chart"

    @staticmethod
    def url() -> str:
        return "/chart"

    @staticmethod
    def view():
         return i.ReturnData(type=i.InstanceType.CHART,
                        chart_data=i.ChartData(name='chart_data', data=ChartData), flex=flex
                        
                        )
