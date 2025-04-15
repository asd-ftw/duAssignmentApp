import { combineReducers } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import languageReducer from './slices/language/languageSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  language: languageReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
