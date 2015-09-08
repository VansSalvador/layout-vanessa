from .server import db
from flaskext.auth import AuthUser,login_required
from mongoalchemy.document import Document
from mongoalchemy.fields import *
import flask,json,time,random

class User(Document,AuthUser):
    username = StringField() #email
    role = EnumField(StringField(),'admin','user')
    password = StringField()
    active = BoolField(default=True)
    fullname = StringField()
    salt = StringField()
    creation = IntField(default=int(time.time()))

class Company(Document):
    users = ListField(DocumentField(User))
    name = StringField()
    api_key = StringField() #128-bit http://randomkeygen.com/
    api_secret = StringField() #256-bit http://randomkeygen.com/

def getuser(username=None):
    if username==None:
        username=AuthUser.load_current_user()
        if username==None:
            flask.abort(403)
        username=username.username
    company=db.query(Company).filter({'users': {'$elemMatch': {'username': username}}}).first()
    if company==None:
        return None,None
    for user in company.users:
        if user.username==username:
            return user,company
    raise Exception('User found on DB but not on user array')

@login_required()
def checkprivilege():
    if AuthUser.load_current_user().role!='admin':
        flask.abort(403)

@login_required()
def listusers(current=None):
    checkprivilege()
    if current==None:
        current=AuthUser.load_current_user()
    q=db.query(Company)
    q.raw_output()
    return json.dumps(q.filter({'users': {'$elemMatch': {'username': current.username}}}).first()['users'])

@login_required()
def deleteuser():
    checkprivilege()
    user,company=getuser(flask.request.json['user'])
    company.users.remove(user)
    db.save(company)
    return 'ok'

'''
User é um documento interno de Company.
Essa função comtempla tanto a criação quando atualização de um usuário.
Considera-se atualização quando o e-mail já existe e é da mesma empresa.
'''
@login_required()
def adduser():
    checkprivilege()
    current=flask.request.json['current']
    myuser,mycompany=getuser()
    user,company=None,None
    if current:#user being updated
        user,company=getuser(flask.request.json['mail'])
        if company!=None and company.name!=mycompany.name:
            #trying to inser a user whose email clashes with one from another company
            flask.abort(422)
        user,company=getuser(current)
        company.users.remove(user)
    else:#user being created
        user,company=myuser,mycompany
    newuser = User(username=flask.request.json['mail'],role=flask.request.json['role'],active=flask.request.json['active']=='active',fullname=flask.request.json['name'])
    newuser.set_and_encrypt_password(flask.request.json['pass'],createsalt())
    if current:
        newuser.creation=user.creation
    company.users.append(newuser)
    db.save(company)
    return 'ok'

def createsalt():
    salt=''
    while(len(salt)<10):
        salt+=str(random.randint(0,9))
    return salt