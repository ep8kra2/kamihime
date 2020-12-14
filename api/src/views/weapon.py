from flask import Blueprint, request, make_response, jsonify
from src.models.weapon import WeaponList,Weapon
from src.command.weapon import WeaponCommand
from src.query.weapon import WeaponQuery
from src.database import db
import json

# ルーティング設定
weapon_router = Blueprint('weapon_router', __name__)

@weapon_router.route('/weapon/get_list', methods=['GET'])
def get_list():
  res = WeaponQuery.get_list()
  return make_response(jsonify(res),200)

@weapon_router.route('/weapon/insert', methods=['POST'])
def insert():  
  data = request.get_json()
  res = WeaponCommand.insert(data)
  return make_response(jsonify(res),200)

@weapon_router.route('/weapon/update', methods=['POST'])
def update():  
  data = request.get_json()
  res = WeaponCommand.update(data)
  return make_response(jsonify(res),200)