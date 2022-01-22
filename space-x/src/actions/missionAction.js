import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchSpacexLaunchesAPI } from '../apis/missionAPI';

export const fetchSpacexLaunches = createAsyncThunk(
  'spacexdata/launches',
  async (selectedFilter) => {
    const response = await fetchSpacexLaunchesAPI(selectedFilter);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);