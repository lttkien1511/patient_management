from Configs.databases import MONGO
from pymongo import MongoClient

class Mongo:
    def __init__(self, config='default', collection=None) -> None:
        config = MONGO.get(config, {})
        self.connection = MongoClient(
            host = config.get('host'),
            port = config.get('port')
        )
        self.db = self.connection[config.get('db')]
        self.collection = self.db[collection]

