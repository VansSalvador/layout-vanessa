from flask import Flask,request,url_for,render_template
from flaskext.auth import Auth,AuthUser,login_required,logout
from src.model import User,Company
from mongoalchemy.session import Session
from bson import json_util
import flask,time,hashlib,pymongo,json

app = Flask(__name__)

jinja_options = app.jinja_options.copy()
jinja_options.update(dict(
    block_start_string='[%',
    block_end_string='%]',
    variable_start_string='[[',
    variable_end_string=']]',
    comment_start_string='[#',
    comment_end_string='#]',
))
app.jinja_options = jinja_options
app.secret_key='^mu0n!22#yqy=8a5x1hg5%1!2#dedsn=&cd&$ur3pzqiw+#$yd'

auth=Auth(app)
app.auth.hash_algorithm = lambda to_encrypt: hashlib.sha1(to_encrypt.encode('utf-8'))#prevents encoding error

db = Session.connect('painel')

@app.route('/login',methods=['POST'])
def login():
    user,company = getuser(request.json['user'])
    if user==None:
        return '403'
    if not user.active:
        return '401'
    #must instantiate an AuthUser that is serializable to JSON, unlike the MongoAlchemy data object
    jsonuser=AuthUser(username=user.username,password=user.password,salt=user.salt)
    jsonuser.role=user.role
    return '302' if jsonuser.authenticate(request.json['pass']) else '403'

def getuser(username):
    company=db.query(Company).filter({'users': {'$elemMatch': {'username': username}}}).first()
    if company==None:
        return None,None
    for user in company.users:
        if user.username==username:
            return user,company
    raise Exception('User found on DB but not on user array')

@login_required()
def logon():
    return render_template('painel.html')

@login_required()
def logoff():
    logout()
    return 'ok'

@login_required()
def listusers():
    #TODO only admin
    user,company = getuser(AuthUser.load_current_user().username)
    return json.dumps(company.users,default=json_util.default)

app.add_url_rule('/painel','logon',logon)
app.add_url_rule('/logoff','logoff',logoff)
app.add_url_rule('/api/listusers','listusers',listusers)

if __name__ == '__main__':
    app.SERVER_NAME='myapp.dev:5000'
    app.run(debug=True)
