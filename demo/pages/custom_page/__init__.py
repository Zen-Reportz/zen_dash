from zen_dash import ZenPage, page as p

from pages.custom_page.row_nine import view


custom_page =  p.Page(
        rows=[
            
            p.Row(
                data=[p.Instance(url=view.CustomHTML.full_url()),
                      p.Instance(url=view.FullCustomHTML.full_url())]),
            p.Row(
                data=[p.Instance(url=view.IFrame.full_url())]),


        ])


CUSTOMPAGE = ZenPage(
    name= "Custom",
    icon= "home",
    page= custom_page,
    tab_number=1,
    subtab_number=3
)