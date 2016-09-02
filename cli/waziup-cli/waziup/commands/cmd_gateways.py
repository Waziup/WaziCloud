import click
from waziup.cli import pass_context


@click.command('apps', short_help='Waziup gateway management command')
@pass_context
def cli(ctx):
    """Waziup gateway management command"""
    ctx.log('Waziup status debug')
