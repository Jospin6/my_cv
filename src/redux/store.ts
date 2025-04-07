// redux/store.ts
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import experienceReducer from './experience/experienceSlice';
import educationReducer from './education/educationSlice';
import certificationReducer from './certification/certificationSlice';
import projectReducer from './project/projectSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    experience: experienceReducer,
    education: educationReducer,
    certification: certificationReducer,
    project: projectReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;