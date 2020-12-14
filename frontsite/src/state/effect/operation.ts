import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Skill } from '../skill/type';
import { Effect } from './type';

const url = 'http://localhost:5000/api/effect/'

const urlx = 'http://localhost:5000/api/effectpower/get_list'

export const fetchEffctPowerList = createAsyncThunk(
  'effectPower/list',
  async (skillList:Skill[]) => {

    console.log(skillList)
    const response = await axios.post(urlx,skillList);

    return response.data.effectPowerList
  }
)

export const fetchAsyncList = createAsyncThunk(
  'effect/list',
  async() => {
    const response = await axios.get(url + 'get_list');

    return response.data;
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'effect/insert',
  async(effectNew:Effect) => {
    const response = await axios.post(url + 'insert',effectNew);

    return response.data;
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'effect/update',
  async(effectNew:Effect) => {
    const response = await axios.post(url + 'update',effectNew);

    return response.data;
  }
)

