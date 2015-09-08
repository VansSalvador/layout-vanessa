from flaskext.auth import Auth
from mongoalchemy.session import Session
from src.users import User,Company,createsalt
import flask,hashlib,sys

db = Session.connect('painel')
app = flask.Flask(__name__)
auth=Auth(app)
app.auth.hash_algorithm = lambda to_encrypt: hashlib.sha1(to_encrypt.encode('utf-8'))#prevents encoding error

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
        epicom = Company(name='Epicom',users=[admin,user,inactive],api_key='3CBCDE7DC484A',api_secret='7936DE1F95E83A3DAEB17BEBBACAF')
        db.insert(epicom)
        print('ok')
    else:
        raise Exception('unknown argument')
    print('Current items:')
    for item in db.query(Company).filter({}).all():
        print(item.name)
        for user in item.users:
            print(' '+user.salt)
