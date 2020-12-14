from flask import Blueprint, request, make_response, jsonify
from src.query.weapon_type import WeaponTypeQuery
from src.database import db
import json

# ルーティング設定
weapon_type_router = Blueprint('weapon_type_router', __name__)

@weapon_type_router.route('/weapon_type/get_list', methods=['GET'])
def get_list():
  res = WeaponTypeQuery.get_list()
  return make_response(jsonify(res),200)

