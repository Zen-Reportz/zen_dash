from pages.table_page.row_nine.table import TableDataInfo
from zen_dash import Zen
from zen_dash.objects.flex_data import FlexData
from zen_dash.objects import instances as i
import uuid
from jinja2 import Template

prefix = "/backend/table_page/row_nine"
flex = FlexData(fxFlex="50%", fxFlex_md="50%",
                fxFlex_sm="110%", fxFlex_xs="110%")


class Table(Zen):
    @staticmethod
    def full_url() -> str:
        return f"{prefix}/table"

    @staticmethod
    def url() -> str:
        return f"/table"

    @staticmethod
    async def view():
        return i.ReturnData(type=i.InstanceType.TABLE,
                            table_data=i.TableData(name="table_1",
                                                   columns=TableDataInfo["columns"],
                                                   data=TableDataInfo["data"]
                                                   ), flex=flex)



class DataTable(Zen):
    @staticmethod
    def full_url(query_paramenter) -> str:
        return f"{prefix}/data_table_html?{query_paramenter}"

    @staticmethod
    def url() -> str:
        return "/data_table_html"

    @staticmethod
    def view():
        d = str(uuid.uuid4().hex)
        with open("files/table.html", "r") as f:
            template = Template(f.read())

        return i.ReturnData(type=i.InstanceType.CUSTOM_HTML, custom_html_data=i.CustomHTML(name="test_custom", html=template.render(my_id=d), full_custom=True, script="""
        $(document).ready(function () {{
            $('#{my_id}').DataTable({{    responsive: true}});
        }});
        """.format(my_id=d)), flex=i.FlexData(fxFlex="33%"))

