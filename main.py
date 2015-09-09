from src import server,login,users
from mongoalchemy.session import Session
import flask,json,hashlib,os,settings

server.app=flask.Flask(__name__)
jinja_options = server.app.jinja_options.copy()
jinja_options.update(dict(
    block_start_string='[%',
    block_end_string='%]',
    variable_start_string='[[',
    variable_end_string=']]',
    comment_start_string='[#',
    comment_end_string='#]',
))

server.app.jinja_options = jinja_options
server.app.secret_key='^mu0n!22#yqy=8a5x1hg5%1!2#dedsn=&cd&$ur3pzqiw+#$yd'
login.auth=login.Auth(server.app)
login.auth.user_timeout=8*60*60 #8 hours
server.app.auth.hash_algorithm = lambda to_encrypt: hashlib.sha1(to_encrypt.encode('utf-8'))#prevents encoding error

server.app.add_url_rule('/login','login',login.login,methods=['POST'])
server.app.add_url_rule('/painel','logon',login.logon)
server.app.add_url_rule('/logoff','logoff',login.logoff)
server.app.add_url_rule('/api/listusers','listusers',users.listusers)
server.app.add_url_rule('/api/deleteuser','deleteuser',users.deleteuser,methods=['POST'])
server.app.add_url_rule('/api/adduser','adduser',users.adduser,methods=['POST'])

server.app.config.from_object(os.environ['PAINELCONFIG'] if 'PAINELCONFIG' in os.environ else settings.DevelopmentConfig())
server.db=Session.connect(server.app.config['PAINEL_DBNAME'],host=server.app.config['PAINEL_DBURI'])

if __name__ == '__main__':
    server.app.run(debug=True)
