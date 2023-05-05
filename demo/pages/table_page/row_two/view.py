
from pages.table_page.row_two import table
from zen_dash import Zen
from zen_dash.objects.flex_data import FlexData
from zen_dash.objects import instances as i


prefix="/backend/table_page/row_two"
flex=FlexData(fxFlex="50%", fxFlex_md="50%", fxFlex_sm="110%", fxFlex_xs="110%")

class Table(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/table"

    @staticmethod
    def url() -> str:
        return "/table"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.TABLE,
                        table_data=i.TableData(name="table_1",
                                         columns=table.Table["columns"],
                                         data=table.Table["data"],
                                                items_per_page_options=[11, 12, 13],
                                                items_per_page= 13
                                                ), flex=flex
                        
                        )

