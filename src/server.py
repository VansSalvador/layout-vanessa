import os

import settings

app = None
db = None
config = settings.ConfigFactory.create(type=os.environ.get('EPICOM_ENVIRONMENT'))
