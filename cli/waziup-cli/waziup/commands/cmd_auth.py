import click
from waziup.cli import pass_context


@click.command('auth', short_help='Waziup Authentication and Registration')
@pass_context
def cli(ctx):
    """Waziup Authentication and Registration"""
    ctx.log('waziup auth')
