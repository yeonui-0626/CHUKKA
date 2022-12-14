import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  login,
  register,
  getToken,
  fetchPro,
  find,
  change,
  snacks,
  myLectures,
  insLectures,
  changePw,
} from '../../api/user';

export const registerUser = createAsyncThunk(
  'user/register',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      await register(data);
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const userLogin = createAsyncThunk(
  'user/login',
  async ({ userId, userPw }, { rejectWithValue }) => {
    try {
      const { data } = await login({ userId, userPw });

      const { accessToken, refreshToken, userNickname, userProfile, userType } =
        data.data;
      const userInfo = {
        userId,
        userNickname,
        userProfile,
        userType,
      };
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('accessToken', accessToken);

      return { userInfo, accessToken };
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchProfile = createAsyncThunk(
  'user/fetchProfile',
  async (userNickname, { rejectWithValue }) => {
    try {
      const { data } = await fetchPro(userNickname);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const changeProfile = createAsyncThunk(
  'user/changeProfile',
  async ({ profileInputs, profilePicture }, { rejectWithValue }) => {
    try {
      console.log(profilePicture);
      const { data } = await change(profileInputs, profilePicture);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchAccessToken = createAsyncThunk(
  'user/getAccessToken',
  async ({ refreshToken, userInfo }) => {
    try {
      const { userId } = userInfo;

      const { data } = await getToken(userId, refreshToken);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const findPw = createAsyncThunk(
  'user/findPw',
  async (input, { rejectWithValue }) => {
    try {
      const data = await find(input);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (pwInfo, { rejectWithValue }) => {
    try {
      const { data } = await changePw(pwInfo);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchSnacks = createAsyncThunk(
  'user/fetchSnacks',
  async ({ paramsNickname, newPage }, { rejectWithValue }) => {
    try {
      const { data } = await snacks(paramsNickname, newPage);
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchMyLectures = createAsyncThunk(
  'user/fetchMyLectures',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await myLectures();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);

export const fetchInsLectures = createAsyncThunk(
  'user/fetchInsLectures',
  async (tmp, { rejectWithValue }) => {
    try {
      const { data } = await insLectures();
      return data;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  },
);
