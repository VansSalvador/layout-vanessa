from flask import Flask,request,url_for,render_template
from flaskext.auth import Auth,AuthUser,login_required,logout
from src.model import User,Company
from mongoalchemy.session import Session
import flask,time,hashlib

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

@app.route('/painel')
@login_required()
def logon():
    return render_template('painel.html')

@app.route('/logoff')
def logoff():
    logout()
    return 'ok'

if __name__ == '__main__':
    app.SERVER_NAME='myapp.dev:5000'
    app.run(debug=True)
