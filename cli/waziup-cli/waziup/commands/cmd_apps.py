import click
from waziup.cli import pass_context


@click.command('apps', short_help='Waziup apps management command')
@pass_context
def cli(ctx):
    """Waziup apps management command"""
    ctx.log('Waziup status debug')
