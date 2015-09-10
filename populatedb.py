import hashlib
import sys
import os

from flaskext.auth import Auth

from mongoalchemy.session import Session
import flask

from src.users import User,Company,createsalt
import settings

app = flask.Flask(__name__)
app.config.from_object(settings.ConfigFactory.create(os.environ['EPICOM_ENVIRONMENT']))
db = Session.connect(app.config['PAINEL_DBNAME'], host=app.config['PAINEL_DBURI'])
auth = Auth(app)
app.auth.hash_algorithm = lambda to_encrypt: hashlib.sha1(to_encrypt.encode('utf-8'))  # prevents encoding error

if len(sys.argv)<2:
    raise Exception('Usage: '+sys.argv[0]+' [load] [clean]')

with app.app_context():
    arg=sys.argv[1]
    if arg=='clear':
        db.clear_collection(Company)
        print('clean')
    elif arg=='load':
        admin = User(username='admin@epicom.com.br',role='admin',active=True,fullname='Administrador')
        admin.set_and_encrypt_password('password',createsalt())
        user = User(username='user@epicom.com.br',role='user',active=True,fullname='Usuário',salt=createsalt())
        user.set_and_encrypt_password('password',createsalt())
        inactive = User(username='inativo@epicom.com.br',role='user',active=False,fullname='Inativo',salt=createsalt())
        inactive.set_and_encrypt_password('password',createsalt())
        old = User(username='old@epicom.com.br',role='user',active=False,fullname='Velho',salt=createsalt())
        old.set_and_encrypt_password('password',createsalt())
        old.creation=1
        epicom = Company(name='Epicom',users=[admin,user,inactive,old],api_key='3CBCDE7DC484A',api_secret='7936DE1F95E83A3DAEB17BEBBACAF')
        db.insert(epicom)

        mlUser = User(username='mercadolivre@mercadolivre.com', role='admin', active=True, fullname='Mercado Livre')
        mlUser.set_and_encrypt_password('password', createsalt())
        db.insert(
            Company(name='MercadoLivre', users=[mlUser], api_key='96FCD19E9F3874EB', api_secret='k40YT84vX43AJk2YBG0nAoGUiyS2zXz7')
        )

        cnovaUser = User(username='cnova@cnova.com', role='admin', active=True, fullname='CNOVA')
        cnovaUser.set_and_encrypt_password('password', createsalt())
        db.insert(
            Company(name='CNova', users=[cnovaUser], api_key='871294DDB6771517', api_secret='z7k7AIZVC25q2EO5Ou0L044mAGT46Gi6')
        )

        papaleguas = User(username='papaleguas@acme.com',role='admin',active=True,fullname='Pápa-léguas')
        papaleguas.set_and_encrypt_password('password',createsalt())
        acme = Company(name='ACME',users=[papaleguas],api_key='485EEE7F52C9B',api_secret='7BF9B68A1AB942C2CBD847587526F')
        db.insert(acme)
        print('ok')
    else:
        raise Exception('unknown argument')

    print('Current items:')
    for item in db.query(Company).filter({}).all():
        print(item.name)
        for user in item.users:
            print(' ' + user.username)
