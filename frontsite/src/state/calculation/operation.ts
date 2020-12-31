import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Calculation } from './type';
import { urlApi } from "../../setting/url";

const url = urlApi + 'calculation/'

export const fetchAsyncList = createAsyncThunk(
  'calculation/get_list',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'calculation/insert',
  async (rowData:Calculation) => {
    const response = await axios.post(url + 'insert',rowData);
    return response.data
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'calculation/update',
  async (rowData:Calculation) => {
    const response = await axios.post(url + 'update',rowData);
    return response.data
  }
)