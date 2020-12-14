from flask import Blueprint, request, make_response, jsonify
from src.models.slot import Slot,SlotSchema
from src.database import db
import json

# ルーティング設定
slot_router = Blueprint('slot_router', __name__)

@slot_router.route('/slot/list', methods=['GET'])
def getSlotList():

  slotList = db.session.query(Slot).all()

  slotListschema = SlotSchema(many=True)

  return make_response(jsonify({
    'slotList': slotListschema.dump(slotList)
  }))
