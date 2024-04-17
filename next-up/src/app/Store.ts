import { configureStore } from '@reduxjs/toolkit'
import { userSlice } from '@/features/user/userSlice'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const userPersistConfig = {
  key: 'user',
  storage,
  whitelist: ['user'],
}

const userPersistedReducer = persistReducer(
  userPersistConfig,
  userSlice.reducer
)

export const store = configureStore({
  reducer: {
    user: userPersistedReducer,
  },
})

export const persistor = persistStore(store)
