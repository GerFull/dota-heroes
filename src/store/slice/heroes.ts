import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { Error, Hero } from '../../types';



type HeroesState = {
   heroes: Hero[];
   loading: boolean;
   error: string | null;
   page: number;
}



export const fetchHeroes = createAsyncThunk<Hero[], undefined, { rejectValue: string }>(
   'products/fetchProducts',
   async function (_, { rejectWithValue }) {
      const response = await fetch(`https://api.opendota.com/api/heroStats`);

      if (!response.ok) {
         return rejectWithValue('Server Error!');
      }

      console.log('loading data')
      const data = await response.json();
      return data;
   }
);


const initialState: HeroesState = {
   heroes: [],
   loading: false,
   error: null,
   page: 0
}

const heroesSlice = createSlice({
   name: 'Heroes',
   initialState,
   reducers: {
      cnangePage(state, action: PayloadAction<number>) {
         state.page = action.payload
      }
   },
   extraReducers: (builder) => {
      builder
         .addCase(fetchHeroes.pending, (state) => {
            state.loading = true;
            state.error = null;
         })
         .addCase(fetchHeroes.fulfilled, (state, action) => {
            state.heroes = action.payload;
            state.loading = false;
         })
         .addMatcher(isError, (state, action: PayloadAction<string, string, null, Error>) => {
            state.error = action.error.message;
            state.loading = false;
         });
   }
});



export default heroesSlice.reducer;
export const { cnangePage } = heroesSlice.actions;


function isError(action: AnyAction) {
   return action.type.endsWith('rejected');
}