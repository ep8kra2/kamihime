from flask import Blueprint, request, make_response, jsonify
from src.model.skill import Skill
from src.query.skill import SkillQuery
from src.command.skill import SkillCommand
from src.database import db
import json

# ルーティング設定
skill_router = Blueprint('skill_router', __name__)

@skill_router.route('/skill/get_list', methods=['GET'])
def get_list():
  response = SkillQuery.get_list()
  return make_response(jsonify(response),200)

@skill_router.route('/skill/insert', methods=['POST'])
def insert():
  data = request.get_json()
  res = SkillCommand.insert(data)
  return make_response(jsonify(res),200)

@skill_router.route('/skill/update', methods=['POST'])
def update():
  data = request.get_json()
  res = SkillCommand.update(data)
  return make_response(jsonify(res),200)

@skill_router.route('/skill/effect/get_list', methods=['GET'])
def get_list_effect_all():
  res = SkillQuery.get_list_effect_all()
  print(res)
  return make_response(jsonify(res),200)

@skill_router.route('/skill/effect/get_list/<skillId>', methods=['GET'])
def get_list_effect(skillId):
  res = SkillQuery.get_list_effect(skillId)
  return make_response(jsonify(res),200)

@skill_router.route('/skill/effect/insert', methods=['POST'])
def insert_effect():
  data = request.get_json()
  print(data['skillId'])
  res = SkillCommand.insert_effect(data)
  return make_response(jsonify(res),200)

@skill_router.route('/skill/effect/update', methods=['POST'])
def update_effect():
  data = request.get_json()
  res = SkillCommand.update_effect(data)
  return make_response(jsonify(res),200)
