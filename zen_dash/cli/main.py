import click
from zen_dash.cli import project_management as pm


@click.command()
@click.argument("location")
def create_zen(location):
    if location is None:
        location = "."
    pm.create_zen(location)



    