from flask import Blueprint, request, make_response, jsonify
from src.query.category import CategoryQuery
from src.command.category import CategoryCommand
from src.database import db
import json

# ルーティング設定
category_router = Blueprint('category_router', __name__)

@category_router.route('/category/get_list', methods=['GET'])
def get_list():

  res = CategoryQuery.get_list()

  return make_response(jsonify(res),200)

@category_router.route('/category/insert', methods=['POST'])
def insert():
  data = request.get_json()
 
  res = CategoryCommand.insert(data)

  return make_response(jsonify(res),200)

@category_router.route('/category/update', methods=['POST'])
def update():
  data = request.get_json()
 
  res = CategoryCommand.update(data)

  return make_response(jsonify(res),200)
