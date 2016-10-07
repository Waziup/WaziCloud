FROM python

COPY controller /controller
COPY commons /commons
EXPOSE 8080
RUN pip install click connexion


WORKDIR /commons
RUN pip install -e .

WORKDIR /controller
CMD python waziupctrl/ctrl.py

