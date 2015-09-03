from .server import db
from flaskext.auth import AuthUser,login_required
from mongoalchemy.document import Document
from mongoalchemy.fields import *
import flask,json,time

class User(Document,AuthUser):
    username = StringField() #email
    role = EnumField(StringField(),'admin','user')
    password = StringField()
    active = BoolField(default=True)
    fullname = StringField()
    salt = StringField(default=str(int(time.time())))
    creation = IntField(default=int(time.time()))

class Company(Document):
    users = ListField(DocumentField(User))
    token = StringField()
    name = StringField()

def getuser(username):
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
