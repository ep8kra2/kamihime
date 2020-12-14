from flask import Blueprint, request, make_response, jsonify
from src.query.rarity import RarityQuery
from src.database import db
import json

# ルーティング設定
rarity_router = Blueprint('rarity_router', __name__)

@rarity_router.route('/rarity/get_list', methods=['GET'])
def get_list():

  res = RarityQuery.get_list()
  return make_response(jsonify(res),200)