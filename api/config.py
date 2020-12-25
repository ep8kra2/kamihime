class SystemConfig:

  DEBUG = True

  SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://{user}:{password}@{host}/{db_name}?charset=utf8'.format(**{
      'user': 'kamihime',
      'password': 'kamihime',
      'host': 'localhost',
      'db_name': 'kamihime'
  })

Config = SystemConfig