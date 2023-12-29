import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';


const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], 
};

const persistedReducer = (rootReducer: any) => persistReducer(persistConfig, rootReducer);

export default persistedReducer;
