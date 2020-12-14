import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:5000/api/weapon_type/'

export const fetchAsyncList = createAsyncThunk(
  'weaponType/list',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)
