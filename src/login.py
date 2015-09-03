from flaskext.auth import Auth,AuthUser,login_required,logout
from .server import app
from .users import getuser
import hashlib,flask

auth=None

def login():
    user,company = getuser(flask.request.json['user'])
    if user==None:
        return '403'
    if not user.active:
        return '401'
    #must instantiate an AuthUser that is serializable to JSON, unlike the MongoAlchemy data object
    jsonuser=AuthUser(username=user.username,password=user.password,salt=user.salt)
    jsonuser.role=user.role
    return '302' if jsonuser.authenticate(flask.request.json['pass']) else '403'

@login_required()
def logon():
    return flask.render_template('painel.html')

@login_required()
def logoff():
    logout()
    return flask.redirect('/static/index.html') #TODO change url