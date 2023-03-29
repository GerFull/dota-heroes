import { configureStore } from "@reduxjs/toolkit";
import heroReducer from './slice/heroes'


const store = configureStore({
   reducer: {
      heroes: heroReducer
   },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;