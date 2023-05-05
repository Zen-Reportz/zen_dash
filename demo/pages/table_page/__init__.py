from zen_dash import ZenPage, page as p

from pages.table_page.row_two import view as prtwv
from pages.table_page.row_nine import view as prnv

table_page = p.Page(
    rows=[
        p.Row(data=[
            p.Instance(url=prtwv.Table.full_url()),
        ]),
        p.Row(
            data=[
                p.Instance(
                    url=prnv.DataTable.full_url("test")),
                p.Instance(
                    url=prnv.DataTable.full_url("test1")),
                p.Instance(
                    url=prnv.DataTable.full_url("test2"))

            ])
    ])

Table_websocket = [prtwv.Table]


TABLEPAGE = ZenPage(
    name= "Table",
    icon= "home",
    page= table_page,
    websocket_calls=Table_websocket,
    tab_number=1,
    subtab_number=0
)