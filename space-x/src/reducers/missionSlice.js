import { createSlice } from '@reduxjs/toolkit';
import { fetchSpacexLaunches } from '../actions/missionAction';


const fetchSpacexLaunchesReducer = (builder) => {
  builder
    .addCase(fetchSpacexLaunches.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchSpacexLaunches.fulfilled, (state, action) => {
      state.status = 'idle';
      state.launches = action.payload;
    });
}


const initialState = {
  launches: [],
  status: 'idle',
};


export const spacexMissions = createSlice({
  name: 'spacexMissions',
  initialState,
  extraReducers: fetchSpacexLaunchesReducer,
})


// helpers reducers function
export const spacexLaunches = (state) => state.spacexMissions.launches;
export const checkStatus = (state) => state.spacexMissions.status;

export default spacexMissions.reducer;