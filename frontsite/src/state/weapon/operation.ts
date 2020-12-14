import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Weapon } from './type';

const url = 'http://localhost:5000/api/weapon/'

export const fetchAsyncList = createAsyncThunk(
  'weapon/list',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)

export const fetchAsyncInsert = createAsyncThunk(
  'weapon/insert',
  async (rowData:Weapon) => {
    const response = await axios.post(url + 'insert',rowData);
    return response.data
  }
)

export const fetchAsyncUpdate = createAsyncThunk(
  'weapon/update',
  async (rowData:Weapon) => {
    const response = await axios.post(url + 'update',rowData);
    return response.data
  }
)