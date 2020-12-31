import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Skill,SkillEffect } from './type';
import { urlApi } from "../../setting/url";

const url = urlApi + 'skill/'

export const fetchAsyncList = createAsyncThunk(
  'skill/List',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'skill/insert',
  async (rowData:Skill) => {
    const response = await axios.post(url + 'insert',rowData);

    return response.data
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'skill/update',
  async (rowData:Skill) => {
    const response = await axios.post(url + 'update',rowData);

    return response.data
  }
)

export const fetchAsyncListEffect = createAsyncThunk(
  'skill/effect/ListAll',
  async () => {
    const response = await axios.get(url + `effect/get_list`);
    return response.data
  }
)

export const fetchAsyncSelectedListEffect = createAsyncThunk(
  'skill/effect/List',
  async (rowData:Skill) => {
    const response = await axios.get(url + `effect/get_list/${rowData.id}`);
    return response.data
  }
)

export const fetchAsyncInsertEffect = createAsyncThunk(
  'skill/effect/insert',
  async (rowData:SkillEffect) => {
    const response = await axios.post(url + 'effect/insert',rowData);

    return response.data
  }
)

export const fetchAsyncUpdateEffect = createAsyncThunk(
  'skill/effect/update',
  async (rowData:SkillEffect) => {
    const response = await axios.post(url + 'effect/update',rowData);

    return response.data
  }
)
