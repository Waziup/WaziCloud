import click
import time
import swagger_client
from swagger_client.rest import ApiException
from pprint import pprint
from waziup.cli import pass_context


@click.command('apps', short_help='Waziup apps management command')
@pass_context
def cli(ctx):
    """Waziup apps management command"""
    ctx.log('Waziup status debug')
    # create an instance of the API class
    api_instance = swagger_client.AppsApi()

    try:
        api_response = api_instance.apps_get()
        pprint(api_response)
    except ApiException as e:
        print "Exception when calling AppsApi->apps_get: %s\n" % e
