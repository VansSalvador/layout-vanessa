from flask import Flask,request,url_for,render_template
from flaskext.auth import Auth,AuthUser,login_required,logout
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
#auth.hash_algorithm='MD5'
app.auth.hash_algorithm = lambda to_encrypt: hashlib.sha1(to_encrypt.encode('utf-8'))
users={}

@app.before_request
def init_users():
    admin = AuthUser(username='admin@epicom.com.br')
    admin.set_and_encrypt_password('password')
    admin.role='admin'
    user = AuthUser(username='user@epicom.com.br')
    user.set_and_encrypt_password('password')
    user.role='user'
    users['admin@epicom.com.br']= admin
    users['user@epicom.com.br']=user

@app.route('/login',methods=['POST'])
def login():
    username = request.json['user']
    if username in users:
        if users[username].authenticate(request.json['pass']):
            return '302'
    return '403'

@app.route('/painel')
@login_required()
def logon():
    return render_template("logged.html",role=AuthUser.load_current_user().role)

@app.route('/logoff')
def logoff():
    logout()
    return 'ok'

if __name__ == '__main__':
    app.SERVER_NAME='myapp.dev:5000'
    app.run(debug=True)