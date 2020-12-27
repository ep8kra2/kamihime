import axios from "axios";
import { createAsyncThunk } from '@reduxjs/toolkit'
import { urlApi } from "../../setting/url";

const url = urlApi + 'weapon_type/'

export const fetchAsyncList = createAsyncThunk(
  'weaponType/list',
  async () => {
    const response = await axios.get(url + 'get_list');
    return response.data
  }
)
