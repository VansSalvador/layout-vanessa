class Config(object):
    pass

class DevelopmentConfig(Config):
    PAINEL_DBURI='mongodb://localhost:27017/painel'
    PAINEL_DBNAME='painel'

class TestingConfig(Config):
    PAINEL_DBURI='mongodb://usrPainel:18un8JweJS@172.31.30.116:27017/painel-test'
    PAINEL_DBNAME='painel-test'

class SandboxConfig(TestingConfig):
    pass#TODO

class ProductionConfig(Config):
    pass#TODO
