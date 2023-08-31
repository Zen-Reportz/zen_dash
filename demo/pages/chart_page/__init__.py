from zen_dash import ZenPage, page as p
from pages.chart_page.row_eight import view as rev
from pages.chart_page.row_two import view as rto

chart_page = p.Page(
        rows=[
            p.Row(data=[  
                p.Instance(url=rto.Chart.full_url()),
                p.Instance(url=rev.Image.full_url())
            ]),
            p.Row(data=[
                p.Instance(url=rev.Highchart.full_url())]),
            p.Row(data=[
                p.Instance(url=rev.HighchartStock.full_url())
            ]),
            p.Row(data=[
                p.Instance(url=rev.HighchartMap.full_url())
            ]),

        ])


CHARTPAGE = ZenPage(
    name= "Charts",
    icon= "home",
    page= chart_page,
    tab_number=1,
    subtab_number=1
)