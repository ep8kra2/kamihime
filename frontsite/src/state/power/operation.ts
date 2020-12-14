import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { Power } from './type';

const url = 'http://localhost:5000/api/power/'

export const fetchAsyncList = createAsyncThunk(
  'power/List',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)
