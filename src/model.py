from mongoalchemy.document import Document
from mongoalchemy.fields import *
from flaskext.auth import AuthUser

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