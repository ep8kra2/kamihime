from flask import Blueprint, request, make_response, jsonify
from src.command.effect import EffectCommand
from src.query.effect import EffectQuery
from src.database import db
import json

# ルーティング設定
effect_router = Blueprint('effect_router', __name__)

@effect_router.route('/effect/geteffectpowerlist', methods=['POST'])
def geteffectpowerlist():
  data = request.get_json()
  effectpowerlist = EffectCommand.getEffectPowerList(data)
  return make_response(jsonify({
    'effectPowerList': effectpowerlist
  }))

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

@effect_router.route('/effect/level/insert', methods=['POST'])
def insert_level():
  data = request.get_json()
  res = EffectCommand.insert_level(data)
  return make_response(jsonify(res),200)

@effect_router.route('/effect/level/update', methods=['POST'])
def update_level():
  data = request.get_json()
  res = EffectCommand.update_level(data)
  return make_response(jsonify(res),200)


@effect_router.route('/effect/level/detail/get_list/<effectLevelId>/', methods=['GET'])
def get_list_level_detail(effectLevelId):
  res = EffectQuery.get_list_level_detail(effectLevelId)
  return make_response(jsonify(res),200)

@effect_router.route('/effect/level/detail/update', methods=['POST'])
def update_level_detail():
  data = request.get_json()
  res = EffectCommand.update_level_detail(data)
  return make_response(jsonify(res),200)

@effect_router.route('/effect/level/detail/insert', methods=['POST'])
def insert_level_detail():
  data = request.get_json()
  res = EffectCommand.insert_level_detail(data)
  return make_response(jsonify(res),200)