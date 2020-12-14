import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { EffectLevel, EffectLevelDetail } from './type';

const url = 'http://localhost:5000/api/effect/level/'

export const fetchAsyncList = createAsyncThunk(
  'effectlevel/list',
  async() => {
    const response = await axios.get(url + 'get_list');

    return response.data;
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'effectlevel/insert',
  async(rowData:EffectLevel) => {
    const response = await axios.post(url + 'insert',rowData);

    return response.data;
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'effectlevel/update',
  async(rowData:EffectLevel) => {
    const response = await axios.post(url + 'update',rowData);

    return response.data;
  }
)

export const fetchAsyncDetailList = createAsyncThunk(
  'effectlevel/detail/list',
  async(rowData:EffectLevel) => {
    const response = await axios.get(url + `detail/get_list/${rowData.id}`);

    return response.data;
  }
)

export const fetchAsyncDetailInsert = createAsyncThunk(
  'effectlevel/detail/insert',
  async(rowData:EffectLevelDetail) => {
    const response = await axios.post(url + 'detail/insert',rowData);

    return response.data;
  }
)

export const fetchAsyncDetailUpdate = createAsyncThunk(
  'effectlevel/detail/update',
  async(rowData:EffectLevelDetail) => {
    const response = await axios.post(url + 'detail/update',rowData);

    return response.data;
  }
)
