from setuptools import setup

setup(
    name='Waziup',
    version='1.0',
    packages=['waziup', 'waziup.commands'],
    include_package_data=True,
    install_requires=[
        'click',
    ],
    entry_points='''
        [console_scripts]
        waziup=waziup.cli:cli
    ''',
)
