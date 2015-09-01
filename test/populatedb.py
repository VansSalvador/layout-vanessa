import sys,hashlib
sys.path.insert(0,'../src') #TODO is there a better way to do this? Should assume it's in the Python path?
from model import User,Company
from mongoalchemy.session import Session
from flask import Flask
from flaskext.auth import Auth

db = Session.connect('painel')
app = Flask(__name__)

auth=Auth(app)
app.auth.hash_algorithm = lambda to_encrypt: hashlib.sha1(to_encrypt.encode('utf-8'))#prevents encoding error

#if __name__ == '__main__':
#    app.run(debug=True)

if len(sys.argv)<2:
    raise Exception('Usage: '+sys.argv[0]+' [load] [clean]')

with app.app_context():
    arg=sys.argv[1]
    if arg=='clear':
        db.clear_collection(Company)
        print('clean')
    elif arg=='load':
        admin = User(username='admin@epicom.com.br')
        admin.set_and_encrypt_password('password')
        admin.role='admin'
        admin.active=True
        user = User(username='user@epicom.com.br')
        user.set_and_encrypt_password('password')
        user.role='user'
        user.active=True
        epicom = Company(name='Epicom',token='x',users=[admin,user])
        db.insert(epicom)
        print('ok')
    else:
        raise Exception('unknown argument')
    print('Current items:')
    for item in db.query(Company).filter({}).all():
        print(item)
