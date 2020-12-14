import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'

const url = 'http://localhost:5000/api/rarity/'

export const fetchAsyncList = createAsyncThunk(
  'rarity/List',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)