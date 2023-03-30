import { configureStore } from "@reduxjs/toolkit";
import heroReducer from './slice/heroes'
import filterReducer from './slice/filter'


const store = configureStore({
   reducer: {
      heroes: heroReducer,
      filter: filterReducer
   },
})

export default store

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;