import click
from waziup.cli import pass_context


@click.group()
@click.pass_context
def cli(ctx):
    """Waziup auth command"""
    pass

@cli.command('register')
@click.pass_obj
@click.argument('<controller>')
@click.option('--username', '-u',help='user username')
@click.option('--password', '-p',help='user password')
@click.option('--email', '-e',help='user email')
def cli_register(ctx,controller):
    """Waziup auth register command"""
    pass

@cli.command('login')
@click.pass_obj
@click.argument('<controller>')
@click.option('--username', '-u',help='user username')
@click.option('--password', '-p',help='user password')
def cli_login(ctx):
    """Waziup auth login command"""
    pass

@cli.command('logout')
@click.pass_obj
def cli_logout(ctx):
    """Waziup logout command"""
    pass

