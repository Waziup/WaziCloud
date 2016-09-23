import click
import time
from swagger_client.rest import ApiException
from swagger_client import AppsApi
from pprint import pprint
from waziup.cli import pass_context


@click.command('apps', short_help='Waziup apps management command')
@pass_context
def cli(ctx):
    """Waziup apps management command"""
    ctx.log('Waziup status debug')
    try:
        api_response = AppsApi().apps_get()
        pprint(api_response)
    except ApiException as e:
        print("Exception when calling AppsApi->apps_get: %s\n", e)
