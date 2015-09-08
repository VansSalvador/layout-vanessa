from mongoalchemy.session import Session

app = None
db = Session.connect('painel')
