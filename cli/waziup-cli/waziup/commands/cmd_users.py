import click
from waziup.cli import pass_context


@click.command('apps', short_help='Waziup user management command')
@pass_context
def cli(ctx):
    """Waziup user management command"""
    ctx.log('Waziup status debug')
