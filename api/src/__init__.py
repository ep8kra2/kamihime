from flask import Flask, make_response, jsonify
from .views.weapon import weapon_router
from .views.skill import skill_router
from .views.effect import effect_router
from .views.category import category_router
from .views.power import power_router
from .views.weapon_type import weapon_type_router
from .views.rarity import rarity_router
from .views.impact import impact_router
from flask_cors import CORS
from src.database import db
import config

def create_app():

  app = Flask(__name__)

  # CORS対応
  CORS(app)

  # DB設定を読み込む
  app.config.from_object('config.Config')
  db.init_app(app)

  app.register_blueprint(weapon_router, url_prefix='/api')
  app.register_blueprint(skill_router, url_prefix='/api')
  app.register_blueprint(effect_router,url_prefix='/api')
  app.register_blueprint(category_router,url_prefix='/api')
  app.register_blueprint(power_router,url_prefix='/api')
  app.register_blueprint(weapon_type_router,url_prefix='/api')
  app.register_blueprint(impact_router,url_prefix='/api')
  app.register_blueprint(rarity_router,url_prefix='/api')
  return app

app = create_app()