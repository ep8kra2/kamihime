from flask import Blueprint, request, make_response, jsonify
from src.command.calculation import CalculationCommand
from src.query.calculation import CalculationQuery
from src.database import db
import json

# ルーティング設定
calculation_router = Blueprint('calculation_router', __name__)

@calculation_router.route('/calculation/get_list', methods=['GET'])
def get_list():
  res = CalculationQuery.get_list()
  return make_response(jsonify(res),200)

@calculation_router.route('/calculation/insert', methods=['POST'])
def insert():
  data = request.get_json()
  res = CalculationCommand.insert(data)
  return make_response(jsonify(res),200)

@calculation_router.route('/calculation/update', methods=['POST'])
def update():
  data = request.get_json()
  res = CalculationCommand.update(data)
  return make_response(jsonify(res),200)
