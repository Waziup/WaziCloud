import click
from waziup.cli import pass_context

@click.group()
@click.pass_context
def cli(ctx):
    """Waziup apps management command"""
    pass

@cli.command('create')
@click.argument('<type>')
@click.argument('<num>',help='the number of processes.')
@click.option('--app', '-a',help='a buildpack url to use for this app')
@click.pass_obj
def cli_create(ctx):
    """Waziup apps creation command"""
    pass

@cli.command('list')
@click.pass_obj
def cli_list(ctx):
    """Waziup apps list apps command"""
    pass

@cli.command('deploy')
@click.pass_obj
def cli_deploy(ctx):
    """Waziup apps deploy app command"""
    pass

@cli.command('scale')
@click.pass_obj
def cli_scale(ctx):
    """Waziup apps scale app command"""
    pass

@cli.command('destroy')
@click.pass_obj
def cli_destroy(ctx):
    """Waziup apps destroy app command"""
    pass
