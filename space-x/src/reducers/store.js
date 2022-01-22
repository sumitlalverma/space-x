import { configureStore } from '@reduxjs/toolkit';
import spacexMissionsReducer from './missionSlice';

export const store = configureStore({
  reducer: {
    spacexMissions: spacexMissionsReducer
  },
});
