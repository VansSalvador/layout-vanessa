from flaskext.auth import AuthUser, login_required, logout
import flask

from .users import getuser

auth = None


def login():
    user, company = getuser(flask.request.json['user'])
    if user == None:
        return getResponse(403)
    if not user.active:
        return getResponse(401)

    ## must instantiate an AuthUser that is serializable to JSON, unlike the MongoAlchemy data object
    authUser = AuthUser(username=user.username, password=user.password, salt=user.salt, role=user.role)
    if authUser.authenticate(flask.request.json['pass']):
        return flask.jsonify(username = user.username, role = user.role), 200
    else:
        getResponse(403)


@login_required()
def logon():
    return flask.render_template('painel.html')


@login_required()
def logoff():
    logout()
    return flask.redirect(flask.url_for('/'))  # TODO change url


def getResponse(code):
    if code == 403:
        return 'Access Forbidden', code
    elif code == 401:
        return 'Not authorized', code
    else:
        return None
