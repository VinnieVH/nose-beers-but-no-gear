import { configureStore } from '@reduxjs/toolkit'
import { wowApi } from './wowApi'
import { warcraftLogsApi } from './warcraftLogsApi'

export const store = configureStore({
  reducer: {
    [warcraftLogsApi.reducerPath]: warcraftLogsApi.reducer,
    [wowApi.reducerPath]: wowApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      warcraftLogsApi.middleware,
      wowApi.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch 