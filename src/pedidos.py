from .server import db
from flaskext.auth import AuthUser,login_required
from mongoalchemy.document import Document
from mongoalchemy.fields import *
import flask,json,time


class Pedido(Document):
    data = DateTimeField()
    codigoPedido = IntField()
    codigoCliente = StringField()
    nomeCliente = StringField()
    valor = FloatField()
    status = StringField()
    fornecedores = StringField()
    produtos = StringField()


@login_required()
def checkprivilege():
    if AuthUser.load_current_user().role != 'admin':
        flask.abort(403)


@login_required()
def getPedido(codigoPedido):
    # TODO: Load from database
    return None


@login_required()
def listPedidos(current=None):
    checkprivilege()
    # TODO: Load from database
