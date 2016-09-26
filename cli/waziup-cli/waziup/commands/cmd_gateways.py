import click
from waziup.cli import pass_context


@click.group()
@click.pass_context
def cli(ctx):
    """Waziup gateway command"""
    pass

@cli.command('add')
@click.pass_obj
@click.argument('<gatewayIP>')
def cli_add(ctx):
    """Waziup gateway add command"""
    pass

@cli.command('remove')
@click.argument('<gatewayIP>')
@click.pass_obj
def cli_remove(ctx):
    """Waziup gateway remove command"""
    pass

@cli.command('list')
@click.pass_obj
def cli_list(ctx):
    """Waziup gateway list command"""
    pass

@cli.command('sensors')
@click.argument('<gatewayIP>')
@click.pass_obj
def cli_sensors(ctx):
    """Waziup gateway sensors command"""
    pass

