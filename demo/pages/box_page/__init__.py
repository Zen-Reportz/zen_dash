from zen_dash import ZenPage, page as p
from pages.box_page.row_one import view as rev

box_page = p.Page(
        rows=[
            p.Row(data=[  
                p.Instance(url=rev.FirstBox.full_url()),
                p.Instance(url=rev.SecondBox.full_url()),
                p.Instance(url=rev.ThirdBox.full_url()),
                p.Instance(url=rev.ForthBox.full_url()),
            ])
        ])


BOXPAGE = ZenPage(
    name= "BoxPage",
    icon= "home",
    page= box_page
)