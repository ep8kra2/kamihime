from flask import Blueprint, request, make_response, jsonify
from src.command.effect import EffectCommand
from src.query.effect import EffectQuery
from src.database import db
import json

# ルーティング設定
effect_router = Blueprint('effect_router', __name__)

@effect_router.route('/effect/get_list', methods=['GET'])
def get_list():
  res = EffectQuery.get_list()
  return make_response(jsonify(res),200)

@effect_router.route('/effect/insert', methods=['POST'])
def insert():
  data = request.get_json()
  res = EffectCommand.insert(data)
  return make_response(jsonify(res),200)

@effect_router.route('/effect/update', methods=['POST'])
def update():
  data = request.get_json()
  res = EffectCommand.update(data)
  return make_response(jsonify(res),200)

@effect_router.route('/effect/level/get_list', methods=['GET'])
def get_list_level():
  res = EffectQuery.get_list_level()
  return make_response(jsonify(res),200)
