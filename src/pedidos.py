from flaskext.auth import AuthUser, login_required
import flask
import requests

from .server import config
from settings import ConfigFactory
from src import users


@login_required()
def checkprivilege():
    if AuthUser.load_current_user().role != 'admin':
        flask.abort(403)


@login_required()
def getPedido(codigoPedido):
    checkprivilege()

    apiKey, apiToken = users.getApiCredentials()

    url = ConfigFactory.getApiUrl(config, 'v1/marketplace/pedidos/' + codigoPedido)
    r = requests.get(url, auth=(apiKey, apiToken))
    r.raise_for_status()

    return r.json(), 200


@login_required()
def listPedidos(nomeCliente=None, dataInicio=None, dataFim=None, offset=0, limit=10):
    checkprivilege()

    apiKey, apiToken = users.getApiCredentials()

    payload = {
        'NomeCliente': nomeCliente,
        'DataInicio': dataInicio,
        'DataFim': dataFim,
        'Offset': offset,
        'Limit': limit
    }

    url = ConfigFactory.getApiUrl(config, 'v1/marketplace/pedidos/')
    r = requests.get(url, auth=(apiKey, apiToken), params=payload)
    r.raise_for_status()

    return r.json(), 200
