import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit';
import { Error, Hero } from '../../types';



type HeroesState = {
   heroes: Hero[];
   filterHeroesArr:Hero[]
   loading: boolean;
   error: string | null;
   page: number;
}

function contains(where: string[], what: string[]) {
   for (var i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) return false;
   }
   return true;
}


export const fetchHeroes = createAsyncThunk<Hero[], undefined, { rejectValue: string }>(
   'products/fetchProducts',
   async function (_, { rejectWithValue }) {
      const response = await fetch(`https://api.opendota.com/api/heroStats`);

      if (!response.ok) {
         return rejectWithValue('Server Error!');
      }
      const data = await response.json();
      return data;
   }
);


const initialState: HeroesState = {
   heroes: [],
   filterHeroesArr:[],
   loading: false,
   error: null,
   page: 0
}

type filter = {
   radioOption: string,
   selectOptions: string[],
   title: string
}


const heroesSlice = createSlice({
   name: 'Heroes',
   initialState,
   reducers: {
      cnangePage(state, action: PayloadAction<number>) {
         state.page = action.payload
      },
      filterHeroes(state, action: PayloadAction<filter>) {
         state.filterHeroesArr = state.heroes.filter((elem) => {
            if (
               (action.payload.radioOption === '' || elem.attack_type === action.payload.radioOption) &&
               (action.payload.selectOptions.length === 0 || contains(elem.roles, action.payload.selectOptions)) &&
               (elem.localized_name?.toLowerCase()?.includes(action.payload.title.toLowerCase()))
            ) return elem;
         })
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
            state.filterHeroesArr = action.payload;
            state.loading = false;
         })
         .addMatcher(isError, (state, action: PayloadAction<string, string, null, Error>) => {
            state.error = action.error.message;
            state.loading = false;
         });
   }
});



export default heroesSlice.reducer;
export const { cnangePage ,filterHeroes} = heroesSlice.actions;


function isError(action: AnyAction) {
   return action.type.endsWith('rejected');
}