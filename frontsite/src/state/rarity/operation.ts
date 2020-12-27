import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from "../../setting/url";

const url = urlApi + 'rarity/'

export const fetchAsyncList = createAsyncThunk(
  'rarity/List',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)