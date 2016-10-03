from setuptools import setup

setup(
    name='Waziup-ctrl',
    version='1.0',
    packages=['waziupctrl'],
    include_package_data=True,
    install_requires=[
        'click','connexion'
    ],
    entry_points='''
        [console_scripts]
        waziup-ctrl=waziupctrl.ctrl:ctrl
    ''',
)
