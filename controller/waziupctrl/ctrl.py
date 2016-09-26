import os
import sys
import click
import connexion


CONTEXT_SETTINGS = dict(auto_envvar_prefix='WAZIUP')


class Context(object):

    def __init__(self):
        self.verbose = False
        self.home = os.getcwd()

    def log(self, msg, *args):
        """Logs a message to stderr."""
        if args:
            msg %= args
        click.echo(msg, file=sys.stderr)

    def vlog(self, msg, *args):
        """Logs a message to stderr only if verbose is enabled."""
        if self.verbose:
            self.log(msg, *args)


pass_context = click.make_pass_decorator(Context, ensure=True)
cmd_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), 'commands'))


class WaziupCTRL(click.MultiCommand):

    def list_commands(self, ctx):
        rv = []
        for filename in os.listdir(cmd_folder):
            if filename.endswith('.py') and \
               filename.startswith('cmd_'):
                rv.append(filename[4:-3])
        rv.sort()
        return rv

    def get_command(self, ctx, name):
        try:
            if sys.version_info[0] == 2:
                name = name.encode('ascii', 'replace')
            mod = __import__('waziup.commands.cmd_' + name,
                             None, None, ['ctrl'])
        except ImportError:
            return
        return mod.ctrl


#@click.option('-v', '--verbose', is_flag=True, help='Enables verbose mode.')
#@pass_context
@click.command()
def ctrl():
    click.echo('Waziup controller starting')
    app = connexion.App(__name__, specification_dir='./swagger/')
    app.add_api('swagger.yaml', arguments={'title': 'WAZIUP API'})
    app.run(port=8080)


if __name__ == '__main__':
    ctrl()
