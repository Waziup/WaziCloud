import click
from waziup.cli import pass_context


@click.command('status', short_help='Waziup status')
@pass_context
def cli(ctx):
    """Waziup Status"""
    ctx.log('Waziup status debug')
