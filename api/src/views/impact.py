from flask import Blueprint, request, make_response, jsonify
from src.query.impact import ImpactQuery
from src.command.impact import ImpactCommand
from src.database import db
import json

@impact_router.route('/impact/selected/<category_id>', methods=['GET'])
def selected(id):
  res = ImpactQuery.selected(id)

  return make_response(jsonify(res),200)

@impact_router.route('/impact/get_list/', methods=['GET'])
def get_list():

  res = ImpactQuery.get_list()

  return make_response(jsonify(res),200)

@impact_router.route('/impact/insert', methods=['POST'])
def insert():
  data = request.get_json()
 
  res = ImpactCommand.insert(data)

  return make_response(jsonify(res),200)

@impact_router.route('/impact/update', methods=['POST'])
def update():
  data = request.get_json()
 
  res = ImpactCommand.update(data)

  return make_response(jsonify(res),200)