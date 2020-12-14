from flask import Blueprint, request, make_response, jsonify
from src.query.category import CategoryQuery
from src.query.category_detail import CategoryDetailQuery
from src.command.category import CategoryCommand
from src.command.category_detail import CategoryDetailCommand
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

@category_router.route('/category/detail/selected_detail/<category_id>', methods=['GET'])
def selected_detail(category_id):

  res = CategoryDetailQuery.selected_detail(category_id)

  return make_response(jsonify(res),200)

@category_router.route('/category/detail/get_list/', methods=['GET'])
def get_detail_list():

  res = CategoryDetailQuery.get_list()

  return make_response(jsonify(res),200)

@category_router.route('/category/detail/insert', methods=['POST'])
def detail_insert():
  data = request.get_json()
 
  res = CategoryDetailCommand.insert(data)

  return make_response(jsonify(res),200)

@category_router.route('/category/detail/update', methods=['POST'])
def detail_update():
  data = request.get_json()
 
  res = CategoryDetailCommand.update(data)

  return make_response(jsonify(res),200)