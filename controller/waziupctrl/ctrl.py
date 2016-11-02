import os
import sys
import click
import connexion
import config as CONFIG


@click.command()
@click.option('-v', '--verbose', is_flag=True, help='Enables verbose mode.')
@click.option('-p', '--port', default='8080', help='controller port, default is 8080')
@click.option('-b', '--brokerURL', default='http://www.waziup.io:30026', help='Broker URL, default is http://www.waziup.io:30026')
def ctrl(verbose, port, brokerurl):
    click.echo('Waziup controller starting')

    CONFIG.conf.brokerurl = brokerurl
    app = connexion.App(__name__, specification_dir='../../APIs/')
    app.add_api('swagger.yaml', arguments={'title': 'WAZIUP API'})
    app.run(port=port)


if __name__ == '__main__':
    ctrl()
