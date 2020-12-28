import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Category } from './type';
import { urlApi } from "../../setting/url";

const url = urlApi + 'category/'

export const fetchAsyncList = createAsyncThunk(
  'category/get_list',
  async () => {
    const response = await axios.get(url + 'get_list');

    return response.data
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'category/insert',
  async (categoryNew:Category) => {
    const response = await axios.post(url + 'insert',categoryNew);

    return response.data
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'category/update',
  async (categoryNew:Category) => {
    const response = await axios.post(url + 'update',categoryNew);

    return response.data
  }
)
