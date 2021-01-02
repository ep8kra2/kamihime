import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Phantom } from "./type";
import { urlApi } from "../../setting/url";

const url = urlApi + 'phantom/'

export const fetchAsyncList = createAsyncThunk(
  'phantom/list',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'phantom/insert',
  async (rowData:Phantom) => {
    const response = await axios.post(url + 'insert',rowData);

    return response.data
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'phantom/update',
  async (rowData:Phantom) => {
    const response = await axios.post(url + 'update',rowData);

    return response.data
  }
)