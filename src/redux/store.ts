
import { combineReducers, configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';
import authReducer from './authSlice';
import leaveReducer from './leaveSlice';
import companyReducer from './companySlice';

const rootReducer = combineReducers({
  employees: employeeReducer,
  auth: authReducer,
  leave: leaveReducer,
  company: companyReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch

const store = configureStore({
  reducer: rootReducer,
  
  
});

export default store;
