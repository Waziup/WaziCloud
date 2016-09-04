from setuptools import setup

setup(
    name='Waziup',
    version='1.0',
    packages=['waziup', 'waziup.commands'],
    include_package_data=True,
    install_requires=[
      'click', 'urllib3 >= 1.15', 'six >= 1.10', 'certifi', 'python-dateutil'
    ],
    entry_points='''
        [console_scripts]
        waziup=waziup.cli:cli
    ''',
)
