import click
from waziup.cli import pass_context


@click.group()
@click.pass_context
def cli(ctx):
    """Waziup data command"""
    pass

@cli.command('observations')
@click.pass_obj
def cli_observations(ctx):
    """Waziup data observation command"""
    pass

