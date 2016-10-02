import click
from waziup.cli import pass_context


@click.group()
@click.pass_context
def cli(ctx):
    """Waziup user management command"""
    pass

@cli.command('add')
@click.pass_obj
def cli_add(ctx):
    """Waziup user add command"""
    pass

@cli.command('list')
@click.pass_obj
def cli_list(ctx):
    """Waziup list user command"""
    pass

@cli.command('remove')
@click.pass_obj
def cli_remove(ctx):
    """Waziup user remove command"""
    pass

