from flask import Blueprint, request, make_response, jsonify
from src.query.phantom import PhantomQuery
from src.command.phantom import PhantomCommand
from src.database import db
import json

# ルーティング設定
phantom_router = Blueprint('phantom_router', __name__)

@phantom_router.route('/phantom/get_list/', methods=['GET'])
def get_list():
  res = PhantomQuery.get_list()
  return make_response(jsonify(res),200)

@phantom_router.route('/phantom/insert', methods=['POST'])
def insert():
  data = request.get_json()
  res = PhantomCommand.insert(data)
  return make_response(jsonify(res),200)

@phantom_router.route('/phantom/update', methods=['POST'])
def update():
  data = request.get_json()
  res = PhantomCommand.update(data)
  return make_response(jsonify(res),200)