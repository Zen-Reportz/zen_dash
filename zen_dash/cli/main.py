import click
from zen_dash import project_management as pm


@click.command()
@click.argument("location")
def create_project(location):
    if location is None:
        location = "."
    pm.create_project(location)



    