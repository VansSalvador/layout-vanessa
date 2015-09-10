class Config(object):
    API_EPICOM_URL = 'https://api.epicom.com.br'


class DevelopmentConfig(Config):
    PAINEL_DBURI = 'mongodb://localhost:27017/painel'
    PAINEL_DBNAME = 'painel'


class TestingConfig(Config):
    PAINEL_DBURI = 'mongodb://usrPainel:18un8JweJS@172.31.30.116:27017/painel-test'
    PAINEL_DBNAME = 'painel-test'
    API_EPICOM_URL = 'https://api.epicom.com.br'


class SandboxConfig(TestingConfig):
    pass  # TODO


class ProductionConfig(Config):
    pass  # TODO


class ConfigFactory():
    @staticmethod
    def create(type):
        return {
            'DEV': DevelopmentConfig(),
            'TEST': TestingConfig(),
            'SANDBOX': SandboxConfig(),
            'PRODUCTION': ProductionConfig()
        }.get(type, DevelopmentConfig())


class ConfigHelper():
    def getApiUrl(Config, endpoint):
        return Config.API_EPICOM_URL + '/' + endpoint
