import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Effect } from './type';
import { urlApi } from "../../setting/url";

const url = urlApi + 'effect/'

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

