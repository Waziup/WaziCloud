import click
from waziup.cli import pass_context


@click.command('apps', short_help='Waziup data management command')
@pass_context
def cli(ctx):
    """Waziup data management command"""
    ctx.log('Waziup status debug')
