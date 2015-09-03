from .server import db
from flaskext.auth import AuthUser,login_required
import flask,json
from mongoalchemy.document import Document
from mongoalchemy.fields import *

class User(Document,AuthUser):
    username = StringField()
    role = EnumField(StringField(),'admin','user')#TODO test invalid?
    password = StringField()
    active = BoolField()
    salt = StringField()

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
def listusers(current=None):
    if current==None:
        current=AuthUser.load_current_user()
    if current.role!='admin':
        flask.abort(403)
    q=db.query(Company)
    q.raw_output()
    return json.dumps(q.filter({'users': {'$elemMatch': {'username': current.username}}}).first()['users'])