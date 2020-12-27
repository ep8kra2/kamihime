import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from "../../setting/url";

const url = urlApi + 'power/'

export const fetchAsyncList = createAsyncThunk(
  'power/List',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)
