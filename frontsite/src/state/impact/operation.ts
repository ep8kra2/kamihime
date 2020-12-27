import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Impact } from "./type";
import { urlApi } from "../../setting/url";

const url = urlApi + 'impact/'

export const fetchAsyncList = createAsyncThunk(
  'impact/List',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'impact/insert',
  async (rowData:Impact) => {
    const response = await axios.post(url + 'insert',rowData);

    return response.data
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'impact/update',
  async (rowData:Impact) => {
    const response = await axios.post(url + 'update',rowData);

    return response.data
  }
)