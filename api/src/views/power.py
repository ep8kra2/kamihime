from flask import Blueprint, request, make_response, jsonify
from src.command.power import PowerCommand
from src.query.power import PowerQuery
from src.database import db
import json

# ルーティング設定
power_router = Blueprint('power_router', __name__)

@power_router.route('/power/get_list', methods=['GET'])
def get_list():
  res = PowerQuery.get_list()
  return make_response(jsonify(res),200)

@power_router.route('/power/insert', methods=['POST'])
def insert():
  data = request.get_json()
  res = PowerCommand.insert(data)
  return make_response(jsonify(res),200)

@power_router.route('/power/update', methods=['POST'])
def update():
  data = request.get_json()
  res = PowerCommand.update(data)
  return make_response(jsonify(res),200)
